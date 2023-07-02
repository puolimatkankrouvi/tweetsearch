import * as tweetService from "../tweetService";
import db from "../db";

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clearInMemoryDatabase());
afterAll(async () => await db.closeInMemoryDatabase());

describe("getTweetSearches", () => {
    test("Return first page of tweet searches newest date first", async () => {
        const tweetSearches = await tweetService.getTweetSearches(0);
        expect(tweetSearches.length).toBe(2);

        const firstTweetSearch = tweetSearches.at(0);
        expect(firstTweetSearch?.name).toBe("Cats");
    });
});

describe("getTweetSearchWithTweets", () => {
    test("Returns null with non existing id", async () => {
        const nonExistingId = "63c26ba06d81678661725eb4";
        const tweetSearch = await tweetService.getTweetSearchWithTweets(nonExistingId);
        expect(tweetSearch).toBe(null);
    });
});
