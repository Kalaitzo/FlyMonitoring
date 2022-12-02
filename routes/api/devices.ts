// routes/api/devices.ts

import { Handlers, HandlerContext } from "$fresh/server.ts";
import db from '../../model/mongodb.ts'
import TestInterface from "../../model/testDB.ts";

export const handler: Handlers = {
    async POST(req: Request, ctx: HandlerContext){
        console.log(req)
        console.log(ctx)
        const payload = await req.body;
        const resp = new Response(payload, {headers: { "Content-Type": "application/json" }})
        console.log(resp)

        // const testSensors = db.collection<TestInterface>('testSensors')

        // const insertId = await testSensors.insertOne(formData);

        return resp
    }
};