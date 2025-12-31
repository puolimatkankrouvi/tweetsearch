import mongoose from "mongoose";

export const tweetCollectionSchema = new mongoose.Schema({
    tweets: [{type: mongoose.Schema.Types.ObjectId , ref: "TweetModel"}],
    date: Date,
    name: String,
});
