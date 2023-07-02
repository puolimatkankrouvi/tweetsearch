import mongoose from "mongoose";
import dotenv from "dotenv";
import InMemoryDatabaseAccessor from "./inMemoryDatabaseAccessor";
import { TweetSearch } from "./tweetService";

dotenv.config();
const inMemoryDatabaseAccessor = new InMemoryDatabaseAccessor();

const connect = async () => {
    mongoose.set("strictQuery", true);

    if (inTestEnvironment()) {
        const inMemoryDatabase = await inMemoryDatabaseAccessor.getOrCreateInMemoryDatabase();
        const inMemoryDatabaseConnectionString = inMemoryDatabase.getUri();
        await mongoose.connect(inMemoryDatabaseConnectionString);
        
        return;
    }
    
    const connectionString = process.env.CONNECTION_STRING || "";
    await mongoose.connect(connectionString);
};

const closeInMemoryDatabase = async () => {
    await mongoose.disconnect();

    const inMemoryDatabase = await inMemoryDatabaseAccessor.getOrCreateInMemoryDatabase();
    await inMemoryDatabase.stop();
};

const addTestDataToInMemoryDatabase = async () => {
    await addTestData();
};

function inTestEnvironment() {
    return process.env.NODE_ENV === "test";
}

const addTestData = async () => {
    await TweetSearch.create({ date:"2022-12-12T08:05:38.948Z", name:"Test"});
    await TweetSearch.create({ date:"2022-12-18T07:27:40.920Z", name:"Cats"});
};

export default {
    connect,
    closeInMemoryDatabase,
    clearInMemoryDatabase: addTestDataToInMemoryDatabase,
}
