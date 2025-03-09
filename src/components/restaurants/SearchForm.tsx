import { useDevice } from "@/hooks/useDevice";
import type { GenreResponse, SearchParams } from "@/types/restaurant";
import { formatGenre } from "@/utils/restaurant";
import clsx from "clsx";
import { BsSearch } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

type SearchFormProps = {
	fetch: GenreResponse;
	params: SearchParams;
	setSearchParams: (params: SearchParams) => void;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchForm({
	fetch,
	params,
	setSearchParams,
	setIsModalOpen,
}: SearchFormProps) {
	const { genres, locationState } = params;

	const { isMobile } = useDevice();

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;
		if (event.key !== "Enter") return;

		setSearchParams({ ...params, keyword: value });

		if (isMobile) {
			setIsModalOpen(false);
		}
	};

	const handleLocationButtonClick = () => {
		setSearchParams({
			...params,
			locationState: {
				position: params.locationState?.position,
				isActive: !params.locationState?.isActive,
			},
		});

		if (locationState?.position) {
			return;
		}

		navigator.geolocation.getCurrentPosition((position) =>
			setSearchParams({
				...params,
				locationState: {
					position,
					isActive: true,
				},
			}),
		);
	};

	return (
		<div className="flex flex-col m-4 gap-y-4 text-gray-900">
			{/* キーワード検索 */}
			<div className="flex items-center w-full">
				<div className="mx-1">
					<BsSearch size={18} className="text-gray-500" />
				</div>
				<div>
					<input
						className="ml-2 text-xl font-bold outline-none placeholder-gray-500"
						placeholder="検索"
						autoCorrect="off"
						autoCapitalize="off"
						autoComplete="off"
						spellCheck="false"
						onKeyDown={handleKeyDown}
					/>
				</div>
			</div>

			{/* オプション */}
			<div className="grid grid-cols-3 gap-2 text-sm">
				{[
					{ value: "card", label: "クレカ決済" },
					{ value: "private_room", label: "個室" },
					{ value: "course", label: "コース" },

					{ value: "lunch", label: "ランチ" },
					{ value: "free_food", label: "飲み放題" },
					{ value: "free_drink", label: "食べ放題" },
				].map(({ value, label }) => (
					<button
						key={value}
						type="button"
						className={clsx(
							"flex items-center justify-center h-10 border-[0.5px] rounded-sm shadow-sm",
							params[value as keyof SearchParams]
								? "bg-gray-950 text-white border-white opacity-90"
								: "bg-white border-gray-950",
						)}
						onClick={() =>
							setSearchParams({
								...params,
								[value]: !params[value as keyof SearchParams],
							})
						}
					>
						{label}
					</button>
				))}
			</div>

			{/* ジャンル */}
			<div className="grid grid-cols-3 gap-2 text-sm">
				{fetch.results?.genre
					.filter(
						(x) => !["G002", "G010", "G011", "G012", "G015"].includes(x.code),
					)
					.map((item) => (
						<button
							key={item.code}
							type="button"
							className={clsx(
								"flex items-center justify-center h-10 border-[0.5px] rounded-sm shadow-sm",
								params.genres.some((x) => x.code === item.code)
									? "bg-gray-950 text-white border-white opacity-90"
									: "bg-white border-gray-950",
							)}
							onClick={() => {
								setSearchParams({
									...params,
									genres: genres.some((x) => x.code === item.code)
										? genres.filter((x) => x.code !== item.code)
										: [...genres, item],
								});
							}}
						>
							{formatGenre(item).name}
						</button>
					))}
			</div>

			{/* 現在地から探す */}
			<button
				type="button"
				className={clsx(
					"flex items-center justify-center w-full h-10 text-sm border-[0.5px] rounded-sm shadow-sm",
					locationState?.isActive
						? "bg-gray-950 text-white border-white opacity-90"
						: "bg-white border-gray-950",
				)}
				onClick={handleLocationButtonClick}
			>
				<MdLocationOn size={20} className="text-gray-300" />
				<span className="ml-1">現在地から探す</span>
			</button>
		</div>
	);
}
