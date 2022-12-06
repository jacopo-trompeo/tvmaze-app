import { Link } from "react-router-dom";
import { ShowType } from "../api";
import { ref, remove, update } from "firebase/database";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import HeartIcon from "./icons/HeartIcon";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import useIsFavorite from "../hooks/useIsFavorite";
import { useEffect } from "react";

interface PropTypes {
	show: ShowType;
}

const ShowCard = ({ show }: PropTypes) => {
	const { user } = useAuth();
	const isFavorite = useIsFavorite(show.id);

	const addToFavorites = (showId: number) => {
		update(ref(database, `users/${user?.uid}/favorites`), {
			[showId]: showId,
		});
	};

	const removeFromFavorites = (showId: number) => {
		remove(ref(database, `users/${user?.uid}/favorites/${showId}`));
	};

	return (
		<div className="card bg-base-300 shadow-xl image-full">
			<figure className="max-h-[15rem]">
				<img
					src={show.image}
					alt={show.title}
					className="h-full w-full object-cover "
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title text-2xl">{show.title}</h2>

				<div className="card-actions justify-end items-center gap-5 mt-auto">
					<Link to={`/show/${show.id}`} className="btn btn-outline">
						Go to details{" "}
					</Link>
					{isFavorite ? (
						<button
							className="text-accent"
							onClick={() => removeFromFavorites(show.id)}
						>
							<HeartIcon />
						</button>
					) : (
						<button onClick={() => addToFavorites(show.id)}>
							<HeartOutlineIcon />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ShowCard;
