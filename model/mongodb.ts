// import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Bson, MongoClient } from "https://deno.land/x/atlas_sdk@v1.0.3/mod.ts";
import { config } from "https://deno.land/std/dotenv/mod.ts";

const configData = await config();
// const password = configData["ATLAS_PASS"]
// const user = configData["ATLAS_USER"]
// const host = configData["HOST"]
const database = configData["DB"]
const apiKey = configData["API_KEY"]
const endpoint = configData["ENDPOINT"]
const dataSource = configData["DATA_SOURCE"]

// Connecting to a Mongo Atlas Database
// const client = new MongoClient();

// await client.connect({
//     db: database,
//     tls: true,
//     servers: [
//         {
//             host: host,
//             port: 27017,
//         },
//     ],
//     credential: {
//         username: user,
//         password: password,
//         db: database,
//         mechanism: "SCRAM-SHA-1",
//     }
// });

const client = new MongoClient({
    endpoint: endpoint,
    dataSource: dataSource,
    auth: {
        apiKey: apiKey
    }
});

const db = client.database(database);

export default db;