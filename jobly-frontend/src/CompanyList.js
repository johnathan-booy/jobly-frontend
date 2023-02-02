import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";

function CompanyList() {
	const [companies, setCompanies] = useState([]);
	useEffect(() => {
		const getCompanies = async () => {
			const companies = await JoblyApi.getCompanies();
			setCompanies(companies);
			console.log(companies);
		};
		getCompanies();
	}, []);
	return (
		<div className="CompanyList">
			{companies.map(({ handle, name, description }) => (
				<CompanyCard handle={handle} name={name} description={description} />
			))}
		</div>
	);
}

export default CompanyList;
