import { ProgressBar } from "primereact/progressbar";

const LoadingIndicator = () => {
	return (
		<div className="grid" style={{ padding: "50px 0 0 0" }}>
			<div className="col-4" />
			<div className="col-4">
				<ProgressBar mode="indeterminate" />
			</div>
			<div className="col-4" />
		</div>
	);
};

export default LoadingIndicator;