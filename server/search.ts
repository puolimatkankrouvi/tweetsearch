import axios from "axios";
import oauth from "oauth";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

interface IMessage {
    message: string,
}

const twitterSearchUrl = "https://api.twitter.com/1.1/search/tweets.json";

export function search(_req: Request, _res: Response, query: string, next: (result: IMessage) => void) {
    const oauth2 = new oauth.OAuth2(
        process.env.CONSUMER_KEY || "",
        process.env.CONSUMER_SECRET || "",
        "https://api.twitter.com/",
        undefined,
        "oauth2/token",
        undefined
    );

    oauth2.getOAuthAccessToken("", { grant_type: "client_credentials" }, (authError, accessToken) => {
        if (authError) {
            next({message: "Access token error"});
        }

        const headers = {Authorization: `Bearer ${accessToken}` };

        const encodedQuery = encodeURIComponent(query);
        const url = `${twitterSearchUrl}?q=${encodedQuery}&count=100`;
        axios.get(url, { headers })
            .then((response) => {
                if (response.status === 200) {
                    next(response.data);
                } else {
                    next({message: "Error in search"});
                }
            })
            .catch(() => {
                next({message: "Error in search"});
            });
        }
    );
}