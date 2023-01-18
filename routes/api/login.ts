// routes/api/login.ts

import { Handlers } from "$fresh/server.ts"
import { setCookie } from "std/http/cookie.ts";
// import db from "../../model/mongodb.ts";
// import Users from "../../model/schemas/Users.ts";

const USER = {
    username: 'admin',
    password: 'pass'
}

export const handler: Handlers = {
    async POST(req){
        const url = new URL(req.url);
        const form = await req.formData();
        const username = form.get('username');
        const password = form.get('password');
        // let user;

        // Open the collection to store the data that the door sensor sent
        // const users = db.collection<Users>("users")
        // if(username && password){
        //     user = await users.findOne({
        //         username: username.toString(),
        //         password: password.toString(),
        //     });
        // }
        // console.log(user)

        if(username === USER.username && password === USER.password){
        // if(user){
            const headers = new Headers();
            setCookie(headers, {
                name: "auth",
                value: "bar",
                maxAge: 120,
                sameSite: "Lax",
                domain: url.hostname.toString(),
                path: "/",
                secure: true
            });

            headers.set("location", "/");
            return new Response(null, {
                status: 303,
                headers
            });
        }
        else {
            const headers = new Headers();
            setCookie(headers, {
                name: 'mistake',
                value: 'mistake',
                maxAge: 1,
                sameSite: "Lax",
                domain: url.hostname.toString(),
                path: "/",
                secure: true
            })
            headers.set("location", "/")
            return new Response(null, {
                status: 303,
                headers
            });
        }
    }
};