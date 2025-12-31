import * as tweetService from "../tweetService";
import db from "../db";
import { createCatsTweetSearch } from "./testData";

beforeAll(async () => await db.connect());
beforeEach(async () => await db.addTestDataToInMemoryDatabase());
afterEach(async () => await db.clearInMemoryDatabase());
afterAll(async () => await db.closeInMemoryDatabase());

describe("getTweetSearches", () => {
    test("First page has two tweetsearches", async () => {
        const page = 0;
        const tweetSearches = await tweetService.getTweetSearches(page);
        expect(tweetSearches.length).toBe(2);
    });
    test("Tweetsearches with latest date is first", async () => {
        const page = 0;
        const tweetSearches = await tweetService.getTweetSearches(page);

        const firstTweetSearch = tweetSearches.at(0);
        expect(firstTweetSearch?.name).toBe("Cats");
    });
    test("Second page has no tweetsearches", async () => {
        const page = 1;
        const tweetSearches = await tweetService.getTweetSearches(page);
        expect(tweetSearches.length).toBe(0);
    });
});

describe("getTweetSearchWithTweets", () => {
    test("Returns tweet with existing id", async () => {
        const cats = await createCatsTweetSearch();
        const existingId = cats._id.toString();
        const tweetSearch = await tweetService.getTweetSearchWithTweets(existingId);
        expect(tweetSearch).not.toBeNull();
    });
    test("Returns null with non existing id", async () => {
        const nonExistingId = "63c26ba06d81678661725eb4";
        const tweetSearch = await tweetService.getTweetSearchWithTweets(nonExistingId);
        expect(tweetSearch).toBe(null);
    });
});

describe("saveTweetSearch", () => {
    test("Save tweet search", async () => {
        const tweetSearchToSave = {
            date:"2023-07-02T12:21:00.000Z",
            name:"Yay",
            tweets: [
                    {
                        id: "64a16c55db5d24c84affbe5d",
                        created_at: "Sun Jul 02 12:19:35 +0000 2023",
                        text: "RT @haelovs: run.......                         YAY! https://t.co/HBC2W2V2MP",
                        user: {
                            name: "ตรีศร",
                            screen_name: "haechankillerz",
                            profile_image_url: "http://pbs.twimg.com/profile_images/1673346980461043714/sxFHdnDX_normal.jpg"
                        }
                    },
                    {
                        id: "64a16c56db5d24c84affbe5f",
                        created_at: "Sun Jul 02 12:19:35 +0000 2023",
                        text: "RT @haelovs: run.......                         YAY! https://t.co/HBC2W2V2MP",
                        user: {
                            name: "ก๋อง",
                            screen_name: "meowdoramiii",
                            profile_image_url: "http://pbs.twimg.com/profile_images/1673683501043032066/1hfu-m4T_normal.jpg"
                        }
                    },
                    {
                        id: "64a16c56db5d24c84affbe61",
                        created_at: "Sun Jul 02 12:19:34 +0000 2023",
                        text: "😍😍😍😍 oh yay https://t.co/hOwhoiLXIb",
                        user: {
                            name: "luffy 🏹",
                            screen_name: "haeseolar",
                            profile_image_url: "http://pbs.twimg.com/profile_images/1673219207809454080/oSIBPogx_normal.jpg"
                        }
                    },
                    {
                        id: "64a16c56db5d24c84affbe63",
                        created_at: "Sun Jul 02 12:19:33 +0000 2023",
                        text: "@A_Vermillion__ Yay",
                        user: {
                            name: "Yayoi ❓",
                            screen_name: "yayoikus",
                            profile_image_url: "http://pbs.twimg.com/profile_images/1674996387551801350/x6szh_so_normal.jpg"
                        }
                    },
                    {
                        id: "64a16c56db5d24c84affbe65",
                        created_at: "Sun Jul 02 12:19:33 +0000 2023",
                        text: "RT @y7seo: Is the point of twitter not to tweet… all these dm limits and rate limits and no visibility is so fucking stupid.. can I just us…",
                        user: {
                            name: "Nina🌹maeum",
                            screen_name: "supportrothy",
                            profile_image_url: "http://pbs.twimg.com/profile_images/1674795183081394183/6Oo5M62w_normal.jpg"
                        }
                    },
                    {
                        id: "64a16c56db5d24c84affbe67",
                        created_at: "Sun Jul 02 12:19:24 +0000 2023",
                        text: "@acruxshale yay!!",
                        user: {
                            name: "charlie — @britcedes on hive!!",
                            screen_name: "riorsonsviolets",
                            profile_image_url: "http://pbs.twimg.com/profile_images/1666154792580677643/k2KjlC0Q_normal.jpg"
                        }
                    },
                    {
                        id: "64a16c56db5d24c84affbe69",
                        created_at: "Sun Jul 02 12:19:24 +0000 2023",
                        text: "@undipmenfess yay bgt, aku jg mau ke tembalang krn ga betah di rumah wkwk",
                        user: {
                            name: "🐻🐱🐹🌬",
                            screen_name: "kl_nopqr_",
                            profile_image_url: "http://pbs.twimg.com/profile_images/1618634494730436614/Wz33E8jY_normal.jpg"
                        }
                    },
                    {
                        id: "64a16c56db5d24c84affbe6b",
                        created_at: "Sun Jul 02 12:19:19 +0000 2023",
                        text: "my twitter working yay",
                        user: {
                            name: "ﾒ𝟶 -_-🦇",
                            screen_name: "heisgabe_",
                            profile_image_url: "http://pbs.twimg.com/profile_images/1673747879964319754/Sl2pUYG8_normal.jpg"
                        }
                    },
                    {
                        id: "64a16c56db5d24c84affbe6d",
                        created_at: "Sun Jul 02 12:19:14 +0000 2023",
                        text: "順当に行くと３０周年なんだけど\nそれだとキャストの年齢が偉いことになるからな🥲\nおぼろさんと無限斎さまがかなりご高齢に…(ヽ´ω`)",
                        user: {
                            name: "もりぴよ@夜食",
                            screen_name: "thinsukou_yay",
                            profile_image_url: "http://pbs.twimg.com/profile_images/1616725070268993536/qX61YlAC_normal.jpg"
                        }
                    },
                    {
                        id: "64a16c56db5d24c84affbe6f",
                        created_at: "Sun Jul 02 12:19:10 +0000 2023",
                        text: "Yay looks like twitter is back",
                        user: {
                            name: "💍 Miranda 🤍🕊️",
                            screen_name: "dreamcore_elegy",
                            profile_image_url: "http://pbs.twimg.com/profile_images/1672525932039380993/le6hbfLp_normal.jpg"
                        }
                    },
                    {
                        id: "64a16c56db5d24c84affbe71",
                        created_at: "Sun Jul 02 12:19:10 +0000 2023",
                        text: "RT @Tanisketch: Morning! Finally I can see some new tweets, yay! 😂\n\nHi everyone for a few hours! 🙋🏽\u200d♀️ https://t.co/tynglyTBCh",
                        user: {
                            name: "Andrea Aguado :)(:",
                            screen_name: "AndreaAguado",
                            profile_image_url: "http://pbs.twimg.com/profile_images/2794671426/12d71690fe228da3ca066ba387ddec45_normal.jpeg"
                        }
                    }
                ]
        };
        const savedTweetSearch = await tweetService.saveTweetSearch(tweetSearchToSave);
        expect(savedTweetSearch.tweets.length).toBe(11);
    });
});
