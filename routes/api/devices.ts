// routes/api/devices.ts

import { Handlers, HandlerContext } from "$fresh/server.ts";
import db from '../../model/mongodb.ts'
import TestInterface from "../../model/testDB.ts";

export const handler: Handlers = {
    async POST(req: Request, ctx: HandlerContext){
        const payload = await req.body
        console.log(payload)
        return new Response(payload)
    }
};