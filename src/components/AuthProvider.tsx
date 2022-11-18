import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PropTypes {
	children: React.ReactNode;
	options?: { auth: boolean };
}

const AuthProvider = (props: PropTypes) => {
	const { children, options } = props;
	const auth = getAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkAuthentication();
		return () => checkAuthentication();
	}, [auth]);

	const checkAuthentication = onAuthStateChanged(auth, (user) => {
		console.log(!!user, options?.auth);
		if (!user && !options?.auth) {
			navigate("/login");
		} else if (!user && options?.auth) {
			setLoading(false);
		} else if (user && !options?.auth) {
			setLoading(false);
		} else {
			navigate("/");
		}

		setLoading(false);
	});

	if (loading) {
		return <p>Loading...</p>;
	}

	return <>{children}</>;
};

export default AuthProvider;
