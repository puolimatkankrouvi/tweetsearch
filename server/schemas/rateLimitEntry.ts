import mongoose from "mongoose";

export const rateLimitEntrySchema = new mongoose.Schema({
    key: { type: String, index: true, unique: true, required: true },

    total_hits: { type: Number, required: true },
    reset_time_utc: { type: Date, required: true },
});
