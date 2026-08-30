import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { search } from "../apiCalls";
import { changeText, searchToState, setSearchErrorMessage, setTweetsLoading } from "../redux/reducers";
import type { RootState } from "../redux/reducers";
import type { RawSearchResult } from "../types";

import SearchBar from "./SearchBar";

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

			const successCallback = (json: RawSearchResult) => {
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

	return <SearchBar searchText={searchText || ""} handleChange={handleChange} sendSearch={sendSearch} />;
};

export default SearchBarLogic;