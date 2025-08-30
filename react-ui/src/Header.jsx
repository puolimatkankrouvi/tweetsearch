import React from 'react';
import './Header.css';
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();
	const title = <h1 className="app-title">Tweetsearch</h1>;

	function navigateToPage(path) {
		navigate(path);
	}

	const menuItems = [
		{label: "Search", command: () => navigateToPage("/")},
		{label: "Saved searches", command: () => navigateToPage("/saved")},
	];

	return(
		<Menubar
			start={title}
			model={menuItems}
		/>
	);
}
