// routes/api/temperature-actuator.ts
import { Handlers } from "$fresh/server.ts"
import { setCookie } from "std/http/cookie.ts";
import { Client } from 'https://deno.land/x/mqtt/deno/mod.ts'; // Deno (ESM)


export const handler: Handlers = {
    async POST(req){
        const url = new URL(req.url);
        const headers = new Headers();

        setCookie(headers, {
            name: "tempActuator",
            value: "true",
            maxAge: 130,
            sameSite: "Lax",
            domain: url.hostname.toString(),
            path: "/",
            secure: true
        })

        const client = new Client({ url: 'mqtt://test.mosquitto.org' }); // Deno and Node.js

        await client.connect();

        client.on('message', (topic: string, payload: string) => {
            console.log(topic, payload);
        });

        await client.publish('temperature/actuator', 'true');

        await client.disconnect();

        headers.set("location","/temperature-humidity")
        return new Response(null, {
            status: 303,
            headers
        })
    }
}