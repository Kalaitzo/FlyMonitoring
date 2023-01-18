// routes/api/login.ts

import { Handlers } from "$fresh/server.ts"

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

        if(username === USER.username && password === USER.password){
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