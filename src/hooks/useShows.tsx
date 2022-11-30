import { ShowDetailType, getShowById } from "../api";
import { useEffect, useState } from "react";

interface PropTypes {
	showsIds: number[];
}

const useShows = ({ showsIds }: PropTypes) => {
	const [shows, setShows] = useState<ShowDetailType[]>([]);

	useEffect(() => {
		const fetchShows = async () => {
			const showsRes = await Promise.all(
				showsIds.map(id => getShowById(id))
			);
			setShows(showsRes);
		};
		fetchShows();
	}, [showsIds]);

	return shows;
};

export default useShows;
