import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

class SearchBar extends Component {
	constructor() {
		super();
		this.onEnterPressed = this.onEnterPressed.bind(this);
	}

	componentDidMount() {
		addEventListener("keydown", this.onEnterPressed);
	}

	componentWillUnmount() {
		removeEventListener("keydown", this.onEnterPressed);
	}

	render() {
		return(
			<div>
				<InputText
					value={this.props.searchText || ""}
					onChange={ev => this.props.handleChange(ev.target.value)}
					placeholder={"...Search from tweets"}
					style={{width: "300px"}}
				/>
				<Button
					label="Search"
					onClick={this.props.sendSearch}		
					style={{margin: "0 0 0 6px"}}
				/>
			</div>
		)
	}

	onEnterPressed(ev) {
		if (ev.key === "Enter" && !ev.shiftKey) {
			if (this.props.searchText.length > 0) {
				this.props.sendSearch();
			}
		}
	}
}

export default SearchBar;