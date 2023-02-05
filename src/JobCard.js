import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ id, title, salary, equity, companyName, companyHandle }) {
	return (
		<Link className="JobCard" to={`/companies/${companyHandle}`}>
			<div className="JobCard-companyName">{companyName}</div>
			<div className="JobCard-title">{title}</div>
			<hr />
			<div className="JobCard-description">
				<p>{`Salary: ${salary}`}</p>
				<p>{`Equity: ${equity}`}</p>
			</div>
		</Link>
	);
}

export default JobCard;
