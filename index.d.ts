declare namespace TweetSearch {
    import { IsArray, Min, MinLength, ValidateNested } from "class-validator";
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
            message: string;
        }

        class TweetSaveModel {
            @Min(1)
            created_at: string;
            @Min(1)
            text: string;
            user: UserSaveModel;
        }

        class UserSaveModel {
            name: string;
            screen_name: string;
            profile_image_url: string;
        }

        export class TweetSearchSaveModel {
            @Min(1)
            name: string;
            @Min(1)
            date: string;
            @IsArray()
            @MinLength(1)
            @ValidateNested()
            tweets: ReadonlyArray<TweetSaveModel>;
        }
    }
}