// routes/dust.tsx
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { Header } from "../components/Header.tsx";
import db from "../model/mongodb.ts";
import DustSensor from "../model/schemas/DustSensor.ts";
import DustPanel from "../components/DustPanel.tsx";
import {asset} from "$fresh/src/runtime/utils.ts";
import Footer from "../components/Footer.tsx";

interface Data {
    path: string;
    isAllowed: boolean;
    dust: Array<Record<any, any>>;
}

export const handler: Handlers = {
    async GET(req, ctx) {
        const cookies = getCookies(req.headers);
        if (cookies.auth === "bar") {
            // Get the last dust readings then render them id the user is authenticated
            const dust = db.collection<DustSensor>('DustSensor')
            const lastDust = await dust.aggregate([{ $sort: { _id: -1 } }, { $limit: 1 }])

            // Redirect the user to the requested page if he is authenticated
            const url = new URL(req.url);
            return ctx.render!({path: url.pathname, isAllowed: true, dust:lastDust});
        } else {
            const url = new URL(req.url);
            url.pathname = "/";
            return Response.redirect(url);
        }
    }
};

export default function DustPage({ data }: PageProps<Data>) {
    const {path, isAllowed, dust} = data;
    return (
        <div className={ 'flex h-screen flex-col bg-[#5C7EB5]' }>
            <Header active={path} flag={isAllowed}/>
            <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 sm:flex-row justify-around items-center"}>
                <DustPanel dust={dust}/>
                <img src={asset('/securityLogo.png')}
                     alt={"Couldn't load image..."}
                     className={"w-1/4"}/>
            </div>
            <Footer/>
        </div>
    );
}