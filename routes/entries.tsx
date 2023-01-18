// routes/rack-temperatures.tsx
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

import { Header } from "../components/Header.tsx";
import db from "../model/mongodb.ts";
import DoorSensor from "../model/schemas/DoorSensor.ts";
import EntriesPanel from "../components/EntiresPanel.tsx";
import {asset} from "$fresh/src/runtime/utils.ts";
import Footer from "../components/Footer.tsx";

interface Data {
    path: string;
    isAllowed: boolean;
    entries: Array<Record<any, any>>;
}

export const handler: Handlers = {
    async GET(req, ctx) {
        const cookies = getCookies(req.headers);
        if (cookies.auth === "bar") {
            // Get the last 10 entries then render if the user is authenticated
            const entries = db.collection<DoorSensor>("DoorSensor")
            const lastTenEntries = await entries.aggregate([{ $sort: { _id: -1 } }, { $limit: 15 }])

            const url = new URL(req.url);
            return ctx.render!({path: url.pathname, isAllowed: true, entries: lastTenEntries});
        } else {
            // In case the user isn't authenticated redirect him to the index page
            const url = new URL(req.url);
            url.pathname = "/";
            return Response.redirect(url);
        }
    }
};

export default function EntriesPage({ data }: PageProps<Data>) {
    const {path, isAllowed, entries} = data;
    const panelEntries = entries.filter( entrance => entrance.value !== "0" )
    console.log(panelEntries)
    return (
        <div className={ 'flex h-screen flex-col bg-[#5C7EB5]' }>
            <Header active={path} flag={isAllowed}/>
            <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 sm:flex-row justify-around items-center"}>
                <EntriesPanel entries={panelEntries}/>
                <img src={asset('/securityLogo.png')}
                     alt={"Couldn't load image..."}
                     className={"w-1/4"}/>
            </div>
            <Footer/>
        </div>
    );
}