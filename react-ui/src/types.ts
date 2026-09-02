export interface TweetUser {
	name: string;
	screenName: string;
	profileImageUrl: string;
}

export interface Tweet {
	createdAt: string;
	text: string;
	user: TweetUser;
}

export interface OldSearch {
	id?: string;
	date: string;
	name: string;
}

export interface SearchWithTweets extends OldSearch {
	tweets: Tweet[];
}

export interface ErrorMessage {
	message: string;
}

export interface RawSearchResult {
	statuses: Tweet[];
}