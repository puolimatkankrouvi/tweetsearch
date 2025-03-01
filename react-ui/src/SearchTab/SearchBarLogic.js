import React from 'react';
import { connect } from "react-redux";
import { search } from "../apiCalls";
import { changeText, searchToState, setSearchErrorMessage, setTweetsLoading } from '../redux/reducers.js';

import SearchBar from './SearchBar';

const SearchBarLogic = (props) => {
	const sendSearch = React.useCallback(() => {
		if (props.searchText) {
			props.setTweetsLoading(true);
			props.setSearchToState(null);

			const successCallback = (json) => {
				props.setSearchToState(json);
				props.setTweetsLoading(false);
			};

			const errorCallback = (errorMessage) => {
				props.setErrorMessage(errorMessage);
				props.setTweetsLoading(false);
			};

			search(props.searchText, successCallback, errorCallback);
		}
	},
		[props.searchText]
	);

	return(
		<SearchBar
			searchText={props.searchText || ""}
			handleChange={props.setSearchText}
			sendSearch={sendSearch}
			className="Search-bar"
		/>
	);
};

function mapStateToProps(state) {
	return { searchText: state.searchTab.text };
}

function dispatchToProps(dispatch) {
	return {
		setTweetsLoading: tweetsLoading => {
			dispatch(setTweetsLoading(tweetsLoading));
		},
		setSearchToState: json => {
			dispatch(searchToState(json));
		},
		setSearchText: value => {
			dispatch(changeText(value));
		},
		setErrorMessage: errorMessage => {
			dispatch(setSearchErrorMessage(errorMessage));
		},
	};
}

export default connect(mapStateToProps, dispatchToProps)(SearchBarLogic);
