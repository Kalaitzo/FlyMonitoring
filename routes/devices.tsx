// routes/devices.tsx
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    async GET(req, ctx){
        const resp = await ctx.render();
        resp.headers.set("X-Custom-Header", "Hello");
        return resp;
    },
    async POST(req, ctx){
        const resp = await ctx.render();
        resp.headers.set('My-Custom-Header',"It added this.")
        return resp;
    }
};

export default function AboutPage(){
    return(
        <main>
            <h1>Devices</h1>
            <p>This is the devices page.</p>
        </main>
    );
}