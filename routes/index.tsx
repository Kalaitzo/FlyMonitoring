import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";

import TemperatureSensors from "../model/testDB.ts";

import {
    Bson,
    MongoClient,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

const client = new MongoClient();

// Connecting to a Local Database
// await client.connect("mongodb://127.0.0.1:27017");

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
    username: "user3",
    password: "pass3",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh Changed App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
          file, and refresh.
        </p>
        <Counter start={3} />
      </div>
    </>
  );
}
