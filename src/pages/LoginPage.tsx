import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { signInUser } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await signInUser(email, password);
			navigate("/");
		} catch (err: any) {
			console.log(err);
		}
	};

	return (
		<form className="m-10" onSubmit={handleSubmit}>
			<div className="flex flex-col py-2">
				<label htmlFor="email">Email</label>
				<input
					onChange={e => setEmail(e.target.value)}
					value={email}
					className="border-2 border-stone-500 p-2 rounded"
					type="email"
					name="email"
					id="email"
				/>
			</div>
			<div className="flex flex-col py-2">
				<label htmlFor="password">Password</label>
				<input
					onChange={e => setPassword(e.target.value)}
					value={password}
					className="border-2 border-stone-500 p-2 rounded"
					type="password"
					name="password"
					id="password"
				/>
			</div>
			<button
				className="bg-blue-600 cursor-pointer hover:bg-blue-700 w-full p-3 text-white font-bold rounded"
				type="submit"
			>
				Login
			</button>
		</form>
	);
};

export default LoginPage;
