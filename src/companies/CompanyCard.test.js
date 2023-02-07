import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Link, MemoryRouter } from "react-router-dom";
import CompanyCard from "./CompanyCard";

afterEach(cleanup);

it("renders company name", () => {
	const { getByText } = render(
		<MemoryRouter>
			<CompanyCard
				handle="test"
				name="Test Company"
				description="A test company"
			/>
		</MemoryRouter>
	);
	expect(getByText("Test Company")).toBeInTheDocument();
});

it("renders company description", () => {
	const { getByText } = render(
		<MemoryRouter>
			<CompanyCard
				handle="test"
				name="Test Company"
				description="A test company"
			/>
		</MemoryRouter>
	);
	expect(getByText("A test company")).toBeInTheDocument();
});

it("renders company link", () => {
	const { getByRole } = render(
		<MemoryRouter>
			<CompanyCard
				handle="test"
				name="Test Company"
				description="A test company"
			/>
		</MemoryRouter>
	);
	const link = getByRole("link");
	expect(link.getAttribute("href")).toBe(`/companies/test`);
});
