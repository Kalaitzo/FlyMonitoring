// routes/tags.tsx
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { Header } from "../components/Header.tsx";
import db from "../model/mongodb.ts";
import TagSensor from "../model/schemas/TagSensor.ts";
import TagsPanel from "../components/TagsPanel.tsx";
import {asset} from "$fresh/src/runtime/utils.ts";
import Footer from "../components/Footer.tsx";
import DeviceControlPanel from "../components/DeviceControlPanel.tsx";

interface Data {
    path: string;
    isAllowed: boolean;
    tagDetections: Array<Record<any, any>>;
}

export const handler: Handlers = {
    async GET(req, ctx) {
        const cookies = getCookies(req.headers);
        if (cookies.auth === "bar") {
            // Get the last 5 tag readings and if the user is authenticated render them
            const tagDetections = db.collection<TagSensor>('TagSensor');
            const lastFiveTagDetections = await tagDetections.aggregate([{ $sort: { _id: -1 } }, { $limit: 5 }])

            // Redirect the user to the requested page if he is authenticated
            const url = new URL(req.url);
            return ctx.render!({path: url.pathname, isAllowed: true, tagDetections: lastFiveTagDetections});
        } else {
            const url = new URL(req.url);
            url.pathname = "/";
            return Response.redirect(url);
        }
    }
};

export default function TagsPage({ data }: PageProps<Data>) {
    const {path, isAllowed, tagDetections} = data;
    return (
        <div className={ 'flex h-screen flex-col bg-[#5C7EB5]' }>
            <Header active={path} flag={isAllowed}/>
            <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 sm:flex-row justify-around items-center"}>
                <TagsPanel tagDetections={tagDetections}/>
                <DeviceControlPanel lastPayload={tagDetections[0]}/>
                <img src={asset('/securityLogo.png')}
                     alt={"Couldn't load image..."}
                     className={"w-2/4 md:w-1/4"}/>
            </div>
            <Footer/>
        </div>
    );
}