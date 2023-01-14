import mongoose from "mongoose";
import dotenv from "dotenv";
import InMemoryDatabaseAccessor from "./inMemoryDatabaseAccessor";

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

const clearInMemoryDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const collectionKey in collections) {
        await collections[collectionKey].drop();
    }
};

function inTestEnvironment() {
    return process.env.NODE_ENV === "test";
}

export default {
    connect,
    closeInMemoryDatabase,
    clearInMemoryDatabase,
}
