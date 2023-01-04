import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.CONNECTION_STRING || "";
const connect = async () => {
    // TODO: Different connect for unit tests.
    await mongoose.connect(connectionString);
};

export default {
    connect,
}
