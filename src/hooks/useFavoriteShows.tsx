import { ShowDetailType, getShowById } from "../api";
import { useEffect, useState } from "react";

interface PropTypes {
	favoritesIds: number[];
}

const useFavoriteShows = ({ favoritesIds }: PropTypes) => {
	const [favoriteShows, setFavoriteShows] = useState<ShowDetailType[]>([]);

	useEffect(() => {
		const fetchShows = async () => {
			const shows = await Promise.all(
				favoritesIds.map(id => getShowById(id))
			);
			setFavoriteShows(shows);
		};
		fetchShows();
	}, [favoritesIds]);

	return favoriteShows;
};

export default useFavoriteShows;
