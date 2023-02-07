import React, { useEffect, useState } from "react";
import JobCard from "../jobs/JobCard";
import JoblyApi from "../api/api";
import "./CompanyDetails.css";
import { formatSalaries } from "../common/helpers";
import LoadingSpinner from "../common/LoadingSpinner";

function CompanyDetails({ handle }) {
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
								id={id}
								title={title}
								salary={formatSalaries(salary)}
								equity={equity}
								companyName={companyName}
								companyHandle={companyHandle}
							/>
						)
					)}
				</>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}

export default CompanyDetails;
