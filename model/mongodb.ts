import { MongoClient } from "https://deno.land/x/atlas_sdk@v1.0.3/mod.ts";
// import { config } from "https://deno.land/std@0.167.0/dotenv/mod.ts";
//
// const configData = await config();
// const database = configData["DB"]
// const apiKey = configData["API_KEY"]
// const endpoint = configData["ENDPOINT"]
// const dataSource = configData["DATA_SOURCE"]
const database = Deno.env.get("DB")
const apiKey = Deno.env.get("API_KEY")
const endpoint = Deno.env.get("ENDPOINT")
const dataSource = Deno.env.get("DATA_SOURCE")



const client = new MongoClient({
    endpoint: endpoint,
    dataSource: dataSource,
    auth: {
        apiKey: apiKey
    }
});

const db = client.database(database);

export default db;