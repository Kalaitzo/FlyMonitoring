// routes/api/devices/real-sensors.ts

import { Handlers } from "$fresh/server.ts";
// import db from '../../../model/mongodb.ts'
// import RackTemperatureSensors from "../../../model/schemas/RackTemperatureSensors.ts";

export const handler: Handlers = {
     async POST(req: Request){
        const payload = req.body;

        // Check if the payload sent is null
        if (payload === null) {
            return new Response("Invalid request: Body is null!")
        }

        // Create a decoder to decode the data
        const decoder =  new TextDecoder()

        for await (const chunk of payload) {

            const sensorPayload = decoder.decode((chunk))
            // // Decode the bytes into a string and then parse it as a JSON
            // const data: RackTemperatureSensors = JSON.parse(decoder.decode(chunk))
            //
            // // Open the collection to store the data that the rack temperature sensor sent
            // const rackTemperaturesSensors = db.collection<RackTemperatureSensors>("RackTemperatureSensors")
            //
            // // Store the data
            // const insertId = await rackTemperaturesSensors.insertOne(data);

            console.log('Data' + sensorPayload);
        }
        return new Response('I got the post request from the real sensors')
    }
};