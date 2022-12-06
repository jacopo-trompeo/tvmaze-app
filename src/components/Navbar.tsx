import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import avatarImage from "../assets/avatar.jpg";

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
		<nav className="navbar bg-base-100 mb-10 p-3 sticky top-0 z-50">
			<div className="flex-1">
				<a
					href={"/"}
					className="btn btn-ghost normal-case text-xl sm:text-2xl md:text-3xl font-bold"
				>
					<span className="text-accent">TVMaze</span> App
				</a>
			</div>

			<div className="dropdown dropdown-end">
				<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
					<div className="w-20 rounded-full">
						<img src={avatarImage} />
					</div>
				</label>
				<ul
					tabIndex={0}
					className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 ring-1 ring-accent"
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
