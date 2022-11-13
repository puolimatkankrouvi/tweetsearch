import React, { useEffect } from 'react';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const SearchBar = (props) => {
	useEffect(() => {
		addEventListener("keydown", onEnterPressed);

		return function cleanup() {
			removeEventListener("keydown", onEnterPressed);
		};
	});

	const onEnterPressed = (ev) => {
		if (ev.key === "Enter" && !ev.shiftKey) {
			if (props.searchText.length > 0) {
				props.sendSearch();
			}
		}
	}

	return(
		<div>
			<InputText
				value={props.searchText || ""}
					onChange={ev => props.handleChange(ev.target.value)}
				placeholder={"...Search from tweets"}
				style={{width: "300px"}}
			/>
			<Button
				label="Search"
				onClick={props.sendSearch}		
				style={{margin: "0 0 0 6px"}}
			/>
		</div>
	);
}

export default SearchBar;