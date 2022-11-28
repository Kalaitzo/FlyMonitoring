import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";
import TemperatureSensors from "./model/testDB.ts";

import {
    Bson,
    MongoClient,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

const client = new MongoClient();

// Connecting to a Local Database
// await client.connect("mongodb://127.0.0.1:27017");

await start(manifest, { plugins: [twindPlugin(twindConfig)] });

// Connecting to a Mongo Atlas Database
await client.connect({
    db: "myFirstDatabase",
    tls: true,
    servers: [
        {
            host: "ac-ie3oda4-shard-00-01.fawqedw.mongodb.net",
            port: 27017,
        },
    ],
    credential: {
        username: "Kalaitzo",
        password: "basilisg4",
        db: "myFirstDatabase",
        mechanism: "SCRAM-SHA-1",
    },
});

const db = client.database("myFirstDatabase");
const users = db.collection<TemperatureSensors>("users");

const insertId = await users.insertOne({
    username: "user2",
    password: "pass2",
});
