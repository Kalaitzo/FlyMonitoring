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

            const sensorPayload = decoder.decode((chunk))
            // Decode the bytes into a string and then parse it as a JSON
            const data: RealSensors = JSON.parse(sensorPayload)
            // Open the collection to store the data that the rack temperature sensor sent
            const realSensors = db.collection<RealSensorsSmart>("RealSensors")
            // Change the data to follow the smart data models structure
            const value = 'T' + data.object.ambient_temperature + '%H' + data.object.ambient_temperature;

            const smartData:RealSensorsSmart = {
                id: data.deviceInfo.tags.deviceId,
                type: "Device",
                deviceCategory: ['sensor'],
                controlledProperty: ['temperature', 'humidity'],
                batteryLevel: data.batteryLevel,
                value: value,
                dateLastValueRecorded: data.time
            };

            // if (data.batteryLevel) {
            //     smartData = {
            //         id: data.deviceInfo.tags.deviceId,
            //         type: "Device",
            //         deviceCategory: ['sensor'],
            //         controlledProperty: ['temperature', 'humidity'],
            //         batteryLevel: data.batteryLevel,
            //         value: value,
            //         dateLastValueRecorded: data.time
            //     };
            // }
            // else {
            //     smartData = {
            //         id: data.deviceInfo.tags.deviceId,
            //         type: "Device",
            //         deviceCategory: ['sensor'],
            //         controlledProperty: ['temperature', 'humidity'],
            //         value: value,
            //         dateLastValueRecorded: data.time
            //     };
            // }
            // Store the data
            const insertId = await realSensors.insertOne(smartData);

            console.log('Smart Data: ' + smartData) // Insert This after we check that it is good
            console.log('Data: ' + data);
        }
        return new Response('I got the post request from the real sensors')
    }
};