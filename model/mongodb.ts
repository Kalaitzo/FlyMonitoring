import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { config } from "https://deno.land/std/dotenv/mod.ts";

const client = new MongoClient();

const configData = await config();
const password = configData["ATLAS_PASS"]
const user = configData["ATLAS_USER"]
const database = configData["DB"]
const host = configData["HOST"]

// Connecting to a Mongo Atlas Database
await client.connect({
    db: database,
    tls: true,
    servers: [
        {
            host: host,
            port: 27017,
        },
    ],
    credential: {
        username: user,
        password: password,
        db: database,
        mechanism: "SCRAM-SHA-1",
    }
});

const db = client.database(database);

export default db;