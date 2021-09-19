import Axios from 'axios';

const searchUrl = `/api/search/`;
const saveUrl = `/api/save/`;
const oldSearchesUrl = `/api/oldsearches/`;

export function search(searchText, config, successCallback, errorCallback) {
	const encodedText = encodeURI(searchText);

	Axios.post(searchUrl, { searchText: encodedText }, config)
		.then(
			result => {
				if (result.data) {
					successCallback(result.data);
				}
				else {
					errorCallback("Error loading tweets.");
                }
			},
			error => {
				const errorMessage = typeof error === "string" ? error : error.message;
				errorCallback(errorMessage);
			}
		);
}

export function getOldSearches(successCallback, errorCallback) {
	Axios.get(oldSearchesUrl)
		.then(
			result => {
				if (result.data) {
					successCallback(result.data);
				}
			},
			() => {
				errorCallback("Error loading search history.");
			}
		);
}

export function getOldSearchWithTweets(searchId, successCallback, errorCallback) {
	Axios.get(`${oldSearchesUrl}${searchId}`)
		.then(
			result => {
				if (result.data) {
					successCallback(result.data);
				}
			},
			() => {
				errorCallback("Error loading tweets of old search.");
			}
		);
}

export function save(searchResult, name) {
	const body = {
		name,
		date: new Date(),
		tweets: searchResult.statuses,
	};

	return Axios.put(saveUrl, body);
}