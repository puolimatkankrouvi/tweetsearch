import { TweetModel } from "../models/tweet";
import { TweetSearch } from "../models/tweetSearch";

const test = {
    date:"2022-12-12T08:05:38.948Z",
    name:"Test",
    tweets: [],
};

export async function createTestTweetSearch() {
    return await TweetSearch.create(test);
}

const catTweet = {
    created_at: "Sat Dec 18 07:27:34 +0000 2021",
    text: "Cat",
    username: "test",
    screen_name: "test",
    profile_image_url: "http://pbs.twimg.com/profile_images/3478768432648726473/qr9vBGZV_normal.jpg"
};

const cats = {
    date:"2022-12-18T07:27:40.920Z",
    name:"Cats",
};

export async function createCatsTweetSearch() {
    await TweetModel.create(catTweet);
    return await TweetSearch.create(cats);
}
