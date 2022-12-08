// routes/api/devices/tag.ts

import { Handlers } from '$fresh/server.ts';
import db from "../../../model/mongodb.ts";
import TagSensor from "../../../model/schemas/TagSensor.ts";

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
            const data: TagSensor = JSON.parse(decoder.decode(chunk))

            // Open the collection to store the data that the tag sent
            const tagSensor = db.collection<TagSensor>('TagSensor')

            // Store the data
            const insertId = await tagSensor.insertOne(data)

            console.log('Inserted data with id: ' + insertId)
        }

        return new Response('Got the data from the tag!')
    }
}