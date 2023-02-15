// routes/api/temperature-actuator.ts
import { Handlers } from "$fresh/server.ts"
import { Client } from 'https://deno.land/x/mqtt/deno/mod.ts'; // Deno (ESM)


export const handler: Handlers = {
    async POST(){
        const headers = new Headers();

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