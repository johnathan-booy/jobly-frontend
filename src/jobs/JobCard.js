import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./JobCard.css";

function JobCard({ id, title, salary, equity, companyName, companyHandle }) {
	const { hasAppliedToJob, applyToJob } = useContext(UserContext);
	const handleClick = (e) => {
		e.preventDefault();
		applyToJob(id);
	};
	return (
		<Link className="JobCard" to={`/companies/${companyHandle}`}>
			<div className="JobCard-companyName">{companyName}</div>
			<div className="JobCard-title">{title}</div>
			<hr />
			<div className="JobCard-body">
				<div className="JobCard-description">
					<p>{`Salary: ${salary}`}</p>
					<p>{`Equity: ${equity}`}</p>
				</div>

				{hasAppliedToJob(id) ? (
					<button className="JobCard-apply App-button inactive">Applied</button>
				) : (
					<button
						className="JobCard-apply App-button success"
						onClick={handleClick}
					>
						Apply
					</button>
				)}
			</div>
		</Link>
	);
}

export default JobCard;
