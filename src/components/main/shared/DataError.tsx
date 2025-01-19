// Components
import ErrorButtons from "./404Buttons";

export default function DataError() {
	return (
		<div className="grow w-full flex flex-col justify-center items-center">
			<h1 className="font-bold text-3xl">Oops!</h1>
			<div>Something went wrong.</div>
			<div>Refresh the page or try again later.</div>
			<div className="w-1/6 mt-10">
				<ErrorButtons />
			</div>
		</div>
	);
}
