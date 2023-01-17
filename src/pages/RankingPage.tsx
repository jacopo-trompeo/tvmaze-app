import { database } from "../firebase";
import { onValue, ref } from "firebase/database";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CurrentlyWatching from "../components/CurrentlyWatching";
import useShows from "../hooks/useShows";

const RankingPage = () => {
	const showsRankingIds = useShowsRankingIds();
	const shows = useShows(showsRankingIds);

	return (
		<>
			<Navbar />
			<main>
				<h1 className="text-center font-bold text-3xl sm:text-4xl">
					The most watched shows
				</h1>

				<CurrentlyWatching />
			</main>
		</>
	);
};

const useShowsRankingIds = () => {
	const [showsRankingIds, setShowsRankingIds] = useState<number[]>([]);

	useEffect(() => {
		const watchingRef = ref(database, `users`);
		const unsubscribe = onValue(watchingRef, (snapshot) => {
			const ranking: { [key: string]: number } = {};

			snapshot.forEach((childSnapshot) => {
				const watching = childSnapshot.val().watching;

				if (watching && !ranking[watching]) {
					ranking[watching] = 0;
				}

				if (watching) {
					ranking[watching]++;
				}
			});

			setShowsRankingIds(
				Object.entries(ranking)
					.sort((a, b) => b[1] - a[1])
					.map(([key]) => parseInt(key))
			);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return showsRankingIds;
};

export default RankingPage;
