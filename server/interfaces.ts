export interface ITweet {
    created_at: string;
    text: string;
    user: IUser;
}

export interface IUser {
    name: string;
    screen_name: string;
    profile_image_url: string;
}

export interface IOldSearchWithoutTweets {
    id?: string;
    date: string;
    name: string;
}

export interface ITweetSearch extends IOldSearchWithoutTweets {
    tweets: ReadonlyArray<ITweet>;
}