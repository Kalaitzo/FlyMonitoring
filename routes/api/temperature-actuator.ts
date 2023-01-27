// routes/api/temperature-actuator.ts
import { Handlers } from "$fresh/server.ts"
import { setCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
    POST(req){
        const url = new URL(req.url);
        const headers = new Headers();

        setCookie(headers, {
            name: "tempActuator",
            value: "true",
            maxAge: 130,
            sameSite: "Lax",
            domain: url.hostname.toString(),
            path: "/",
            secure: true
        })

        headers.set("location","/temperature-humidity")
        return new Response(null, {
            status: 303,
            headers
        })
    }
}