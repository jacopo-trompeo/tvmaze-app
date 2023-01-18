import { useEffect, useState } from "react";
import { ShowDetailType, getShowById } from "../api";

const useShow = (id?: string) => {
	const [show, setShow] = useState<ShowDetailType>({} as ShowDetailType);

	useEffect(() => {
		const showId = id && id.match(/^[0-9]+$/) ? parseInt(id) : 0;

		getShowById(showId).then((data: ShowDetailType) => {
			setShow(data);
		});
	}, [id]);

	return show;
};

export default useShow;
