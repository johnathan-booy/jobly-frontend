import React, { useContext } from "react";
import FlashContext from "./FlashContext";
import { v4 as uuid } from "uuid";
import "./FlashMessages.css";

function FlashMessages() {
	const { flashMessages } = useContext(FlashContext);
	return (
		<div className="FlashMessages">
			{flashMessages.map((flash) => (
				<div className={`FlashMessage ${flash.type}`} key={uuid()}>
					{flash.message}
				</div>
			))}
		</div>
	);
}

export default FlashMessages;
