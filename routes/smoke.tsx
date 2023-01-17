// routes/rack-temperatures.tsx
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { Header } from "../components/Header.tsx";

interface Data {
    path: string;
    isAllowed: boolean;
}

export const handler: Handlers = {
    GET(req, ctx) {
        const cookies = getCookies(req.headers);
        if (cookies.auth === "bar") {
            const url = new URL(req.url);
            return ctx.render!({path: url.pathname, isAllowed: true});
        } else {
            const url = new URL(req.url);
            url.pathname = "/";
            return Response.redirect(url);
        }
    }
};

export default function SmokePage({ data }: PageProps<Data>) {
    const {path, isAllowed} = data;
    return (
        <div>
            <Header active={path} flag={isAllowed}/>
        </div>
    );
}