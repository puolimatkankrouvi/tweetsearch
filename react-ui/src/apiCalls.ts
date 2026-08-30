import Axios, { type AxiosResponse } from "axios";

const searchUrl = `/api/search/`;
const oldSearchesUrl = `/api/oldsearches/`;

type SuccessCallback = (data: any) => void;
type ErrorCallback = (message: string) => void;

export function search(
	searchText: string,
	successCallback: SuccessCallback,
	errorCallback: ErrorCallback
): void {
	const encodedText = encodeURI(searchText);

	Axios.post(searchUrl, { searchText: encodedText }).then(
		(result: AxiosResponse) => {
			if (result.data) {
				successCallback(result.data);
			} else {
				errorCallback("Error loading tweets.");
			}
		},
		(error: any) => {
			const errorMessage = typeof error === "string" ? error : error.message;
			errorCallback(errorMessage);
		}
	);
}

export function getOldSearches(
	successCallback: SuccessCallback,
	errorCallback: ErrorCallback
): void {
	Axios.get(oldSearchesUrl).then(
		(result: AxiosResponse) => {
			if (result.data) {
				successCallback(result.data);
			}
		},
		() => {
			errorCallback("Error loading search history.");
		}
	);
}

export function getOldSearchWithTweets(
	searchId: string | number,
	successCallback: SuccessCallback,
	errorCallback: ErrorCallback
): void {
	Axios.get(`${oldSearchesUrl}${searchId}`).then(
		(result: AxiosResponse) => {
			if (result.data) {
				successCallback(result.data);
			}
		},
		() => {
			errorCallback("Error loading tweets of old search.");
		}
	);
}

export function save(searchResult: { statuses: any }, name: string) {
	const body = {
		name,
		date: new Date(),
		tweets: searchResult.statuses,
	};

	return Axios.post(oldSearchesUrl, body);
}