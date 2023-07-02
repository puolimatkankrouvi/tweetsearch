import * as tweetService from "../tweetService";
import db from "../db";

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clearInMemoryDatabase());
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
        const page = 0;
        const existingTweetSearch = (await tweetService.getTweetSearches(page)).at(0);
        expect(existingTweetSearch?.id).toBeDefined();

        const tweetSearch = await tweetService.getTweetSearchWithTweets(existingTweetSearch!.id!);
        expect(tweetSearch).not.toBeNull();
    });
    test("Returns null with non existing id", async () => {
        const nonExistingId = "63c26ba06d81678661725eb4";
        const tweetSearch = await tweetService.getTweetSearchWithTweets(nonExistingId);
        expect(tweetSearch).toBe(null);
    });
});
