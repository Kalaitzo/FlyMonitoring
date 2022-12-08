// routes/api/devices/door.ts

import { Handlers } from '$fresh/server.ts'
import db from "../../../model/mongodb.ts";
import DoorSensor from "../../../model/schemas/DoorSensor.ts";

export const handler: Handlers = {
    async POST(req: Request){
        const payload = req.body;

        // Check if the payload is sent is null
        if (payload === null) {
            return new Response("Invalid request: Body is null!");
        }

        // Create a decoder to decode the data
        const decoder =  new TextDecoder()

        for await (const chunk of payload){
            // Decode the bytes into a string then parse it as a JSON
            const data: DoorSensor = JSON.parse(decoder.decode(chunk))

            // Open the collection to store the data that the door sensor sent
            const doorSensor = db.collection<DoorSensor>('DoorSensor')

            // Store the data
            const insertId = await doorSensor.insertOne(data)

            console.log('Inserted data with id: ' + insertId)
        }

        return new Response('Got the data from the door sensor!')
    }
};