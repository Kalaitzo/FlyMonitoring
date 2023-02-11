// routes/real-sensors.tsx
import { Handlers, PageProps} from "$fresh/server.ts"
import { getCookies } from "std/http/cookie.ts"
import { asset } from "$fresh/src/runtime/utils.ts";
import { Header } from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import db from "../model/mongodb.ts";
import RealSensors from "../model/schemas/RealSensors.ts";
import RealSensorsPanel from "../components/RealSensorsPanel.tsx";

interface Data {
    path: string;
    isAllowed: boolean;
    readings: Array<Record<any, any>>;
}

export const handler: Handlers = {
    async GET(req,ctx){
        const cookies = getCookies(req.headers)
        if (cookies.auth === 'bar'){
            // Get the last data from the real sensors
            const realSensors =  db.collection<RealSensors>("RealSensors")
            const realSensorsData = await realSensors.aggregate([{ $sort: { _id:-1 }}, { $limit:1 } ])
            // Redirect the user to the requested page if he is authenticated
            const url = new URL(req.url);
            return ctx.render!({path: url.pathname, isAllowed:true, readings:realSensorsData})
        } else {
            // In case the user isn't authenticated redirect him to the index page
            const url = new URL(req.url);
            url.pathname = "/";
            return Response.redirect(url);
        }
    }
}

export default function RealSensorsPage({ data }: PageProps<Data>){
    const {path, isAllowed, readings} = data
    return(
        <div className={ 'flex h-screen flex-col bg-[#5C7EB5' }>
            <Header active={path} flag={isAllowed}/>
            <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 sm:flex-row justify-around items-center"}>
                <RealSensorsPanel readings={readings}/>
                <img src={asset('/securityLogo.png')}
                     alt={"Couldn't load image..."}
                     className={"w-1/4"}/>
            </div>
            <Footer/>
        </div>
    )
}