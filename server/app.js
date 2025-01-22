const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";

const dbName = "myDatabase";

async function connectToMongoDB() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Success connect MongoDB!");

        const db = client.db(dbName);

        const collections = await db.listCollections().toArray();
        console.log("collection:", collections);
    } catch (error) {
        console.error("Connection Error MongoDB:", error);
    } finally {
        await client.close();
    }
}

connectToMongoDB();
