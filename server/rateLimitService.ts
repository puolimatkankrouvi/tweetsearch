import type {
    Store,
    IncrementResponse
} from "express-rate-limit"

import db from "./db";
import { RateLimitEntryModel } from "./models/rateLimitEntry";

class RateLimitService implements Store {
    async increment(key: string): Promise<IncrementResponse> {
        try {
            await db.connect();

            const existingRateLimitEntry = await RateLimitEntryModel.findOne({ key: key }).exec();

            if (!existingRateLimitEntry) {
                const newRateLimitEntry = new RateLimitEntryModel({
                    key: key,
                    total_hits: 1,
                    reset_time_utc: this.getResetTime(),
                });
                
                const rateLimitEntry = await newRateLimitEntry.save();

                return {
                    totalHits: rateLimitEntry.total_hits,
                    resetTime: rateLimitEntry.reset_time_utc,
                }
            }

            const newTotalHits = existingRateLimitEntry.total_hits + 1;
            await existingRateLimitEntry.updateOne({
                total_hits: newTotalHits,
            });

            return {
                totalHits: newTotalHits,
                resetTime: existingRateLimitEntry.reset_time_utc,
            }
        } catch {
            return this.getDefaultIncrementResponse();
        }
    }

    async decrement(key: string): Promise<void> {
        try {
            await db.connect();

            const existingRateLimitEntry = await RateLimitEntryModel.findOne({ key: key }).exec();
            if (!existingRateLimitEntry) {
                return;
            }

            const newTotalHits = existingRateLimitEntry.total_hits - 1;
            await existingRateLimitEntry.updateOne({
                total_hits: newTotalHits,
            });
        } catch {
            return;
        }
    }

    async resetKey(key: string): Promise<void> {
        try {
            await db.connect();

            await RateLimitEntryModel.deleteOne({ key: key }).exec();
        } catch {
            return;
        }
    }
   
    private getDefaultIncrementResponse(): IncrementResponse {
        return {
            totalHits: 1,
            resetTime: this.getResetTime(),
        };
    }

    private getResetTime(): Date {
        // 60 minutes from now.
        return new Date(Date.now() + 60 * 60 * 1000);
    }
}

export default RateLimitService;