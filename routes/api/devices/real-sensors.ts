// routes/api/devices/real-sensors.ts

import { Handlers } from "$fresh/server.ts";
import db from '../../../model/mongodb.ts'
import RealSensors from "../../../model/schemas/RealSensors.ts";
import RealSensorsSmart from "../../../model/schemas/RealSensorsSmart.ts";

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
            // Decode the bytes
            const sensorPayload = decoder.decode((chunk))
            // Parse it as a JSON
            const data: RealSensors = JSON.parse(sensorPayload)
            // Open the collection to store the data that the rack temperature sensor sent
            const realSensors = db.collection<RealSensorsSmart>("RealSensors")
            // Change the data to follow the smart data models structure
            const value = 'T' + data.object.ambient_temperature + '%H' + data.object.relative_humidity;

            if (data.object){
                const smartData:RealSensorsSmart = {
                    id: data.deviceInfo.tags.deviceId,
                    type: "Device",
                    deviceCategory: ['sensor'],
                    controlledProperty: ['temperature', 'humidity'],
                    batteryLevel: data.batteryLevel,
                    value: value,
                    dateLastValueReported: data.time.toString()
                };

                const insertId = await realSensors.insertOne(smartData);
                console.log('Insert Id:' + insertId)
            }

            console.log('Sensor Payload: ' + sensorPayload)
        }
        return new Response('I got the post request from the real sensors')
    }
};