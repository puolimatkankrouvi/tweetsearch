import React from 'react';
import './Header.css';
import { Menubar } from "primereact/menubar";
import { useHistory } from "react-router-dom";

export default function Header() {
	const history = useHistory();
	const title = <h1 className="app-title">Tweetsearch</h1>;

	function navigateToPage(path) {
		history.push(path);
	}

	const menuItems = [
		{label: "Search", command: () => navigateToPage("/")},
		{label: "Saved searches", command: () => navigateToPage("/history")},
	];

	return(
		<Menubar
			start={title}
			model={menuItems}
		/>
	);
}
