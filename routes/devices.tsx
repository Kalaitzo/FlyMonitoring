// routes/devices.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import { config } from "https://deno.land/std/dotenv/mod.ts";
import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import TemperatureSensors from "../model/testDB.ts";

export const handler: Handlers = {
    async GET(req, ctx){
        const resp = await ctx.render();
        resp.headers.set("X-Custom-Header", "Created from get!");
        return resp;
    },
    async POST(req, ctx) {
        const client = new MongoClient();

        const configData = await config();
        const password = configData["ATLAS_PASS"]
        const user = configData["ATLAS_USER"]
        const database = configData["DB"]
        const host = configData["HOST"]

        // // Connecting to a Mongo Atlas Database
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
        const users = db.collection<TemperatureSensors>("users");

        const all_users = await users.find({ username: { $ne: 'null' } }).toArray();
        return ctx.render(all_users);
      }
};

export default function DevicesPage({ data }: PageProps<TemperatureSensors[] | null>){
    return(
        <main>
            <h1>Devices</h1>
            {/*{data? <p>{data.username} was found in the database</p> : <p>Didn't search for user one because the GET handler was used</p>}*/}
            <ul>
                {data? (data.map((d) => <li>Username: {d.username} and Password: {d.password}</li>)): ('No users')}
            </ul>
            <form method={'post'}>
                <div>
                    <button type={'submit'} className={"bg-blue-600 text-white rounded px-6 py-2.5"}>Search with POST</button>
                </div>
            </form>
        </main>
    );
}