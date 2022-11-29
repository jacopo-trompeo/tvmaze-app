const BASE_URL = "https://api.tvmaze.com";

type ShowApiResType = {
	show: {
		id: number;
		name: string;
		image?: {
			original: string;
		};
	};
};

export type ShowType = {
	id: number;
	title: string;
	image?: string;
};

type ShowDetailApiResType = {
	id: number;
	name: string;
	image?: {
		original: string;
	};
	summary?: string;
	genres?: string[];
	premiered?: string;
	ended?: string;
	rating?: {
		average: number;
	};
};

export type ShowDetailType = {
	id: number;
	title: string;
	image?: string;
	summary?: string;
	genres?: string[];
	startDate?: string;
	endDate?: string;
	avgRating?: number;
};

export const getShowsBySearch = async (query: string): Promise<ShowType[]> => {
	query = query.trim();

	if (!query || query.length === 0) {
		return [];
	}

	const response = await fetch(`${BASE_URL}/search/shows?q=${query}`);
	const data: ShowApiResType[] = await response.json();

	return data.map(show => ({
		id: show.show.id,
		title: show.show.name,
		image: show.show.image?.original,
	}));
};

export const getShowById = async (id: number): Promise<ShowDetailType> => {
	if (id <= 0) {
		return {} as ShowDetailType;
	}

	const response = await fetch(`${BASE_URL}/shows/${id}`);
	const data: ShowDetailApiResType = await response.json();

	return {
		id: data.id,
		title: data.name,
		image: data.image?.original,
		summary: data.summary,
		genres: data.genres,
		startDate: data.premiered,
		endDate: data.ended,
		avgRating: data.rating?.average,
	};
};
