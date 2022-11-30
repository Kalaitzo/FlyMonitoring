// routes/api/de.ts

import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    GET(req){
        console.log(req.headers.get('cache-control'))
        const uuid = crypto.randomUUID();
        return new Response(JSON.stringify(uuid), {
            headers: { "Content-Type": "application/json" }
        });
    }
};
