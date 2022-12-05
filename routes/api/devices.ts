// routes/api/devices.ts

import { Handlers } from "$fresh/server.ts";
import db from '../../model/mongodb.ts'
import TemperatureSensors from "../../model/testDB.ts";

export const handler: Handlers = {
    async POST(req: Request){
        const payload = req.body

        if (payload === null) {
            return new Response("Invalid request: body is null");
        }

        const decoder = new TextDecoder()
        for await (const chunk of payload) {
            // decode the bytes into a string and print it
            const data: TemperatureSensors = JSON.parse(decoder.decode(chunk))

            const temperatureSensors = db.collection<TemperatureSensors>("TemperatureSensors");
            const insertId = await temperatureSensors.insertOne(data);
            console.log('Inserted data with id: ' + insertId)
        }

        return new Response('Got the data from the POST!')
    }
};