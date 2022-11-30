import { ref, remove, update } from "firebase/database";
import { Link } from "react-router-dom";
import { ShowType } from "../api";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import useFavorites from "../hooks/useFavorites";
import HeartIcon from "./icons/HeartIcon";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";

interface PropTypes {
	shows: ShowType[];
}

const ShowsList = ({ shows }: PropTypes) => {
	const { user } = useAuth();
	const favoritesIds = useFavorites();

	const addToFavorites = (showId: number) => {
		update(ref(database, `users/${user?.uid}/favorites`), {
			[showId]: showId,
		});
	};

	const removeFromFavorites = (showId: number) => {
		remove(ref(database, `users/${user?.uid}/favorites/${showId}`));
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 my-8">
			{shows.map((show, i) => (
				<div className="card bg-base-300 shadow-xl image-full" key={i}>
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
							<Link
								to={`/show/${show.id}`}
								className="btn btn-outline"
							>
								Go to details{" "}
							</Link>
							{favoritesIds.includes(show.id) ? (
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
			))}
		</div>
	);
};

export default ShowsList;
