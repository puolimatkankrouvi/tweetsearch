import * as tweetService from "../tweetService";
import db from "../db";

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clearInMemoryDatabase());
afterEach(async () => await db.closeInMemoryDatabase());


describe("getTweetSearchWithTweets", () => {
    test("Returns null with non existing id", async () => {
        const nonExistingId = "63c26ba06d81678661725eb4";
        const tweetSearch = await tweetService.getTweetSearchWithTweets(nonExistingId);
        expect(tweetSearch).toBe(null);
    });
});
