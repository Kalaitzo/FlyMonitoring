// routes/api/alert-email.ts
import { Handlers } from "$fresh/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
// import { config } from "https://deno.land/std@0.167.0/dotenv/mod.ts";
import db from "../../model/mongodb.ts"

async function getDataFromSensor(collectionName: string) {
    // Open the collection that contains te requested data
    const collection = db.collection(collectionName)
    // Get and return the last data from the collection
    return  await collection.aggregate([{$sort: {_id: -1}}, {$limit: 1}])
}

export const handler: Handlers = {
    async GET(){
        // const tempHum = getDataFromSensor('TemperatureSensor')
        // const fluid = getDataFromSensor('FluidLevelSensor')
        // const smoke = getDataFromSensor('SmokeSensor')
        // const configData = await config()

        // const email = configData['EMAIL']
        // const password = configData['PWD']

        const password = Deno.env.get("PWD")
        const email = Deno.env.get("EMAIL")

        const client = new SmtpClient();

        await client.connectTLS({
            hostname: "smtp.gmail.com",
            port: 465,
            username: email,
            password: password,
        });

        await client.send({
            from: email, // Your Email address
            to: "monitoringfly@gmail.com", // Email address of the destination
            subject: "Mail Title",
            content: "Mail Content ",
        });

        await client.close();

        return new Response('Ta kataferame!')
    }
}