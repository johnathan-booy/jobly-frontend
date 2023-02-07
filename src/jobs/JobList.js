import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JoblyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import "./JobList.css";
import { formatSalaries } from "../common/helpers";
import LoadingSpinner from "../common/LoadingSpinner";

function JobList() {
	const [jobs, setJobs] = useState([]);
	const [text, setText] = useState(null);

	useEffect(() => {
		const getJobs = async () => {
			const jobs = await JoblyApi.getJobs(text);
			setJobs(jobs);
		};
		getJobs();
	}, [text]);

	const searchByText = (text) => {
		setText(text ? text : null);
	};

	return (
		<div className="JobList">
			<h1>Jobs</h1>
			{jobs ? (
				<>
					<SearchForm searchByText={searchByText} />
					{jobs.map(
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
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}

export default JobList;
