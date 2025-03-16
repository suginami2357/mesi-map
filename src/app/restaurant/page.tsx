"use client";
import RestaurantList from "@/components/restaurants/RestaurantList";
import SearchForm from "@/components/restaurants/SearchForm";
import ChevronButton from "@/components/ui/chevron-button";
import Sidebar from "@/components/ui/sidebar";
import { useDevice } from "@/hooks/useDevice";
import { useFetchGenre } from "@/hooks/useFetchGenre";
import { useFetchRestaurant } from "@/hooks/useFetchRestaurant";
import { useScroll } from "@/hooks/useScroll";
import type { SearchParams } from "@/types/restaurant";
import clsx from "clsx";
import type React from "react";
import { useState } from "react";
import CreditDisplay from "../../components/restaurants/CreditDisplay";

export default function Page() {
	const { isMobile } = useDevice();
	const { scrollY } = useScroll();

	const [isModalOpen, setIsModalOpen] = useState(!isMobile);
	const [params, setParams] = useState<SearchParams>({ genres: [] });

	const { data: genre } = useFetchGenre();
	const fetch = useFetchRestaurant({
		pageSize: 10,
		params,
	});

	return (
		<div className="flex flex-col items-center h-dvh bg-white overflow-hidden">
			<RestaurantList fetch={fetch} params={params} />

			{(isModalOpen || !fetch.isLoading) && (
				<ChevronButton
					className={clsx(
						"fixed flex items-center justify-center z-30 left-2 bottom-8 w-12 h-12 bg-white text-gray-900 rounded-full shadow-lg",
						isMobile &&
							scrollY > 5000 &&
							"bg-white/50 backdrop-blur-[6px] backdrop-contrast-[4]",
					)}
					style={
						isMobile
							? { opacity: scrollY < 5000 ? 1 - scrollY / 10000 : 1 }
							: {}
					}
					isOpen={isModalOpen}
					setIsOpen={setIsModalOpen}
				/>
			)}

			<Sidebar
				className={clsx("bg-white", isMobile && "w-full")}
				isOpen={isModalOpen}
			>
				{genre && (
					<SearchForm
						fetch={genre}
						params={params}
						setSearchParams={setParams}
						setIsModalOpen={setIsModalOpen}
					/>
				)}
			</Sidebar>
		</div>
	);
}
