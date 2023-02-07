import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import "./CompanyList.css";
import LoadingSpinner from "../common/LoadingSpinner";

function CompanyList() {
	const [companies, setCompanies] = useState([]);
	const [text, setText] = useState(null);

	useEffect(() => {
		const getCompanies = async () => {
			const companies = await JoblyApi.getCompanies(text);
			setCompanies(companies);
		};
		getCompanies();
	}, [text]);

	const searchByText = (text) => {
		setText(text ? text : null);
	};

	return (
		<div className="CompanyList">
			<h1>Companies</h1>
			{companies ? (
				<>
					<SearchForm searchByText={searchByText} />
					{companies.map(({ handle, name, description }) => (
						<CompanyCard
							key={handle}
							handle={handle}
							name={name}
							description={description}
						/>
					))}
				</>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}

export default CompanyList;
