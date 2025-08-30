import React, { useEffect } from 'react';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const SearchBar = (props) => {
	useEffect(() => {
		const onEnterPressed = (ev) => {
			if (ev.key === "Enter" && !ev.shiftKey) {
				if (props.searchText && props.searchText.length > 0) {
					props.sendSearch();
				}
			}
		}

		addEventListener("keydown", onEnterPressed);

		return function cleanup() {
			removeEventListener("keydown", onEnterPressed);
		};
	});

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
				disabled={true}
			/>
		</div>
	);
}

export default SearchBar;