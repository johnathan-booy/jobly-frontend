import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

function CompanyCard({ handle, name, description }) {
	return (
		<Link className="CompanyCard" to={`/companies/${handle}`}>
			<div className="CompanyCard-title">{name}</div>
			<hr />
			<div className="CompanyCard-description">{description}</div>
		</Link>
	);
}

export default CompanyCard;
