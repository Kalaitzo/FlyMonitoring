/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

const APP_ID='data-kettk';

const BASE_URI = `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/`;

import {
    Bson,
    MongoClient,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

const client = new MongoClient();

// Connecting to a Local Database
await client.connect("mongodb://127.0.0.1:27017");

// Defining schema interface
interface TemperatureSensors{
    _id: ObjectId;
    username: string;
    password: string;
}

const db = client.database("newUsers");
const users = db.collection<TemperatureSensors>("users");


await start(manifest, { plugins: [twindPlugin(twindConfig)] });