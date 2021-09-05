import * as React from "react";
import OldSearchesList from "./OldSearchesList";
import SearchHistoryHeader from "./SearchHistoryHeader";
import TweetList from "../TweetList";
import ErrorMessage from "../ErrorMessage";

import { getOldSearches, getOldSearchWithTweets } from "../apiCalls";

const SET_OLD_SEARCHES = "SET_OLD_SEARCHES";
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
const SET_SELECTED_SEARCH = "SET_SELECTED_SEARCH";
const SET_TWEETS_OF_SELECTED_SEARCH = "SET_TWEETS_OF_SELECTED_SEARCH";

function reducer(state, action) {
    switch (action.type) {
        case SET_OLD_SEARCHES:
            return {
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
    }
}

const initialState = {
    searchesLoading: true,
    oldSearches: [],
    errorMessage: null,

    selectedSearch: null,
    tweetsOfSelectedSearchLoading: true,
    tweetsOfSelectedSearch: [],
};

const searchHistoryTab = () => {    
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    const {
        searchesLoading,
        errorMessage,
        oldSearches,
        selectedSearch,
        tweetsOfSelectedSearch,
        tweetsOfSelectedSearchLoading,
    } = {...state};

    const onSearchSelected = React.useCallback(
        (search) => {
            dispatch({ type: SET_SELECTED_SEARCH, search })
        },
        []
    );
    
    React.useEffect(
        () => {
            const successCallback = (oldSearches) => {dispatch({ type: SET_OLD_SEARCHES, oldSearches });};        
			const errorCallback = (errorMessage) => (dispatch({ type: SET_ERROR_MESSAGE, errorMessage }));
            
            getOldSearches(successCallback, errorCallback);
        },
        []
    );

    React.useEffect(
        () => {
            if (selectedSearch && selectedSearch._id) {
                const successCallback = (oldSearch) => {
                    dispatch({ type: SET_TWEETS_OF_SELECTED_SEARCH, tweets: oldSearch.tweets }
                )};

                const errorCallback = (errorMessage) => (dispatch({ type: SET_ERROR_MESSAGE, errorMessage }));
                getOldSearchWithTweets(selectedSearch._id, successCallback, errorCallback);
            }
        },
        [selectedSearch]
    );

    return (
        <div>
            <SearchHistoryHeader
                selectedSearch={selectedSearch}
            />
            {selectedSearch ?
                <TweetList
                    loading={tweetsOfSelectedSearchLoading}
                    tweets={tweetsOfSelectedSearch}
                />
                : 
                <OldSearchesList
                    loading={searchesLoading}
                    oldSearches={oldSearches}
                    onSearchSelected={onSearchSelected}
                />
            }       
            {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
        </div>
    );
};

export default searchHistoryTab;