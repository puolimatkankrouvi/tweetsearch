import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { search } from "../apiCalls";
import { changeText, searchToState, setSearchErrorMessage, setTweetsLoading } from "../redux/reducers";

import SearchBar from "./SearchBar";

interface SearchTabState {
	text: string;
}

interface RootState {
	searchTab: SearchTabState;
}

const SearchBarLogic = () => {
	const searchText = useSelector((state: RootState) => state.searchTab.text);
	const dispatch = useDispatch();

	const handleChange = React.useCallback(
		(text: string) => {
			dispatch(changeText(text));
		},
		[dispatch]
	);

	const sendSearch = React.useCallback(() => {
		if (searchText) {
			dispatch(setTweetsLoading(true));
			dispatch(searchToState(null));

			const successCallback = (json: any) => {
				dispatch(searchToState(json));
				dispatch(setTweetsLoading(false));
			};

			const errorCallback = (errorMessage: string) => {
				dispatch(setSearchErrorMessage(errorMessage));
				dispatch(setTweetsLoading(false));
			};

			search(searchText, successCallback, errorCallback);
		}
	}, [searchText, dispatch]);

	return (
		<SearchBar
			searchText={searchText || ""}
			handleChange={handleChange}
			sendSearch={sendSearch}
		/>
	);
};

export default SearchBarLogic;