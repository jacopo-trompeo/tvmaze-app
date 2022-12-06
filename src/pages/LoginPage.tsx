import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "../components/icons/CloseIcon";
import GoogleIcon from "../components/icons/GoogleIcon";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { logIn, logInWithGoogle } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email || !password) {
			setError("Please fill in all fields");
			return;
		}

		try {
			await logIn(email, password);
			navigate("/");
		} catch (error: any) {
			if (error.code === "auth/user-not-found") {
				setError("Incorrect credentials");
			}
		}
	};

	const handleGoogleLogin = async () => {
		try {
			logInWithGoogle();
			navigate("/");
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<main className="flex flex-col justify-center items-center h-screen px-10">
			<h2 className="text-center text-4xl font-extrabold">
				Sign in to TVMaze App
			</h2>
			<p className="mt-4 text-center text-sm">
				Don't have an account?{" "}
				<Link
					to="/signup"
					className="font-medium text-secondary-focus hover:text-secondary focus:outline-none focus:border-b focus:border-secondary"
				>
					Sign up here.
				</Link>
			</p>

			<div className="mt-8 w-full max-w-md mx-auto bg-neutral shadow-md rounded-lg py-10 px-6">
				{error && (
					<div className="flex mb-5 w-full py-2 px-4 rounded-md text-sm font-medium text-primary-content bg-error">
						<p>{error}</p>
						<button
							className="ml-auto cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-primary-content"
							onClick={() => setError("")}
						>
							<CloseIcon />
						</button>
					</div>
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
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
							className="input input-bordered w-full"
						/>
					</div>

					<button
						type="submit"
						className="mt-5 w-full btn btn-primary"
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
