import type { RestaurantResponse, SearchParams } from "@/types/restaurant";
import type { SWRInfiniteResponse } from "swr/infinite";
import useSWRInfinite from "swr/infinite";

type Options = {
	params: SearchParams;
	pageSize: number;
};

export type FetchRestaurantResponse = SWRInfiniteResponse<
	RestaurantResponse,
	Error
> & {
	hasMore: boolean;
};

export const useFetchRestaurant = ({
	params,
	pageSize,
}: Options): FetchRestaurantResponse => {
	const { keyword, genres: genre, locationState, ...rest } = params;

	const query = (() => {
		let result = "large_area=Z011";

		if (keyword) {
			result += `&keyword=${keyword}`;
		}

		if (genre.length) {
			result += genre.map((x) => `&genre=${x.code}`).join("");
		}

		result += Object.entries(rest)
			.filter(([, value]) => value)
			.map(([key]) => `&${key}=1`)
			.join("");

		if (locationState?.isActive && locationState.position) {
			result += `&lat=${locationState.position.coords.latitude}&lng=${locationState.position.coords.longitude}&range=5`;
		}

		return result;
	})();

	const getKey = (pageIndex: number) => {
		return `/api/restaurants?${query}&start=${pageIndex * pageSize + 1}&count=${pageSize}`;
	};

	const fetcher = (url: string): Promise<RestaurantResponse> =>
		fetch(url).then((res) => res.json());

	const response = useSWRInfinite<RestaurantResponse>(getKey, fetcher);

	return {
		...response,
		// 位置情報取得中はloadingをtrueにする
		isLoading: !!(
			response.isLoading ||
			(locationState?.isActive && !locationState.position)
		),
		hasMore: isLastPage(response),
	};
};

const isLastPage = (response: SWRInfiniteResponse<RestaurantResponse>) => {
	const value = response.data?.slice(-1)[0];
	if (!value) return true;
	const {
		results_available: available,
		results_returned: returned,
		results_start: start,
	} = value.results;

	// 検索結果の開始位置 + 検索結果の件数 - 1 < 検索結果の全件数
	return start + Number(returned) - 1 < available;
};
