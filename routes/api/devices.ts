// routes/api/de.ts

import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    GET(req){
        const payload = req.body
        return new Response(payload)
    }
};
