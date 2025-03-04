import type { GenreResponse } from "@/types/restaurant";
import useSWR from "swr";

export const useFetchGenre = () => {
	const fetcher = (url: string) => fetch(url).then((res) => res.json());
	return useSWR<GenreResponse>("/api/genre", fetcher);
};
