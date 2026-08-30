import { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface SearchBarProps {
	searchText: string;
	handleChange: (value: string) => void;
	sendSearch: () => void;
}

const SearchBar = (props: SearchBarProps) => {
	useEffect(() => {
		const onEnterPressed = (ev: KeyboardEvent) => {
			if (ev.key === "Enter" && !ev.shiftKey) {
				if (props.searchText && props.searchText.length > 0) {
					props.sendSearch();
				}
			}
		};

		addEventListener("keydown", onEnterPressed);

		return function cleanup() {
			removeEventListener("keydown", onEnterPressed);
		};
	});

	return (
		<div>
			<InputText
				value={props.searchText || ""}
				onChange={(ev) => props.handleChange(ev.target.value)}
				placeholder={"...Search from tweets"}
				style={{ width: "300px" }}
			/>
			<Button
				label="Search"
				onClick={props.sendSearch}
				style={{ margin: "0 0 0 6px" }}
				disabled={true}
			/>
		</div>
	);
};

export default SearchBar;