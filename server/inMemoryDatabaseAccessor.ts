
import { MongoMemoryServer } from "mongodb-memory-server";

export default class InMemoryDatabaseAccessor {
    private inMemoryDatabase: MongoMemoryServer | null = null;

    public async getOrCreateInMemoryDatabase(): Promise<MongoMemoryServer> {
        if (this.inMemoryDatabase) {
            return Promise.resolve(this.inMemoryDatabase);
        }

        this.inMemoryDatabase = await MongoMemoryServer.create();
        return this.inMemoryDatabase;
    }
}
