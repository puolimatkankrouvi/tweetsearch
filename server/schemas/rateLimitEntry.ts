import mongoose, { Schema } from "mongoose";

export const rateLimitEntrySchema = new mongoose.Schema({
    key: String,

    total_hits: Schema.Types.Int32,
    reset_time: Date,
});
