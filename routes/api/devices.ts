// routes/api/de.ts
import { Handlers } from "$fresh/server.ts";
import db from '../../model/mongodb.ts'
import TestInterface from "../../model/testDB.ts";

export const handler: Handlers = {
    async POST(req){
        // const payload = req.body
        const payload =  {
            id: "device-9845A",
            type: "Device",
            controlledProperty: [
                "fillingLevel",
                "temperature"
            ]
        }

        const testSensors = db.collection<TestInterface>('testSensors')

        const insertId = await testSensors.insertOne(payload);

        return new Response(payload)
    }
};
