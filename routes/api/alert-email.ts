// routes/api/alert-email.ts
import { Handlers } from "$fresh/server.ts";
import Mailgun from "https://deno.land/x/mailgun@v1.1.0/index.ts";
import db from "../../model/mongodb.ts"
import TemperatureSensor from "../../model/schemas/TemperatureSensor.ts";
import FluidLevelSensor from "../../model/schemas/FluidLevelSensor.ts";
import SmokeSensor from "../../model/schemas/SmokeSensor.ts";
// import {config} from "https://deno.land/std@0.167.0/dotenv/mod.ts";

async function getDataFromSensor(collectionName: string): Promise<Array<TemperatureSensor | FluidLevelSensor | SmokeSensor>> {
    // Open the collection that contains te requested data
    const collection = db.collection(collectionName)
    // Get and return the last data from the collection
    return  await collection.aggregate([{$sort: {_id: -1}}, {$limit: 1}])
}

export const handler: Handlers = {
    async GET(){
        const tempHum = await getDataFromSensor('TemperatureSensor')
        const fluid = await getDataFromSensor('FluidLevelSensor')
        const smoke = await getDataFromSensor('SmokeSensor')

        const temperature:number = +tempHum[0].value.split('%')[0].slice(1)
        const waterLevel: number = +fluid[0].value
        const smokeDetection: number = +smoke[0].value

        if (temperature<25 && waterLevel===0 && smokeDetection===0){
            return new Response("There isn't anything to worry about!")
        }

        let text = 'The following alerts have been detected: ';
        let cnt = 0;

        // Add alert about the temperature if needed
        if (temperature>=25){
            text = text + 'high room temperature (' + temperature.toString() + ' C )'
            cnt++;
        }
        // Add alert about the water level if needed
        if (waterLevel===1 && cnt!==0){
            text = text+ ', ' + 'water level detection'
        }
        else if (waterLevel===1 && cnt===0) {
            text = text + 'water level problem'
            cnt++;
        }
        // Add alert about smoke detection if needed
        if (smokeDetection===1 && cnt!==0){
            text = text + ', ' + 'smoke detection'
        }
        else if (smokeDetection===1 && cnt===0){
            text = text + 'smoke detection'
        }

        text = text + '.'

        const apiKey = Deno.env.get("API_KEY_MAILGUN")
        const emailSend = Deno.env.get("EMAIL")
        const emailRecv = Deno.env.get('RECV_EMAIL')
        const domain = Deno.env.get('MAILGUN_DOMAIN')
        // const configData = await config();
        // const apiKey = configData["API_KEY_MAILGUN"]
        // const emailSend = configData["EMAIL"]
        // const emailRecv = configData["RECV_EMAIL"]
        // const domain = configData["MAILGUN_DOMAIN"]

        // Create a instance using your Mailgun API key and domain
        const mailgun = new Mailgun({
            key: apiKey,
            domain: domain,
        });

        // Send your message off to Mailgun!
        await mailgun.send({
            to: emailRecv,
            from: emailSend,
            text: text,
            subject: 'Alert!',
        });

        return new Response('Detected a problem!')
    }
}