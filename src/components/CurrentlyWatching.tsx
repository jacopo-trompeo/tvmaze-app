import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import { getShowById, ShowDetailType } from "../api";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import TVIcon from "./icons/TVIcon";
import CloseIcon from "./icons/CloseIcon";
import ChevronUpIcon from "./icons/ChevronUpIcon";

const CurrentlyWatching = () => {
	const currentlyWatchingId = useCurrentlyWatchingId();
	const currentlyWatchingShow = useCurrentlyWatchingShow(currentlyWatchingId);
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const [isMinimized, setIsMinimized] = useState(true);

	if (!currentlyWatchingId) {
		return null;
	}

	return !isMinimized || isMobile ? (
		<div className="p-0 toast toast-end w-full md:w-auto md:right-10 md:bottom-10 z-50 md:hover:scale-105 md:transition-transform text-neutral">
			<button
				className="absolute top-3 right-3 hidden md:block"
				onClick={() => setIsMinimized(true)}
			>
				<CloseIcon />
			</button>
			<Link
				to={`/show/${currentlyWatchingId}`}
				className="alert rounded-none md:rounded-xl bg-accent"
			>
				<div className="flex flex-col items-start md:p-5">
					<div className="flex gap-2 items-center">
						<TVIcon />
						<span className="text-xl md:text-2xl">Now watching</span>
					</div>
					{currentlyWatchingShow && (
						<span className="text-2xl text-center md:text-left w-full md:text-3xl font-medium">
							{currentlyWatchingShow.title}
						</span>
					)}
				</div>
			</Link>
		</div>
	) : (
		<div className="p-0 toast toast-end w-auto right-10 bottom-10 z-50 hover:scale-105 transition-transform">
			<div
				className="alert rounded-full bg-accent cursor-pointer text-neutral"
				onClick={() => setIsMinimized(false)}
			>
				<ChevronUpIcon />
			</div>
		</div>
	);
};

const useCurrentlyWatchingId = () => {
	const [currentlyWatchingId, setCurrentlyWatchingId] = useState<
		number | null
	>();
	const { user } = useAuth();

	useEffect(() => {
		const currentlyWatchingRef = ref(database, `users/${user?.uid}/watching/`);
		onValue(currentlyWatchingRef, (snapshot) => {
			const data = snapshot.val();
			setCurrentlyWatchingId(data ?? null);
		});
	}, [user]);

	return currentlyWatchingId;
};

const useCurrentlyWatchingShow = (id?: number | null) => {
	const [currentlyWatchingShow, setCurrentlyWatchingShow] =
		useState<ShowDetailType | null>();

	useEffect(() => {
		const getShow = async () => {
			if (!id) {
				return;
			}

			const show = await getShowById(id);
			setCurrentlyWatchingShow(show);
		};

		getShow();
	}, [id]);

	return currentlyWatchingShow;
};

export default CurrentlyWatching;
