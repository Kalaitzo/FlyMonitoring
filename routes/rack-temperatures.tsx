// routes/rack-temperatures.tsx
import { Header } from "../components/Header.tsx";
import RackTempPanel from "../components/RackTempPanel.tsx";
import Footer from "../components/Footer.tsx";

import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { asset } from "$fresh/runtime.ts";

interface Data {
    path: string;
    isAllowed: boolean;
    temps:Record<string, number>
}

export const handler: Handlers = {
    GET(req, ctx) {
        const cookies = getCookies(req.headers);
        if (cookies.auth === "bar") {
            const url = new URL(req.url);
            const temps = {
                temp1: 18,
                temp2: 39,
                temp3: 4,
                temp4: 21,
                temp5: 22,
                temp6: 13
            }
            return ctx.render!({path: url.pathname, isAllowed: true, temps: temps});
        } else {
            const url = new URL(req.url);
            url.pathname = "/";
            return Response.redirect(url);
        }
    }
};

export default function RackTemperaturesPage({ data }: PageProps<Data>) {
    const {path, isAllowed, temps} = data;
    return (
        <div className={'flex h-screen flex-col bg-[#5C7EB5]'}>
            <Header active={path} flag={isAllowed}/>
            <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 sm:flex-row justify-around items-center"}>
                <RackTempPanel temp1={temps.temp1}
                               temp2={temps.temp2}
                               temp3={temps.temp3}
                               temp4={temps.temp4}
                               temp5={temps.temp5}
                               temp6={temps.temp6}/>
                <img src={asset('/securityLogo.png')}
                     alt={"Couldn't load image..."}
                     className={"w-1/4"}/>
            </div>
            <Footer/>
        </div>
    );
}