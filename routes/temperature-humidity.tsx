// routes/temperature-humidity.tsx
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

import { Header } from "../components/Header.tsx";
import db from "../model/mongodb.ts";
import TemperatureSensor from "../model/schemas/TemperatureSensor.ts";
import TempHumPanel from "../components/TempHumPanel.tsx";
import Footer from "../components/Footer.tsx";
import DeviceControlPanel from "../components/DeviceControlPanel.tsx";

interface Data {
    path: string;
    isAllowed: boolean;
    temperatures: Array<Record<any, any>>;
}

export const handler: Handlers = {
    async GET(req, ctx){
        const cookies = getCookies(req.headers);
        if(cookies.auth == 'bar') {
            // Get the last 15 temperature readings then render them if the user is authenticated
            const temperatures = db.collection<TemperatureSensor>('TemperatureSensor')
            const lastFifteenTemperatures = await temperatures.aggregate([{ $sort: { _id: -1 } }, { $limit: 1 }])

            // Redirect the user to the requested page if he is authenticated
            const url = new URL(req.url);
            return ctx.render!({path: url.pathname, isAllowed: true, temperatures: lastFifteenTemperatures})
        } else {
            const url = new URL(req.url);
            url.pathname = "/"
            return Response.redirect(url)
        }
    }
}

export default function TemperatureHumidityPage({ data }: PageProps<Data>){
    const {path, isAllowed, temperatures} = data;
    return (
        <div className={ 'flex h-screen flex-col bg-[#5C7EB5]' }>
            <title>Temperature Humidity | FlyMonitoring</title>
            <Header active={path} flag={isAllowed}/>
            <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 lg:flex-row justify-around items-center"}>
                <TempHumPanel temperatures={temperatures}/>
                <DeviceControlPanel lastPayload={temperatures[0]}/>
                <div className={'bg-[#28374F] mx-3 rounded colour-gray-50 p-4'}>
                    <img
                        src="/chart"
                        className=""
                        alt="an example chart provided as an image"
                    />
                </div>
            </div>
            <Footer/>
        </div>
    )
}