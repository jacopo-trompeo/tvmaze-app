import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShowDetailType, getShowById } from "../api";
import BackIcon from "../components/icons/BackIcon";
import HeartOutlineIcon from "../components/icons/HeartOutlineIcon";
import HeartIcon from "../components/icons/HeartIcon";
import PlusIcon from "../components/icons/PlusIcon";
import CheckIcon from "../components/icons/CheckIcon";
import Navbar from "../components/Navbar";
import useIsFavorite from "../hooks/useIsFavorite";
import useIsWatching from "../hooks/useIsWatching";
import { useAuth } from "../context/AuthContext";
import {
	addToFavorites,
	removeFromFavorites,
	addToWatching,
	removeFromWatching,
} from "../firebase/realtimedb";
import placeholderImageVertical from "../assets/placeholder-vertical.jpg";
import CurrentlyWatching from "../components/CurrentlyWatching";
import parse from "html-react-parser";

const ShowDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const showDetails = useShowDetails(id);

	return (
		<>
			<Navbar />
			{showDetails ? (
				<main className="max-w-md px-5 pb-10 pt-5 md:pt-20 md:px-0 md:container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-0">
					<div className="max-w-md mx-auto">
						<img
							src={showDetails.image || placeholderImageVertical}
							alt={showDetails.title}
							className="rounded-lg"
						/>
					</div>
					<div className="flex flex-col justify-center">
						<ShowDetailActions showId={showDetails.id} />

						<h1 className="text-4xl font-semibold">{showDetails.title}</h1>
						<p className="mt-2 text-sm">
							{showDetails.startDate || "N/A"} - {showDetails.endDate || "N/A"}
						</p>

						<span className="mt-10 text-justify lg:max-w-[60ch]">
							{showDetails.summary
								? parse(showDetails.summary)
								: "No description available"}
						</span>

						<Rating rating={showDetails.avgRating} />

						<div className="mt-5 flex gap-3">
							{showDetails.genres?.map((genre, i) => (
								<span className="badge" key={i}>
									{genre}
								</span>
							))}
						</div>
					</div>

					<CurrentlyWatching />
				</main>
			) : (
				""
			)}
		</>
	);
};

const useShowDetails = (id?: string) => {
	const [showDetails, setShowDetails] = useState<ShowDetailType | null>(null);

	useEffect(() => {
		const showId = id && id.match(/^[0-9]+$/) ? parseInt(id) : 0;

		getShowById(showId).then((data: ShowDetailType) => {
			setShowDetails(data);
		});
	}, [id]);

	return showDetails;
};

const Rating = ({ rating }: { rating?: number }) => {
	/* put rating to 0.5 if rating is 0 or undefined otherwise all
	the stars will be filled, it needs at least half a star filled*/
	let normalizedRating = !rating || rating <= 0.5 ? 0.5 : rating;
	// round the rating to the nearest 0.5
	const roundedRating = Math.round(normalizedRating * 2) / 2;

	return (
		<div className="tooltip w-min flex mt-10" data-tip={rating || "N/A"}>
			<div className="rating rating-half">
				{[...Array(10)].map((_, i) => (
					/* using this syntax instead of <> so I can use key, 
        as div or span would break the inputs */
					<React.Fragment key={i}>
						<input
							type="radio"
							name="rating"
							className="bg-accent mask mask-star-2 mask-half-1 cursor-default"
							checked={roundedRating >= i + 0.5}
							disabled={true}
						/>
						<input
							type="radio"
							name="rating"
							className="bg-accent mask mask-star-2 mask-half-2 cursor-default"
							checked={roundedRating >= i + 1}
							disabled={true}
						/>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

const ShowDetailActions = ({ showId }: { showId: number }) => {
	const { user } = useAuth();
	const isFavorite = useIsFavorite(showId);
	const isWatching = useIsWatching(showId);
	const navigate = useNavigate();

	return (
		<div className="flex items-center gap-5 mb-2">
			<button className="btn btn-circle " onClick={() => navigate(-1)}>
				<BackIcon />
			</button>
			{isFavorite ? (
				<button
					className="btn btn-circle text-accent"
					onClick={() => removeFromFavorites(showId, user)}
				>
					<HeartIcon />
				</button>
			) : (
				<button
					className="btn btn-circle text-accent"
					onClick={() => addToFavorites(showId, user)}
				>
					<HeartOutlineIcon />
				</button>
			)}
			{!isWatching ? (
				<div className="tooltip" data-tip="Add to watching">
					<button
						className="btn btn-circle"
						onClick={() => addToWatching(showId, user)}
					>
						<PlusIcon />
					</button>
				</div>
			) : (
				<div className="tooltip" data-tip="Remove from watching">
					<button
						className="btn btn-circle text-success"
						onClick={() => removeFromWatching(user)}
					>
						<CheckIcon />
					</button>
				</div>
			)}
		</div>
	);
};

export default ShowDetailPage;
