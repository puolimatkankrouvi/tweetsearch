import Axios, { type AxiosResponse, AxiosError } from "axios";
import type { RawSearchResult, OldSearch, SearchWithTweets, Tweet } from "./types";

declare namespace TweetSearch {
    export namespace Server {
        interface Tweet {
            created_at: string;
            text: string;
            user: User;
        }
        
        interface User {
            name: string;
            screen_name: string;
            profile_image_url: string;
        }
        
        export interface OldSearchWithoutTweets {
            id?: string;
            date: string;
            name: string;
        }
        
        export interface TweetSearch extends OldSearchWithoutTweets {
            tweets: ReadonlyArray<Tweet>;
        }

        export interface ErrorMessage {
            message: string,
        }
    }
}

const searchUrl = `/api/search/`;
const oldSearchesUrl = `/api/oldsearches/`;

function toTweet(dto: TweetSearch.Server.Tweet): Tweet {
	return {
		createdAt: dto.created_at,
		text: dto.text,
		user: {
			name: dto.user.name,
			screenName: dto.user.screen_name,
			profileImageUrl: dto.user.profile_image_url,
		},
	};
}

function toOldSearch(dto: TweetSearch.Server.OldSearchWithoutTweets): OldSearch {
	return { id: dto.id, date: dto.date, name: dto.name };
}

function toSearchWithTweets(dto: TweetSearch.Server.TweetSearch): SearchWithTweets {
	return { ...toOldSearch(dto), tweets: dto.tweets.map(toTweet) };
}

export function search(
	searchText: string,
	successCallback: (data: RawSearchResult) => void,
	errorCallback: (message: string) => void
): void {
	const encodedText = encodeURI(searchText);

	Axios.post<{ statuses: TweetSearch.Server.Tweet[] }>(searchUrl, { searchText: encodedText }).then(
		(result: AxiosResponse<{ statuses: TweetSearch.Server.Tweet[] }>) => {
			if (result.data) {
				successCallback({ statuses: result.data.statuses.map(toTweet) });
			} else {
				errorCallback("Error loading tweets.");
			}
		},
		(error: AxiosError | string) => {
			const errorMessage = typeof error === "string" ? error : error.message;
			errorCallback(errorMessage);
		}
	);
}

export function getOldSearches(
	successCallback: (data: OldSearch[]) => void,
	errorCallback: (message: string) => void
): void {
	Axios.get<TweetSearch.Server.OldSearchWithoutTweets[]>(oldSearchesUrl).then(
		(result) => {
			if (result.data) {
				successCallback(result.data.map(toOldSearch));
			}
		},
		() => {
			errorCallback("Error loading search history.");
		}
	);
}

export function getOldSearchWithTweets(
	searchId: string | number,
	successCallback: (data: SearchWithTweets) => void,
	errorCallback: (message: string) => void
): void {
	Axios.get<TweetSearch.Server.TweetSearch>(`${oldSearchesUrl}${searchId}`).then(
		(result) => {
			if (result.data) {
				successCallback(toSearchWithTweets(result.data));
			}
		},
		() => {
			errorCallback("Error loading tweets of old search.");
		}
	);
}

export function save(searchResult: RawSearchResult, name: string) {
	const body = {
		name,
		date: new Date(),
		tweets: searchResult.statuses.map((t) => ({
			created_at: t.createdAt,
			text: t.text,
			user: {
				name: t.user.name,
				screen_name: t.user.screenName,
				profile_image_url: t.user.profileImageUrl,
			},
		})),
	};

	return Axios.post(oldSearchesUrl, body);
}