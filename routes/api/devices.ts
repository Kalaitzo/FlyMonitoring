// routes/api/de.ts

import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    POST(req){
        const payload = req.body
        console.log(payload)
        return new Response('New response')
    }
};
