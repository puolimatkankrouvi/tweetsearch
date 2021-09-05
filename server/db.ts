import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const tweetSchema = new mongoose.Schema({
    text: String,
    created_at: String,

    username: String,
    screen_name: String,
    profile_image_url: String,
});

interface ITweetDbModel extends mongoose.Document {
    text: string;
    created_at: string;

    username: string;
    screen_name: string;
    profile_image_url: string;
}

const TweetModel = mongoose.model<ITweetDbModel>("TweetModel", tweetSchema);

const tweetCollectionSchema = new mongoose.Schema({
    tweets: [{type: mongoose.Schema.Types.ObjectId , ref: "TweetModel"}],
    date: Date,
    name: String,
});

interface ITweetSearchDbModel extends mongoose.Document {
    tweets: ReadonlyArray<ITweetDbModel>,
    date: string,
    name: string,
}

const TweetSearch = mongoose.model<ITweetSearchDbModel>("TweetSearch", tweetCollectionSchema);

export interface ITweetSearch {
    date: string;
    name: string;
    statuses: ReadonlyArray<ITweet>;
}

interface ITweet {
    created_at: string;
    text: string;
    user: IUser;
}

interface IUser {
    name: string;
    screen_name: string;
    profile_image_url: string;
}

const pageSize = 100;

const connectionString = process.env.CONNECTION_STRING || "";

export async function getTweetSearches(page: number) {
    await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
    
    const skip = page * pageSize;
    const tweetSearches = await TweetSearch.find(
            {},
            "name date _id",
            { limit: 100, skip }
    )
    .sort({"date": -1})
    .exec();
        
    return tweetSearches;
}

export interface ISearchWithTweets {
    tweets: ReadonlyArray<ITweet>;
}
    
export async function getTweetSearchWithTweets(tweetSearchId: string): Promise<ISearchWithTweets> {
    await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
    const tweetSearch: ITweetSearchDbModel | null = await TweetSearch.findById(tweetSearchId, "tweets")
        .populate("tweets")
        .lean<ITweetSearchDbModel>()
        .exec();

    return tweetSearchToResult(tweetSearch);
}

function tweetSearchToResult(tweetSearch: ITweetSearchDbModel | null): ISearchWithTweets {
    if (tweetSearch) {
        // Putting user properties inside nested user object.
        return {
            ...tweetSearch,
            tweets: tweetSearch.tweets.map(tweet => ({
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

    return {
        tweets: [],
    };
}

export async function saveTweets(tweetJson: ITweetSearch): Promise<mongoose.Document> {
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    const tweets = [];

    for (const status of tweetJson.statuses) {
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
        date: tweetJson.date,
        name: tweetJson.name,
        tweets,
    });

    return await tweetSearch.save();
}