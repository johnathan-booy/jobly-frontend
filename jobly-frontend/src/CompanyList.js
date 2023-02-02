import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";
import SearchForm from "./SearchForm";
import "./CompanyList.css";

function CompanyList() {
	const [companies, setCompanies] = useState([]);
	const [name, setName] = useState(null);

	useEffect(() => {
		const getCompanies = async () => {
			const companies = await JoblyApi.getCompanies(name);
			setCompanies(companies);
		};
		getCompanies();
	}, [name]);

	const searchByName = (name) => {
		setName(name ? name : null);
	};

	return (
		<div className="CompanyList">
			<h1>Companies</h1>
			<SearchForm searchByName={searchByName} />
			{companies.map(({ handle, name, description }) => (
				<CompanyCard
					key={handle}
					handle={handle}
					name={name}
					description={description}
				/>
			))}
		</div>
	);
}

export default CompanyList;
