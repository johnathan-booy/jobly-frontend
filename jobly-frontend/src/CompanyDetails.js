import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import "./CompanyDetails.css";
import { formatSalaries } from "./helpers";
import { useParams } from "react-router-dom";

function CompanyDetails() {
	const { handle } = useParams();
	const [company, setCompany] = useState(null);

	useEffect(() => {
		const getCompany = async () => {
			const company = await JoblyApi.getCompany(handle);
			setCompany(company);
		};
		getCompany();
	}, []);

	return (
		<div className="CompanyDetails">
			{company ? (
				<>
					<h1>{company.name}</h1>
					<div className="CompanyDetails-description">
						{company.description}
					</div>
					{company.jobs.map(
						({ id, title, salary, equity, companyName, companyHandle }) => (
							<JobCard
								key={id}
								title={title}
								salary={formatSalaries(salary)}
								equity={equity}
								companyName={companyName}
								companyHandle={companyHandle}
							/>
						)
					)}
				</>
			) : null}
		</div>
	);
}

export default CompanyDetails;
