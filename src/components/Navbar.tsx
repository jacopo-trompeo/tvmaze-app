import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
	const { logOut } = useAuth();
	const navigate = useNavigate();

	const handleLogOut = () => {
		try {
			logOut();
			navigate("/login");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<nav className="navbar bg-base-100 mb-10">
			<div className="flex-1">
				<a
					href={"/"}
					className="btn btn-ghost normal-case text-xl sm:text-2xl md:text-3xl"
				>
					TVMaze App
				</a>
			</div>

			<div className="dropdown dropdown-end">
				<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
					<div className="w-10 rounded-full">
						<img src="https://placeimg.com/80/80/people" />
					</div>
				</label>
				<ul
					tabIndex={0}
					className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
				>
					<li>
						<Link to={"/profile"}>Profile</Link>
					</li>
					<li>
						<button onClick={handleLogOut}>Logout</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
