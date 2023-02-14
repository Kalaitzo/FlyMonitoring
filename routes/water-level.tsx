// routes/water-level.tsx
import type { Handlers, PageProps} from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { Header } from "../components/Header.tsx";
import db from "../model/mongodb.ts";
import FluidLevelSensor from "../model/schemas/FluidLevelSensor.ts";
import WaterLevelPanel from "../components/WaterLevelPanel.tsx";
import {asset} from "$fresh/src/runtime/utils.ts";
import Footer from "../components/Footer.tsx";
import DeviceControlPanel from "../components/DeviceControlPanel.tsx";

interface Data {
    path: string;
    isAllowed: boolean;
    waterLevels: Array<Record<any, any>>;
}

export const handler: Handlers = {
    async GET(req, ctx) {
        const cookies = getCookies(req.headers);
        if (cookies.auth === "bar") {
            // Get the last 5 fluid-level readings and if the user is authenticated render them
            const waterLevels = db.collection<FluidLevelSensor>('FluidLevelSensor')
            const lastFiveWaterLevels = await waterLevels.aggregate([{ $sort: { _id: -1 } }, { $limit: 5 }])

            // Redirect the user to the requested page if he is authenticated
            const url = new URL(req.url);
            return ctx.render!({path: url.pathname, isAllowed: true, waterLevels: lastFiveWaterLevels});
        } else {
            const url = new URL(req.url);
            url.pathname = "/";
            return Response.redirect(url);
        }
    }
}

export default function WaterLevelPage({ data }: PageProps<Data>) {
    const {path, isAllowed, waterLevels} = data;
    return (
        <div className={ 'flex h-screen flex-col bg-[#5C7EB5]' }>
            <title>Water Level | FlyMonitoring</title>
            <Header active={path} flag={isAllowed}/>
            <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 lg:flex-row justify-around items-center"}>
                <WaterLevelPanel waters={waterLevels}/>
                <DeviceControlPanel lastPayload={waterLevels[0]}/>
                <img src={asset('/securityLogo.png')}
                     alt={"Couldn't load image..."}
                     className={"w-2/4 md:w-1/4"}/>
            </div>
            <Footer/>
        </div>
    );
}