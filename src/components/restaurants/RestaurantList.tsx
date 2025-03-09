import { useDevice } from "@/hooks/useDevice";
import type { FetchRestaurantResponse } from "@/hooks/useFetchRestaurant";
import type { SearchParams } from "@/types/restaurant";
import { formatData, formatDistance } from "@/utils/restaurant";
import clsx from "clsx";
import Image from "next/image";
import { IoMdRestaurant } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdRestaurant } from "react-icons/md";
import { TiLocationArrow } from "react-icons/ti";
import InfiniteScroll from "react-infinite-scroll-component";

type RestaurantListProps = {
	fetch: FetchRestaurantResponse;
	params: SearchParams;
};

export default function RestaurantList({ fetch, params }: RestaurantListProps) {
	const { data: restaurants, size, setSize, isLoading, hasMore } = fetch;
	const { locationState } = params;

	const { isMobile } = useDevice();

	const data = formatData(params, restaurants);

	if (!isLoading && !data.length) {
		return (
			<div className="flex items-center justify-center w-dvw h-[calc(100dvh-8px)]">
				<div className="flex flex-col items-center justify-center w-full h-full max-w-md gap-4 shadow-md">
					<IoMdRestaurant
						size={120}
						className="p-3 bg-gray-300 text-white rounded-full"
					/>
					<span className="text-gray-400 text-lg">
						お店が見つかりませんでした。
					</span>
				</div>
			</div>
		);
	}

	return (
		<InfiniteScroll
			height="100dvh"
			dataLength={data.length}
			next={() => setSize(size + 1)}
			hasMore={hasMore}
			loader={
				<div className="flex flex-col items-center w-dvw">
					{/* プレースホルダー */}
					{[...Array(isLoading ? 3 : 1)].map(() => (
						<div
							key={crypto.randomUUID()}
							className="flex flex-col w-[calc(100%-16px)] max-w-md m-2 bg-white shadow-md rounded animate-pulse"
						>
							<div className="m-2 mt-[2px]">
								{/* 画像 */}
								<div className="w-full h-[calc(21dvh-6px)] bg-gray-200 rounded" />

								{/* タイトル */}
								<div className="w-1/2 h-5 bg-gray-200 rounded mt-2" />

								{/* ジャンル */}
								<div className="flex gap-x-4 mt-2">
									<div className="w-1/6 h-4 bg-gray-200 rounded" />
									<div className="w-1/6 h-4 bg-gray-200 rounded" />
								</div>

								{/* アクセス */}
								<div className="w-3/4 h-4 bg-gray-200 rounded mt-2" />
							</div>
						</div>
					))}
				</div>
			}
		>
			{data.map((x, index) => (
				<div
					key={x.id}
					className={clsx(
						"flex flex-col max-w-md bg-white shadow-md rounded",
						index === 0 ? "mb-2 mx-2" : "m-2",
					)}
				>
					<div className="m-2 text-xs text-gray-600">
						<Image
							className={clsx("h-[21dvh] w-dvw rounded object-cover")}
							src={x.photo.pc.l}
							alt={x.name}
							width={238}
							height={238}
							priority={index === 0}
						/>
						<div className="font-bold my-1 text-base text-gray-900">
							<a href={x.urls.pc} target="_blank" rel="noopener noreferrer">
								{x.name}
							</a>
						</div>
						<div className="flex gap-x-4">
							<div className="flex">
								<div className="h-4 w-4 bg-gray-300 rounded-full">
									<MdRestaurant size={12} className="text-white m-0.5" />
								</div>
								<span className="ml-1">{x.genre.name}</span>
							</div>

							{x.sub_genre?.name && x.genre.code !== x.sub_genre.code && (
								<div className="flex">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<MdRestaurant size={12} className="text-white m-0.5" />
									</div>
									<span className="ml-1">{x.sub_genre.name}</span>
								</div>
							)}
						</div>

						<div className="mt-2 text-xs text-gray-600">
							{locationState?.isActive && locationState.position ? (
								<div className="flex">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<IoLocationSharp size={12} className="text-white m-0.5" />
									</div>
									<span className="ml-1">
										現在地から
										{formatDistance(locationState.position, x.lng, x.lat)}
									</span>
								</div>
							) : (
								<div className="flex">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<TiLocationArrow size={16} className="text-white" />
									</div>
									<div className="ml-1">{x.mobile_access}</div>
								</div>
							)}
						</div>
					</div>
				</div>
			))}
		</InfiniteScroll>
	);
}
