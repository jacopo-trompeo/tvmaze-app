import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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
			await logInWithGoogle();
			navigate("/");
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<main className="flex flex-col justify-center items-center h-screen bg-gray-100 px-10">
			<h2 className="text-center text-4xl font-extrabold text-gray-900">
				Sign in to TVMaze App
			</h2>
			<p className="mt-4 text-center text-sm text-gray-600">
				Don't have an account?{" "}
				<Link
					to="/signup"
					className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:border-b focus:border-indigo-500"
				>
					Sign up here.
				</Link>
			</p>

			<div className="mt-8 w-full max-w-md mx-auto bg-white shadow-md rounded-lg py-10 px-6">
				{error && (
					<div className="flex mb-5 w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-pink-700">
						<p>{error}</p>
						<button
							className="ml-auto cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-white"
							onClick={() => setError("")}
						>
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="flex flex-col py-2">
						<label
							htmlFor="email"
							className="mb-1 text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						/>
					</div>
					<div className="flex flex-col py-2">
						<label
							htmlFor="password"
							className="mb-1 text-sm font-medium text-gray-700 "
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						/>
					</div>

					<button
						type="submit"
						className="mt-5 w-full py-3 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
					>
						Log In
					</button>

					<p className="text-center font-medium my-3">or</p>

					<button
						type="button"
						className="flex justify-center items-center w-full py-3 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
						onClick={handleGoogleLogin}
					>
						<svg
							fill="currentColor"
							viewBox="0 0 16 16"
							className="mr-3 w-4 h-4"
						>
							<path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
						</svg>
						Sign in with Google
					</button>
				</form>
			</div>
		</main>
	);
};

export default LoginPage;
