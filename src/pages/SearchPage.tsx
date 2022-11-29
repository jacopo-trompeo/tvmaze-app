const SearchPage = () => {
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("searching...");
	};

	return (
		<main className="container mx-auto">
			<h1 className="text-center font-bold text-4xl mt-5">
				Search for a show
			</h1>

			<form className="mt-10" onSubmit={handleSearch}>
				<div className="relative">
					<input
						type="text"
						placeholder="Search by name..."
						className="input input-bordered input-accent w-full"
					/>
					<button className="absolute right-5 top-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</button>
				</div>
			</form>
		</main>
	);
};

export default SearchPage;
