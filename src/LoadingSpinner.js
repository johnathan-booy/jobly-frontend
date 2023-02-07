import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
	return (
		<div className="LoadingSpinner-wrapper">
			<div className="LoadingSpinner">
				<div className="LoadingSpinner__bounce1"></div>
				<div className="LoadingSpinner__bounce2"></div>
				<div className="LoadingSpinner__bounce3"></div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
