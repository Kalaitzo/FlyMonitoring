// routes/devices.tsx
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    async GET(req, ctx){
        const resp = await ctx.render();
        resp.headers.set("X-Custom-Header", "Hello");
        return resp;
    },
    async POST(_req, ctx) {
        return(console.log('A post request was made'))
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