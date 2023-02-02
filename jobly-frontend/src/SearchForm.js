import React, { useEffect, useState } from "react";
import "./SearchForm.css";

function SearchForm({ searchByName }) {
	const [search, setSearch] = useState("");
	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		searchByName(search);
	}, [search]);

	return (
		<form className="SearchForm">
			<input
				id="name"
				type="text"
				placeholder="Search by name..."
				value={search}
				onChange={handleChange}
			></input>
		</form>
	);
}

export default SearchForm;
