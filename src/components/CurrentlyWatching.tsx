import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import { getShowById, ShowDetailType } from "../api";

const CurrentlyWatching = () => {
	const currentlyWatchingId = useCurrentlyWatching();
	const [currentlyWatchingShow, setCurrentlyWatchingShow] =
		useState<ShowDetailType | null>();

	useEffect(() => {
		const getShow = async () => {
			if (!currentlyWatchingId) {
				return;
			}

			const show = await getShowById(currentlyWatchingId);
			setCurrentlyWatchingShow(show);
		};

		getShow();
	}, [currentlyWatchingId]);

	return (
		<div className="toast toast-end z-50">
			<div className="alert bg-accent text-neutral">
				<div className="flex flex-col items-start p-5">
					<span className="text-2xl">Now watching</span>
					{currentlyWatchingShow && (
						<span className="text-5xl font-bold">
							{currentlyWatchingShow.title}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

const useCurrentlyWatching = () => {
	const [currentlyWatching, setCurrentlyWatching] = useState<number | null>();
	const { user } = useAuth();

	useEffect(() => {
		const currentlyWatchingRef = ref(
			database,
			`users/${user?.uid}/watching`
		);
		onValue(currentlyWatchingRef, (snapshot) => {
			const data = snapshot.val();
			setCurrentlyWatching(data ? data.showId : null);
		});
	}, [user]);

	return currentlyWatching;
};

export default CurrentlyWatching;
