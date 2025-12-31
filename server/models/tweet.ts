import mongoose from "mongoose";
import { tweetSchema } from "../schemas/tweet";

export interface ITweetDbModel extends mongoose.Document {
    text: string;
    created_at: string;

    username: string;
    screen_name: string;
    profile_image_url: string;
}

export const TweetModel = mongoose.model<ITweetDbModel>("TweetModel", tweetSchema);
