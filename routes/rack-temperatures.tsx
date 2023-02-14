// routes/rack-temperatures.tsx
import { Header } from "../components/Header.tsx";
import RackTempPanel from "../components/RackTempPanel.tsx";
import Footer from "../components/Footer.tsx";

import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { asset } from "$fresh/runtime.ts";
import db from "../model/mongodb.ts";
import RackTemperatureSensors from "../model/schemas/RackTemperatureSensors.ts";
import DeviceControlPanel from "../components/DeviceControlPanel.tsx";

interface Data {
    path: string;
    isAllowed: boolean;
    temps: Array<Record<any, any>>
}

export const handler: Handlers = {
    async GET(req, ctx) {
        const cookies = getCookies(req.headers);
        if (cookies.auth === "bar") {
            // Get the last 5 temperature for each side of the rack then render them if the user is authenticated
            const temperatures = db.collection<RackTemperatureSensors>("RackTemperatureSensors")
            const lastFiveTemperatures = await temperatures.aggregate([{ $sort: { _id: -1 } }, { $limit: 5 }])

            // Redirect the user to the requested page if he is authenticated
            const url = new URL(req.url);
            return ctx.render!({path: url.pathname, isAllowed: true, temps: lastFiveTemperatures});
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
            <title>Rack Temperatures | FlyMonitoring</title>
            <Header active={path} flag={isAllowed}/>
            <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 lg:flex-row justify-around items-center"}>
                <RackTempPanel temps={temps}/>
                <DeviceControlPanel lastPayload={temps[0]}/>
                <img src={asset('/securityLogo.png')}
                     alt={"Couldn't load image..."}
                     className={"w-2/4 md:w-1/4"}/>
            </div>
            <Footer/>
        </div>
    );
}