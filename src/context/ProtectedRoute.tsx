import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface PropTypes {
	children: JSX.Element;
}

const ProtectedRoute = ({ children }: PropTypes) => {
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		console.log(user);
		if (user === null) {
			navigate("/login");
		}

		if (user) {
			setLoading(false);
		}
	}, [user]);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return children;
};

export default ProtectedRoute;
