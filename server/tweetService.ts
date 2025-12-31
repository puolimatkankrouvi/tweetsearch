import mongoose from "mongoose";
import dotenv from "dotenv";
import sanitize from "mongo-sanitize";
import db from "./db";
import { ITweetSearchDbModel } from "./models/tweetSearch";
import { TweetModel } from "./models/tweet";
import { TweetSearch } from "./models/tweetSearch";
dotenv.config();

const pageSize = 100;

function tweetSearchToResultWithoutTweets(tweetSearch: ITweetSearchDbModel): TweetSearch.Server.OldSearchWithoutTweets {
    return { id: tweetSearch._id, date: tweetSearch.date, name: tweetSearch.name };
}

export async function getTweetSearches(page: number) : Promise<ReadonlyArray<TweetSearch.Server.OldSearchWithoutTweets>> {
    await db.connect();
    
    const skip = page * pageSize;
    const tweetSearchDbModels = await TweetSearch.find(
            {},
            "name date _id",
            { limit: pageSize, skip }
    )
    .sort({"date": -1})
    .exec();

    const tweetSearches = tweetSearchDbModels.map(tweetSearchToResultWithoutTweets) as ReadonlyArray<TweetSearch.Server.OldSearchWithoutTweets>;       
    return tweetSearches;
}
    
export async function getTweetSearchWithTweets(tweetSearchId: string): Promise<TweetSearch.Server.TweetSearch | null> {
    const objectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(sanitize(tweetSearchId));

    await db.connect();

    const tweetSearch: ITweetSearchDbModel | null = await TweetSearch.findById(objectId, "tweets")
        .populate("tweets")
        .lean<ITweetSearchDbModel>()
        .exec();

    if (!tweetSearch) {
        return null;
    }

    return tweetSearchToResult(tweetSearch);
}

function tweetSearchToResult(tweetSearch: ITweetSearchDbModel): TweetSearch.Server.TweetSearch {
    // Putting user properties inside nested user object.
    return {
        name: tweetSearch.name,
        date: tweetSearch.date,
        tweets: tweetSearch.tweets.map(tweet => ({
            id: tweet._id,
            created_at: tweet.created_at,
            text: tweet.text,
            user: {
                name: tweet.username,
                screen_name: tweet.screen_name,
                profile_image_url: tweet.profile_image_url,
            }
        })),
    };
}

export async function saveTweetSearch(tweet: TweetSearch.Server.TweetSearch): Promise<TweetSearch.Server.TweetSearch> {
    await db.connect();

    const tweets = [];

    for (const status of tweet.tweets) {
        const tweet = new TweetModel({
            created_at: status.created_at,
            text: status.text,
            username: status.user.name,
            screen_name: status.user.screen_name,
            profile_image_url: status.user.profile_image_url,
        });

        tweets.push(tweet);
        await tweet.save();
    }

    const tweetSearch = new TweetSearch({
        date: tweet.date,
        name: tweet.name,
        tweets,
    });

    const tweetSearchDbModel = await tweetSearch.save();

    return tweetSearchToResult(tweetSearchDbModel);
}