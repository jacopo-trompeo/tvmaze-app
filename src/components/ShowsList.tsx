import { ref, remove, update } from "firebase/database";
import { Link } from "react-router-dom";
import { ShowType } from "../api";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import useFavorites from "../hooks/useFavorites";
interface PropTypes {
	shows: ShowType[];
}

const ShowsList = ({ shows }: PropTypes) => {
	const { user } = useAuth();
	const favorites = useFavorites();

	const addToFavorites = (showId: number) => {
		update(ref(database, `users/${user?.uid}/favorites`), {
			[showId]: showId,
		});
	};

	const removeFromFavorites = (showId: number) => {
		remove(ref(database, `users/${user?.uid}/favorites/${showId}`));
	};

	const heartEmpty = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-8 h-8"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
			/>
		</svg>
	);
	const heartFull = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="w-8 h-8"
		>
			<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
		</svg>
	);

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
							{favorites.includes(show.id) ? (
								<button
									onClick={() => removeFromFavorites(show.id)}
								>
									{heartFull}
								</button>
							) : (
								<button onClick={() => addToFavorites(show.id)}>
									{heartEmpty}
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
