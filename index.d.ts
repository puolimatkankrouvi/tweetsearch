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