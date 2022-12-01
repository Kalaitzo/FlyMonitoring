// routes/api/devices.ts

import { Handlers } from "$fresh/server.ts";
import db from '../../model/mongodb.ts'
import TestInterface from "../../model/testDB.ts";

export const handler: Handlers = {
    async POST(req){
        const payload =await req.body;

        console.log(req)

        // const testSensors = db.collection<TestInterface>('testSensors')

        // const insertId = await testSensors.insertOne(formData);

        return new Response(payload)
    }
};