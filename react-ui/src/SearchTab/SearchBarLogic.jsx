import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { search } from "../apiCalls.js";
import { changeText, searchToState, setSearchErrorMessage, setTweetsLoading } from '../redux/reducers.js';

import SearchBar from './SearchBar.jsx';

const SearchBarLogic = () => {
	const searchText = useSelector(state => state.searchTab.text);
	const dispatch = useDispatch();

	const handleChange = React.useCallback((text) => {
		dispatch(changeText(text));
	}, []);

	const sendSearch = React.useCallback(() => {
		if (searchText) {
			dispatch(setTweetsLoading(true));
			dispatch(searchToState(null));

			const successCallback = (json) => {
				dispatch(searchToState(json));
				dispatch(setTweetsLoading(false));
			};

			const errorCallback = (errorMessage) => {
				dispatch(setSearchErrorMessage(errorMessage));
				dispatch(setTweetsLoading(false));
			};

			search(searchText, successCallback, errorCallback);
		}
	},
		[searchText]
	);

	return(
		<SearchBar
			searchText={searchText || ""}
			handleChange={handleChange}
			sendSearch={sendSearch}
			className="Search-bar"
		/>
	);
};

export default SearchBarLogic;
