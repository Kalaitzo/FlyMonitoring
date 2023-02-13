// routes/api/alert-email.ts
import { Handlers } from "$fresh/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
// import { config } from "https://deno.land/std@0.167.0/dotenv/mod.ts";
import db from "../../model/mongodb.ts"

async function getDataFromSensor(collectionName: string) {
    // Open the collection that contains te requested data
    const collection = db.collection(collectionName)
    // Get and return the last data from the collection
    return  await collection.aggregate([{$sort: {_id: -1}}, {$limit: 1}])
}

export const handler: Handlers = {
    async POST(){
        // const tempHum = getDataFromSensor('TemperatureSensor')
        // const fluid = getDataFromSensor('FluidLevelSensor')
        // const smoke = getDataFromSensor('SmokeSensor')
        // const configData = await config();
        // const sendingEmail = configData["EMAIL"]
        // const recvEmail = configData["RECV_EMAIL"]
        // const password = configData['PASS']

        const sendingEmail = Deno.env.get("EMAIL")
        const recvEmail = Deno.env.get("RECV_EMAIL")
        const password = Deno.env.get('PASS')

        const client = new SMTPClient({
            connection: {
                hostname: "smtp.gmail.com",
                port: 465,
                auth:{
                    username: sendingEmail,
                    password: password
                }
            }
        });

        await client.send({
            from: sendingEmail,
            to: recvEmail,
            subject: "TestMail",
            content: "This is the content",
        })

        await client.close()

        return new Response('Ta kataferame!')
    }
}