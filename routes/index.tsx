// routes/index.tsx
import {Header} from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import SignIn from "../components/SignIn.tsx";
import IndexPanel from "../components/IndexPanel.tsx";

import { Handlers, PageProps } from "$fresh/server.ts"
import { getCookies } from "std/http/cookie.ts"

interface Data {
    isAllowed: boolean;
}

const values = {
    temperature: 32,
    humidity: 25,
    dust: 15,
    smoke: 1,
    water: 1
}

export const handler: Handlers = {
    GET(req, ctx){
        const cookies = getCookies(req.headers);
        return ctx.render!({ isAllowed: cookies.auth === 'bar'})
    }
}

export default function Home({ data }: PageProps<Data>) {
  return (
      <div className={'flex h-screen flex-col bg-[#5C7EB5]'}>
          <Header active={"/"} flag={!!data.isAllowed}/>
          {!data.isAllowed
              // In case the user is NOT logged in!
              ? <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 sm:flex-row justify-around items-center"}>
                  <SignIn/>
                  <img src={"https://cdn-icons-png.flaticon.com/512/2974/2974498.png"}
                       alt={"Couldn't load image..."}
                       className={"w-1/4"}/>
                </div>
              // In case the user is logged in!
              : <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 sm:flex-row justify-around items-center"}>
                  <IndexPanel dust={values.dust.toString()}
                              humidity={values.humidity.toString()}
                              temperature={values.temperature.toString()}
                              water={values.water.toString()}
                              smoke={values.smoke.toString()}/>
                  <img src={"https://cdn-icons-png.flaticon.com/512/2974/2974498.png"}
                       alt={"Couldn't load image..."}
                       className={"w-1/4"}/>
              </div>}
          <Footer/>
      </div>
  );
}