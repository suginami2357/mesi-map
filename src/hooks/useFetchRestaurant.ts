import type { RestaurantResponse, SearchParams } from "@/types/restaurant";
import { useState } from "react";
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

	const [hasMore, setHasMore] = useState(true);

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

	const getKey = (
		pageIndex: number,
		previousPageData: RestaurantResponse | null,
	) => {
		if (isLastPage(previousPageData)) {
			setHasMore(false);
			return null;
		}
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
		hasMore,
	};
};

const isLastPage = (previousPageData: RestaurantResponse | null) => {
	if (!previousPageData) return false;

	const {
		results_available: available,
		results_returned: returned,
		results_start: start,
	} = previousPageData.results;

	return available === Number(returned) + start - 1;
};
