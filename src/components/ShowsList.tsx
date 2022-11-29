import { Link } from "react-router-dom";
import { ShowType } from "../api";

interface PropTypes {
	shows: ShowType[];
	favorites: number[];
	addToFavorites: (showId: number) => void;
	removeFromFavorites: (showId: number) => void;
}

const ShowsList = (props: PropTypes) => {
	const { shows, favorites, addToFavorites, removeFromFavorites } = props;

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
				<Link to={`/show/${show.id}`}>
					<div
						className="card bg-base-300 shadow-xl image-full hover:scale-105 transition-transform duration-100 cursor-pointer"
						key={i}
					>
						<figure className="max-h-[15rem]">
							<img
								src={show.image}
								alt={show.title}
								className="h-full w-full object-cover "
							/>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-2xl">
								{show.title}
							</h2>

							<div className="card-actions justify-end mt-auto">
								{favorites.includes(show.id) ? (
									<button
										onClick={() =>
											removeFromFavorites(show.id)
										}
									>
										{heartFull}
									</button>
								) : (
									<button
										onClick={() => addToFavorites(show.id)}
									>
										{heartEmpty}
									</button>
								)}
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ShowsList;
