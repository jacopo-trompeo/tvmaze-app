import { ShowType } from "../api";
import ShowCard from "./ShowCard";

interface PropTypes {
	shows: ShowType[];
}

const ShowsList = ({ shows }: PropTypes) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 my-8">
			{shows.map((show, i) => (
				<ShowCard key={i} show={show} />
			))}
		</div>
	);
};

export default ShowsList;
