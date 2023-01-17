import { useEffect, useState } from "react";
import { ShowDetailType, getShowById } from "../api";

const useShows = (showsIds: number[]) => {
	const [shows, setShows] = useState<ShowDetailType[]>([]);

	useEffect(() => {
		const fetchShows = async () => {
			const showsRes = await Promise.all(showsIds.map((id) => getShowById(id)));
			setShows(showsRes);
		};
		fetchShows();
	}, [showsIds]);

	return shows;
};

export default useShows;
