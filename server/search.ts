import axios from "axios";
import { AccessToken, ClientCredentials, ModuleOptions, WreckHttpOptions } from "simple-oauth2";
import { NextFunction, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const twitterSearchUrl = "https://api.twitter.com/1.1/search/tweets.json";

export const search = async (res: Response, query: string, next: NextFunction) => {
    try {
        const accessToken = await getAccessToken();
        const tweets: ReadonlyArray<TweetSearch.Server.TweetSearch> = await searchTweets(query, accessToken);
        res.statusCode = 200;
        res.send(tweets);
    }
    catch (err) {
        next("Error in search");
    }
}

const getAccessToken = async (): Promise<AccessToken> => {
    const config: ModuleOptions<"client-id"> = {
        client: {
            id: process.env.CONSUMER_KEY || "",
            secret: process.env.CONSUMER_SECRET || "",
        },
        auth: {
            tokenHost: "https://api.twitter.com",
            tokenPath: "oauth2/token"
        }
    }

    const client = new ClientCredentials(config);

    const httpOptions: WreckHttpOptions = {
        json: true
    };

    const accessToken = await client.getToken({}, httpOptions);

    return accessToken;
};

const searchTweets = async (query: string, accessToken: AccessToken) => {
    const headers = {Authorization: `Bearer ${accessToken.token}` };

    const encodedQuery = encodeURIComponent(query);
    const url = `${twitterSearchUrl}?q=${encodedQuery}&count=100`;

    const response = await axios.get<Array<TweetSearch.Server.TweetSearch>>(url, { headers });

    return response.data;
};
