import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface PropTypes {
	children: JSX.Element;
}

const ProtectedRoute = ({ children }: PropTypes) => {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default ProtectedRoute;
