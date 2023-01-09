import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import {Header} from "../components/Header.tsx";

interface Data {
    isAllowed: boolean;
}

export const handler: Handlers = {
    GET(req, ctx) {
        const cookies = getCookies(req.headers);
        if (cookies.auth === "bar") {
            return ctx.render!({isAllowed: true});
        } else {
            const url = new URL(req.url);
            url.pathname = "/";
            return Response.redirect(url);
        }
    },
};

export default function RackTemperaturesPage({ data }: PageProps<Data>) {
    return (
        <div>
            <Header active={'/rack-temperatures'} flag={data.isAllowed}/>
        </div>
    );
}