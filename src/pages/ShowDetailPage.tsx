import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShowDetailType, getShowById } from "../api";
import Navbar from "../components/Navbar";

const ShowDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const [showDetails, setShowDetails] = useState<ShowDetailType>(
		{} as ShowDetailType
	);

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
			<main className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
				<div>
					<img
						src={showDetails.image}
						alt={showDetails.title}
						className="w-full rounded-lg"
					/>
				</div>
				<div>
					<h1 className="text-4xl font-semibold">
						{showDetails.title}
					</h1>
					<p className="mt-2 text-sm">
						{showDetails.startDate || "N/A"} -{" "}
						{showDetails.endDate || "N/A"}
					</p>

					<p className="mt-10">
						{showDetails.summary?.replace(/(<([^>]+)>)/gi, "") ||
							"No description available"}
					</p>

					<div className="mt-10 flex gap-3">
						{showDetails.genres?.map((genre, i) => (
							<span className="badge" key={i}>
								{genre}
							</span>
						))}
					</div>
				</div>
			</main>
		</>
	);
};

export default ShowDetailPage;
