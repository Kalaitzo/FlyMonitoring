// routes/api/alert-email.ts
import { Handlers } from "$fresh/server.ts";
// import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
// import { config } from "https://deno.land/std@0.167.0/dotenv/mod.ts";
import Mailgun from "https://deno.land/x/mailgun@v1.1.0/index.ts";
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

        const apiKey = Deno.env.get("API_KEY_MAILGUN")
        const emailSend = Deno.env.get("EMAIL")
        const emailRecv = Deno.env.get('RECV_EMAIL')
        const domain = Deno.env.get('DOMAIN_MAILGUN')

        //
        // const client = new SmtpClient();
        //
        // await client.connectTLS({
        //     hostname: "smtp.gmail.com",
        //     port: 465,
        //     username: email,
        //     password: password,
        // });
        //
        // await client.send({
        //     from: email, // Your Email address
        //     to: "monitoringfly@gmail.com", // Email address of the destination
        //     subject: "Mail Title",
        //     content: "Mail Content ",
        // });
        //
        // await client.close();

        // Create a instance using your Mailgun API key and domain
        const mailgun = new Mailgun({
            key: apiKey,
            domain: domain,
        });

        // Send your message off to Mailgun!
        await mailgun.send({
            to: emailRecv,
            from: emailSend,
            text: "How are you doing my friend?",
            subject: "Just checking up for the second time today!",
        });

        return new Response('Ta kataferame!')
    }
}