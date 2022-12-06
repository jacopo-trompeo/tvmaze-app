import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import { getShowById, ShowDetailType } from "../api";
import { Link } from "react-router-dom";
import TVIcon from "./icons/TVIcon";

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
		currentlyWatchingId && (
			<Link
				to={`/show/${currentlyWatchingId}`}
				className="toast toast-end w-full md:w-auto md:right-5 md:bottom-5 z-50 hover:scale-105 transition-transform"
			>
				<div className="alert bg-accent text-neutral">
					<div className="flex flex-col items-start md:p-5">
						<div className="flex gap-2 items-center">
							<TVIcon />
							<span className="text-xl md:text-2xl">
								Now watching
							</span>
						</div>
						{currentlyWatchingShow && (
							<span className="text-2xl text-left w-full md:text-3xl font-medium">
								{currentlyWatchingShow.title}
							</span>
						)}
					</div>
				</div>
			</Link>
		)
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
