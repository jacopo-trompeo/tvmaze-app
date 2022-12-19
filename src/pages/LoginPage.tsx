import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import GoogleIcon from "../components/icons/GoogleIcon";
import ErrorAlert from "../components/ErrorAlert";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { logIn, logInWithGoogle } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		if(!email || !password) {
			setError("Please fill in all fields");
			setLoading(false);
			return;
		}

		try {
			setError("");
			await logIn(email, password);
		} catch (error: any) {
			setError(error);
		}

		setLoading(false);
	}

	const handleGoogleLogin = () => {
		logInWithGoogle();
	}

	return (
		<main className="flex flex-col justify-center items-center h-screen px-10">
			<h1 className="text-center text-4xl font-extrabold">
				Sign in to TVMaze App
			</h1>
			<p className="mt-4 text-center text-sm">
				Don't have an account?{" "}
				<Link
					to="/signup"
					className="font-medium text-secondary hover:text-secondary-focus focus:outline-none focus:border-b focus:border-secondary"
				>
					Sign up here.
				</Link>
			</p>

			<div className="mt-8 w-full max-w-md mx-auto bg-neutral shadow-md rounded-lg py-10 px-6">
				{error && (
					<ErrorAlert error={error} closeError={() => setError("")} />
				)}

				<form onSubmit={handleSubmit}>
					<div className="flex flex-col py-2">
						<label
							htmlFor="email"
							className="mb-1 text-sm font-medium"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							className="input input-bordered w-full"
						/>
					</div>
					<div className="flex flex-col py-2">
						<label
							htmlFor="password"
							className="mb-1 text-sm font-medium"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="input input-bordered w-full"
						/>
					</div>

					<button
						type="submit"
						className={`mt-5 w-full btn btn-primary ${loading && "loading"}`}
					>
						Log In
					</button>

					<p className="text-center font-medium my-3">or</p>

					<button
						type="button"
						className="flex justify-center items-center w-full py-3 px-4 btn btn-primary"
						onClick={handleGoogleLogin}
					>
						<GoogleIcon />
						Sign in with Google
					</button>
				</form>
			</div>
		</main>
	);
};

export default LoginPage;
