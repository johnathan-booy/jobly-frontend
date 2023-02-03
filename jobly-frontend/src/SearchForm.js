import React, { useEffect, useState } from "react";
import "./SearchForm.css";

function SearchForm({ searchByText }) {
	const [search, setSearch] = useState("");
	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		searchByText(search);
	}, [search]);

	return (
		<form className="SearchForm">
			<input
				id="name"
				type="text"
				placeholder="Search..."
				value={search}
				onChange={handleChange}
			></input>
		</form>
	);
}

export default SearchForm;
