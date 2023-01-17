import { database } from "../firebase";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { onValue, ref } from "firebase/database";

const RankingPage = () => {
	const showsRanking = useShowsRanking();

	return (
		<>
			<Navbar />
			<main>
				<h1>Ranking Page</h1>
			</main>
		</>
	);
};

const useShowsRanking = () => {
	const [showsRanking, setShowsRanking] = useState<number[]>([]);

	useEffect(() => {
		const watchingRef = ref(database, `users`);
		const unsubscribe = onValue(watchingRef, (snapshot) => {
			const ranking: { [key: string]: number } = {};

			snapshot.forEach((childSnapshot) => {
				const watching = childSnapshot.val().watching?.showId;

				if (watching && !ranking[watching]) {
					ranking[watching] = 0;
				}

				if (watching) {
					ranking[watching]++;
				}
			});

			console.log(ranking);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return showsRanking;
};

export default RankingPage;
