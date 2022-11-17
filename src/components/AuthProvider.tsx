import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PropTypes {
	children: React.ReactNode;
}

const AuthProvider = (props: PropTypes) => {
	const { children } = props;
	const auth = getAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoading(false);
			} else {
				navigate("/login");
			}
		});
	}, [auth]);

	if (loading) {
		return <p>Loading...</p>;
	}

	return <>{children}</>;
};

export default AuthProvider;
