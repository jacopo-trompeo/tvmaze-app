import CloseIcon from "./icons/CloseIcon";

interface PropTypes {
	error: string;
	closeError: () => void;
}

const ErrorAlert = ({ error, closeError }: PropTypes) => {
	return (
		<div className="flex mb-5 w-full py-2 px-4 rounded-md text-sm font-medium text-primary-content bg-error">
			<p>{error}</p>
			<button
				className="ml-auto cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-primary-content"
				onClick={closeError}
			>
				<CloseIcon />
			</button>
		</div>
	);
};

export default ErrorAlert;
