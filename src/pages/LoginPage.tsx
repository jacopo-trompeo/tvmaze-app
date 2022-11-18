import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { logIn } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await logIn(email, password);
			navigate("/");
		} catch (err: any) {
			console.log(err);
		}
	};

	return (
		<main className="max-w-[90%] md:max-w-[60%] xl:max-w-[35%] mx-auto pt-48">
			<form
				className="flex flex-col items-center bg-gray-100 py-20 rounded-lg shadow-lg shadow-stone-400"
				onSubmit={handleSubmit}
			>
				<h1 className="mb-8 text-center font-bold text-2xl">
					Login to TVMaze App
				</h1>
				<div className="flex flex-col py-2 w-4/5">
					<label
						className="mb-1 font-semibold text-stone-600 text-sm"
						htmlFor="email"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						className="py-1 border border-stone-300 rounded-md"
					/>
				</div>
				<div className="flex flex-col py-2 w-4/5">
					<label
						className="mb-1 font-semibold text-stone-600 text-sm"
						htmlFor="password"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						className=" py-1 border border-stone-300 rounded-md"
					/>
				</div>
				<button
					className="bg-blue-500 w-4/5 mt-5 py-2 text-white rounded-md cursor-pointer hover:bg-blue-600"
					type="submit"
				>
					Login
				</button>
			</form>
		</main>
	);
};

export default LoginPage;
