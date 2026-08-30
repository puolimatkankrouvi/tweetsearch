import React from "react";
import OldSearchesList from "./OldSearchesList";
import SearchHistoryHeader from "./SearchHistoryHeader";
import TweetList from "../TweetList";
import ErrorMessage from "../ErrorMessage";

import { getOldSearches, getOldSearchWithTweets } from "../apiCalls";

interface Search {
	id?: string | number;
	name: string;
	date?: string | number | Date;
	[key: string]: any;
}

interface Tweet {
	[key: string]: any;
}

const SET_OLD_SEARCHES = "SET_OLD_SEARCHES";
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
const SET_SELECTED_SEARCH = "SET_SELECTED_SEARCH";
const SET_TWEETS_OF_SELECTED_SEARCH = "SET_TWEETS_OF_SELECTED_SEARCH";
const BACK_TO_SAVED_SEARCHES_LIST = "BACK_TO_LIST_SEARCH_LIST";

interface SetOldSearchesAction {
	type: typeof SET_OLD_SEARCHES;
	oldSearches: Search[];
}

interface SetErrorMessageAction {
	type: typeof SET_ERROR_MESSAGE;
	errorMessage: string;
}

interface SetSelectedSearchAction {
	type: typeof SET_SELECTED_SEARCH;
	search: Search;
}

interface SetTweetsOfSelectedSearchAction {
	type: typeof SET_TWEETS_OF_SELECTED_SEARCH;
	tweets: Tweet[];
}

interface BackToSavedSearchesListAction {
	type: typeof BACK_TO_SAVED_SEARCHES_LIST;
}

type SearchHistoryAction =
	| SetOldSearchesAction
	| SetErrorMessageAction
	| SetSelectedSearchAction
	| SetTweetsOfSelectedSearchAction
	| BackToSavedSearchesListAction;

interface SearchHistoryState {
	searchesLoading: boolean;
	oldSearches: Search[];
	errorMessage: string | null;
	selectedSearch: Search | null;
	tweetsOfSelectedSearchLoading: boolean;
	tweetsOfSelectedSearch: Tweet[];
}

function reducer(state: SearchHistoryState, action: SearchHistoryAction): SearchHistoryState {
	switch (action.type) {
		case SET_OLD_SEARCHES:
			return {
				...state,
				oldSearches: action.oldSearches,
				searchesLoading: false,
				errorMessage: null,
			};
		case SET_ERROR_MESSAGE:
			return {
				...state,
				searchesLoading: false,
				errorMessage: action.errorMessage,
			};
		case SET_SELECTED_SEARCH:
			return {
				...state,
				selectedSearch: action.search,
				tweetsOfSelectedSearchLoading: true,
			};
		case SET_TWEETS_OF_SELECTED_SEARCH:
			return {
				...state,
				tweetsOfSelectedSearchLoading: false,
				tweetsOfSelectedSearch: action.tweets,
			};
		case BACK_TO_SAVED_SEARCHES_LIST:
			return {
				...state,
				errorMessage: null,
				tweetsOfSelectedSearchLoading: true,
				selectedSearch: null,
				tweetsOfSelectedSearch: [],
			};
		default:
			return state;
	}
}

const initialState: SearchHistoryState = {
	searchesLoading: true,
	oldSearches: [],
	errorMessage: null,

	selectedSearch: null,
	tweetsOfSelectedSearchLoading: true,
	tweetsOfSelectedSearch: [],
};

const SearchHistoryTab = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	const {
		searchesLoading,
		errorMessage,
		oldSearches,
		selectedSearch,
		tweetsOfSelectedSearch,
		tweetsOfSelectedSearchLoading,
	} = { ...state };

	const onSearchSelected = React.useCallback((search: Search) => {
		dispatch({ type: SET_SELECTED_SEARCH, search });
	}, []);

	React.useEffect(() => {
		const successCallback = (oldSearches: Search[]) => {
			dispatch({ type: SET_OLD_SEARCHES, oldSearches });
		};
		const errorCallback = (errorMessage: string) =>
			dispatch({ type: SET_ERROR_MESSAGE, errorMessage });

		getOldSearches(successCallback, errorCallback);
	}, []);

	React.useEffect(() => {
		if (selectedSearch && selectedSearch.id) {
			const successCallback = (oldSearch: { tweets: Tweet[] }) => {
				dispatch({ type: SET_TWEETS_OF_SELECTED_SEARCH, tweets: oldSearch.tweets });
			};

			const errorCallback = (errorMessage: string) =>
				dispatch({ type: SET_ERROR_MESSAGE, errorMessage });
			getOldSearchWithTweets(selectedSearch.id, successCallback, errorCallback);
		}
	}, [selectedSearch]);

	const backToSavedSearchesList = React.useCallback(() => {
		dispatch({ type: BACK_TO_SAVED_SEARCHES_LIST });
	}, []);

	return (
		<div>
			<SearchHistoryHeader
				selectedSearch={selectedSearch}
				backToSavedSearchesList={backToSavedSearchesList}
			/>
			{selectedSearch ? (
				<TweetList loading={tweetsOfSelectedSearchLoading} tweets={tweetsOfSelectedSearch} />
			) : (
				<OldSearchesList
					loading={searchesLoading}
					oldSearches={oldSearches}
					onSearchSelected={onSearchSelected}
				/>
			)}
			{errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
		</div>
	);
};

export default SearchHistoryTab;