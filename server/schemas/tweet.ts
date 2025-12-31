import mongoose from "mongoose";

export const tweetSchema = new mongoose.Schema({
    text: String,
    created_at: String,

    username: String,
    screen_name: String,
    profile_image_url: String,
});
