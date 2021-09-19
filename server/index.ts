import dotenv from "dotenv";
import express, { Request, text } from "express";
import * as db from "./db";
import path from 'path';
import { IOldSearchWithoutTweets, ITweetSearch } from "./interfaces";
import { search } from "./search";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 80;

// Priority to serve any static files
app.use(express.static(path.resolve(__dirname, "../../react-ui/build")));

// Body parser
app.use(express.urlencoded({extended: false, limit: "1000mb"}));
app.use(express.json({limit: "1000mb"}));

app.get("/api/search", (req, res) => {
  // url: /search?q=&23query
    const query = req.query.q as string;
    search(req, res, query,
        (result) => {
            res.statusCode = 200;
            res.set("Content-Type", "application/json");
            res.send(result);
        }
    );
});

app.post("/api/search", (req, res) => {
    const query = req.body.searchText;
    if (query && query.length > 0) {
        search(req, res, query,
            (result) => {
                res.statusCode = 200;
                res.set("Content-Type", "application/json");
                res.send(result);
            }
        );
    }
});

type OldSearchesRequest = Request<Record<string, never>, ReadonlyArray<IOldSearchWithoutTweets>, Record<string, never>, {page?: number}>;
app.get("/api/oldsearches", async (req: OldSearchesRequest, res, next) => {
    try {     
        let page = 0;
        if (req.query.page) {
            page = req.query.page;
        }

        const tweetSearches = await db.getTweetSearches(page);
        res.statusCode = 200;
        res.send(tweetSearches);
    }
    catch (err) {
        next("Getting old searches failed");
    }
});

type SingleOldSearchRequest = Request<{searchId: string}, ITweetSearch>;
app.get("/api/oldsearches/:searchId/", async (req: SingleOldSearchRequest, res, next) => {
    try {
        const tweetSearch = await db.getTweetSearchWithTweets(req.params.searchId);

        res.statusCode = tweetSearch ? 200 : 400;
        res.set("Content-Type", "application/json");
        res.send(tweetSearch ?? undefined);
    }
    catch (err) {
        next("Getting old search failed");
    }
});

type SaveSearchRequest = Request<Record<string, never>, ITweetSearch, ITweetSearch, Record<string, never>>;
app.post("/api/oldsearches", async (req: SaveSearchRequest, res, next) => {
    const tweetSearch = req.body;
    try {
        const result: ITweetSearch = await db.saveTweetSearch(tweetSearch);
        res.statusCode = 200;
        res.set("Content-Type", "application/json");
        res.send(result);
    }
    catch(error) {       
        next("Saving search failed");
    }
});

app.listen(PORT);
