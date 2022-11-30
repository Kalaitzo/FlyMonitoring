// routes/api/de.ts

import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    POST(req){
        console.log(req.body)
        const uuid = crypto.randomUUID();
        return new Response(JSON.stringify(uuid), {
            headers: { "Content-Type": "application/json" }
        });
    }
};
