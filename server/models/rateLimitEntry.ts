import mongoose from "mongoose";
import { rateLimitEntrySchema } from "../schemas/rateLimitEntry";

export interface IRateLimitEntry extends mongoose.Document {
    key: string,

    total_hits: number,
    reset_time: Date,
}

export const RateLimitEntryModel = mongoose.model<IRateLimitEntry>("RateLimitEntryModel", rateLimitEntrySchema);