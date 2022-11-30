// routes/devices.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import TemperatureSensors from "../model/testDB.ts";
import db from "../model/mongodb.ts";

export const handler: Handlers = {
    async GET(req, ctx){
        const resp = await ctx.render();
        resp.headers.set("X-Custom-Header", "Created from get!");
        return resp;
    },
    async POST(req, ctx) {
        const users = db.collection<TemperatureSensors>("users");

        const all_users = await users.find({ username: { $ne: 'null' } });
        return ctx.render(all_users);
      }
};

export default function DevicesPage({ data }: PageProps<TemperatureSensors[] | null>){
    return(
        <main>
            <h1>Devices</h1>
            <ul>
                {data? (data.map((d) => <li>Username: {d.username} and Password: {d.password}</li>)): (<div>'No users'</div>)}
            </ul>
            <form method={'post'}>
                <div>
                    <button type={'submit'} className={"bg-blue-600 text-white rounded px-6 py-2.5"}>Search with POST</button>
                </div>
            </form>
        </main>
    );
}