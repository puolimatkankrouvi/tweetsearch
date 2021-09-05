import React from 'react';
import { connect } from "react-redux";
import { search } from "../apiCalls";
import { changeText, searchToState, setSearchErrorMessage, setTweetLoadProgress, setTweetsLoading } from '../redux/actions.js';

import SearchBar from './SearchBar';

const searchBarLogic = (props) => {
	const sendSearch = React.useCallback(() => {
		if (props.searchText) {
			props.setTweetsLoading(true);
			props.setSearchToState(null);
			
			const config = {
				onUploadProgress: function(progressEvent) {
					const percentage = calculatePercentageCompleted(progressEvent);
					props.setTweetLoadProgress(percentage);
				}
			}

			const successCallback = (json) => {
				props.setSearchToState(json);
				props.setTweetsLoading(false);
			};

			const errorCallback = (errorMessage) => {
				props.setErrorMessage(errorMessage);
				props.setTweetsLoading(false);
			};

			search(props.searchText, config, successCallback, errorCallback);
		}
	},
		[props.searchText]
	);

	return(
		<SearchBar
			searchText={props.searchText}
			handleChange={props.setSearchText}
			sendSearch={sendSearch}
			className="Search-bar"
		/>
	);
};

function mapStateToProps(state) {
	return { searchText: state.text };
}

function calculatePercentageCompleted(progressEvent) {
	if (progressEvent) {
		return Math.floor((progressEvent.loaded * 100) / progressEvent.total);
	}

	return 0;
}

function dispatchToProps(dispatch) {
	return {
		setTweetLoadProgress: percentage => {			
			dispatch(setTweetLoadProgress(percentage));
		},
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

export default connect(mapStateToProps, dispatchToProps)(searchBarLogic);
