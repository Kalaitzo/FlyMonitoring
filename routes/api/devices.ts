// routes/api/devices.ts

import { Handlers, HandlerContext, PageProps } from "$fresh/server.ts";
import db from '../../model/mongodb.ts'
import TestInterface from "../../model/testDB.ts";

export const handler: Handlers = {
    async GET(req: Request, ctx: HandlerContext){
        console.log(ctx)

        // const testSensors = db.collection<TestInterface>('testSensors')

        // const insertId = await testSensors.insertOne(formData);

        return new Response(payload)
    }
};