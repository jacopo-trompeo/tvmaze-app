import { useEffect, useState } from "react";
import { ShowType } from "../api";
import ShowCard from "./ShowCard";

interface PropTypes {
	shows: ShowType[];
}

const ShowsList = ({ shows }: PropTypes) => {
	const [isLoading, setIsLoading] = useState<boolean>();

	useEffect(() => {
		if (shows.length > 0) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [shows]);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 my-8">
			{!isLoading ? (
				shows.map((show, i) => <ShowCard key={i} show={show} />)
			) : (
				<p className="text-center text-3xl font-semibold col-span-3">
					Loading...
				</p>
			)}
		</div>
	);
};

export default ShowsList;
