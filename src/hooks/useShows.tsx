import { ShowDetailType, getShowById } from "../api";
import { useEffect, useState } from "react";

interface PropTypes {
	showsIds: number[];
}

const useShows = ({ showsIds }: PropTypes) => {
	const [favoriteShows, setFavoriteShows] = useState<ShowDetailType[]>([]);

	useEffect(() => {
		const fetchShows = async () => {
			const shows = await Promise.all(
				showsIds.map(id => getShowById(id))
			);
			setFavoriteShows(shows);
		};
		fetchShows();
	}, [showsIds]);

	return favoriteShows;
};

export default useShows;
