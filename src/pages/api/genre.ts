import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const key = process.env.RESTAURANT_API_KEY;
		if (!key) {
			throw new Error("API key is not defined");
		}

		const response = await fetch(
			`https://webservice.recruit.co.jp/hotpepper/genre/v1/?key=${key}&format=json`,
		);

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ results: { genre: [] } });
	}
}
