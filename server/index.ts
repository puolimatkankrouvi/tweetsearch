import dotenv from "dotenv";
dotenv.config();
if (process.env.NODE_ENV === "production")
{
    /* eslint-disable @typescript-eslint/no-require-imports */
    const applicationInsights = require("applicationinsights");
    applicationInsights.setup().start();
}

import express, { Request } from "express";
import * as tweetService from "./tweetService";
import path from 'path';
import helmet from "helmet";
import { search } from "./search";

const app = express();

const allowedTwitterImageUrls: ReadonlyArray<string> = ["twimg.com", "*.twimg.com"];
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "img-src": allowedTwitterImageUrls,
            "upgradeInsecureRequests": [],
        },
    },
    crossOriginResourcePolicy: {
        policy: "cross-origin"
    }
}));

// Priority to serve any static files
app.use(express.static(path.resolve(__dirname, "../../react-ui/build")));

// Body parser
app.use(express.urlencoded({extended: false, limit: "1000mb"}));
app.use(express.json({limit: "1000mb"}));

app.get("/api/search", async (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        res.statusCode = 403;
        res.send("Forbidden");
        return;
    }

    // url: /search?q=&23query
    const query = req.query.q as string;

    if (!query) {
        res.statusCode = 400;
        res.send("Missing query parameter ?q=example");
        return;
    }

    await search(res, query, next);
});

app.post("/api/search", async (req, res, next) => {
    const query = req.body.searchText;

    if (!query) {
        res.statusCode = 400;
        res.send("Missing query body { searchText: \"example\"");
        return;
    }
    
    await search(res, query, next);
});

type OldSearchesRequest = Request<Record<string, never>, ReadonlyArray<TweetSearch.Server.OldSearchWithoutTweets>, Record<string, never>, {page?: number}>;
app.get("/api/oldsearches", async (req: OldSearchesRequest, res, next) => {
    try {     
        let page = 0;
        if (req.query.page) {
            page = req.query.page;
        }

        const tweetSearches = await tweetService.getTweetSearches(page);
        res.statusCode = 200;
        res.send(tweetSearches);
    }
    catch {
        next("Getting old searches failed");
    }
});

type SingleOldSearchRequest = Request<{searchId: string}, TweetSearch.Server.TweetSearch>;
app.get("/api/oldsearches/:searchId/", async (req: SingleOldSearchRequest, res, next) => {
    try {
        const tweetSearch = await tweetService.getTweetSearchWithTweets(req.params.searchId);

        res.set("Content-Type", "application/json");
        if (tweetSearch)
        {
            res.send(tweetSearch);
        }
        else {
            res.statusCode = 404;
            res.send();
        }
    }
    catch {
        next("Getting old search failed");
    }
});

type SaveSearchRequest = Request<Record<string, never>, TweetSearch.Server.TweetSearch, TweetSearch.Server.TweetSearch, Record<string, never>>;
app.post("/api/oldsearches", async (req: SaveSearchRequest, res, next) => {
    const tweetSearch = req.body;
    try {
        const result: TweetSearch.Server.TweetSearch = await tweetService.saveTweetSearch(tweetSearch);
        res.statusCode = 200;
        res.set("Content-Type", "application/json");
        res.send(result);
    }
    catch {       
        next("Saving search failed");
    }
});

const PORT = process.env.PORT || 80;
app.listen(PORT);

export default app;
