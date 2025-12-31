import mongoose from "mongoose";
import { ITweetDbModel } from "./tweet";
import { tweetCollectionSchema } from "../schemas/tweetCollection";

export interface ITweetSearchDbModel extends mongoose.Document<string> {
    tweets: ReadonlyArray<ITweetDbModel>,
    date: string,
    name: string,
}

export const TweetSearch = mongoose.model<ITweetSearchDbModel>("TweetSearch", tweetCollectionSchema);
