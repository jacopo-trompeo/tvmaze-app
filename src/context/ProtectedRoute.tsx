import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "../components/Loading";

interface PropTypes {
	children: JSX.Element;
	isAuth?: boolean;
}

const ProtectedRoute = ({ children, isAuth }: PropTypes) => {
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);

		if (user && isAuth) {
			navigate("/");
		}

		if (user === null && !isAuth) {
			navigate("/login");
		}

		if ((user && !isAuth) || (user === null && isAuth)) {
			setLoading(false);
		}
	}, [user, isAuth]);

	if (loading) {
		return <Loading />;
	}

	return children;
};

export default ProtectedRoute;
