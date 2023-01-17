import { database } from "../firebase";
import { onValue, ref } from "firebase/database";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ShowCard from "../components/ShowCard";
import CurrentlyWatching from "../components/CurrentlyWatching";
import useShows from "../hooks/useShows";

const RankingPage = () => {
	const showsRankings = useShowsRankings();
	const showIds = useShowIds(showsRankings);
	const shows = useShows(showIds);

	return (
		<>
			<Navbar />
			<main className="max-w-md px-5 sm:px-0 sm:container mx-auto">
				<h1 className="text-center font-bold text-3xl sm:text-4xl">
					The most watched shows
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 my-8">
					{shows.map((show, i) => (
						<ShowCard
							key={i}
							show={show}
							peopleWatching={showsRankings[show.id]}
						/>
					))}
				</div>

				<CurrentlyWatching />
			</main>
		</>
	);
};

const useShowsRankings = () => {
	const [showsRankins, setShowsRankings] = useState<{ [key: string]: number }>(
		{}
	);

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

			setShowsRankings(ranking);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return showsRankins;
};

const useShowIds = (showsRankings: { [key: string]: number }) => {
	const [showIds, setShowIds] = useState<number[]>([]);

	useEffect(() => {
		const ids = Object.keys(showsRankings)
			.sort((a, b) => showsRankings[b] - showsRankings[a])
			.map((id) => parseInt(id));

		setShowIds(ids);
	}, [showsRankings]);

	return showIds;
};

export default RankingPage;
