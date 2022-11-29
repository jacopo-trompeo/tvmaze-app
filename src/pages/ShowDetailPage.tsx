import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShowDetailType, getShowById } from "../api";
import Navbar from "../components/Navbar";

const ShowDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const [showDetails, setShowDetails] = useState<ShowDetailType | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const showId = id ? parseInt(id) : null;
		if (!showId) {
			return;
		}

		getShowById(showId).then((data: ShowDetailType) => {
			setShowDetails(data);
		});
	}, [id]);

	return (
		<>
			<Navbar />
			{showDetails ? (
				<main className="max-w-md px-5 pb-10 pt-5 md:pt-20 md:px-0 md:container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-0">
					<div className="max-w-md mx-auto">
						<img
							src={showDetails.image}
							alt={showDetails.title}
							className="rounded-lg"
						/>
					</div>
					<div className="flex flex-col justify-center">
						<button
							className="btn btn-circle mb-2"
							onClick={() => navigate(-1)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
								/>
							</svg>
						</button>
						<h1 className="text-4xl font-semibold">
							{showDetails.title}
						</h1>
						<p className="mt-2 text-sm">
							{showDetails.startDate || "N/A"} -{" "}
							{showDetails.endDate || "N/A"}
						</p>

						<p className="mt-10 text-justify lg:max-w-[60ch]">
							{showDetails.summary?.replace(
								/(<([^>]+)>)/gi,
								""
							) || "No description available"}
						</p>

						<Rating rating={showDetails.avgRating || 0} />

						<div className="mt-5 flex gap-3">
							{showDetails.genres?.map((genre, i) => (
								<span className="badge" key={i}>
									{genre}
								</span>
							))}
						</div>
					</div>
				</main>
			) : (
				""
			)}
		</>
	);
};

const Rating = ({ rating }: { rating: number }) => {
	// rounds number to closes 0.5
	const roundedRating = Math.round(rating * 2) / 2;

	return (
		<div className="tooltip w-min flex mt-10" data-tip={rating}>
			<div className="rating rating-half">
				{[...Array(10)].map((_, i) => (
					/* using this syntax instead of <> so I can use key, 
        as div or span would break the inputs */
					<React.Fragment key={i}>
						<input
							type="radio"
							name="rating"
							className="bg-warning mask mask-star-2 mask-half-1 cursor-default"
							checked={roundedRating >= i + 0.5}
							disabled={true}
						/>
						<input
							type="radio"
							name="rating"
							className="bg-warning mask mask-star-2 mask-half-2 cursor-default"
							checked={roundedRating >= i + 1}
							disabled={true}
						/>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default ShowDetailPage;
