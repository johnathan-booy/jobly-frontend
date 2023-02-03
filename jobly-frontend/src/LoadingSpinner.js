import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
	return (
		<div className="loading-spinner">
			<div className="loading-spinner__bounce1"></div>
			<div className="loading-spinner__bounce2"></div>
			<div className="loading-spinner__bounce3"></div>
		</div>
	);
};

export default LoadingSpinner;
