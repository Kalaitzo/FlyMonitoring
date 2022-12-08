// routes/api/devices/smoke.ts

import { Handlers } from "$fresh/server.ts";
import db from "../../../model/mongodb.ts";
import SmokeSensor from "../../../model/SmokeSensor.ts";

export const handler: Handlers = {
    async POST(req: Request){
        const payload = req.body;

        // Check if the payload is sent is null
        if (payload === null) {
            return new Response("Invalid request: Body is null!");
        }

        // Create a decoder to decode the data
        const decoder = new TextDecoder()

        for await (const chunk of payload) {
            // Decode the bytes into a string then parse it as a JSON
            const data: SmokeSensor = JSON.parse(decoder.decode(chunk))

            // Open the collection to store the data that the smoke sensor sent
            const smokeSensor = db.collection<SmokeSensor>("SmokeSensor")

            // Store the data
            const insertId = await smokeSensor.insertOne(data)

            console.log('Inserted data with id: ' + insertId);
        }

        return new Response('Got the data from the smoke sensor!')
    }
};