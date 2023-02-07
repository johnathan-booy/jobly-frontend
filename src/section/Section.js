import React from "react";
import FlashMessages from "../common/FlashMessages";
import "./Section.css";

function Section({ children, type = "narrow" }) {
	return (
		<section className={`Section Section-${type}`}>
			<FlashMessages />
			{children}
		</section>
	);
}

export default Section;
