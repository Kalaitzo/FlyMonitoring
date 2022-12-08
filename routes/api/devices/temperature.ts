// routes/api/devices/temperature.ts

import { Handlers } from "$fresh/server.ts";
import db from '../../../model/mongodb.ts'
import TemperatureSensor from "../../../model/TemperatureSensor.ts";

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
            // Decode the bytes into a string and then parse it as a JSON
            const data: TemperatureSensor = JSON.parse(decoder.decode(chunk))

            // Open the collection to store the data that the temperature sensor sent
            const temperatureSensors = db.collection<TemperatureSensor>("TemperatureSensor");

            // Store the data
            const insertId = await temperatureSensors.insertOne(data);

            console.log('Inserted data with id: ' + insertId)
        }

        return new Response('Got the data from the temperature-humidity sensor!')
    }
};