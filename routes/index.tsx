// routes/index.tsx
import {Header} from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import SignIn from "../components/SignIn.tsx";
import IndexPanel from "../components/IndexPanel.tsx";

import {Handlers, PageProps} from "$fresh/server.ts"
import {getCookies} from "std/http/cookie.ts"
import {asset} from "$fresh/runtime.ts";
import db from "../model/mongodb.ts";

interface Data {
    isAllowed: boolean;
    visible: boolean;
    readings:Record<string, string>
}

// const values = {
//     temperature: 32,
//     humidity: 25,
//     dust: 15,
//     smoke: 1,
//     water: 1
// }

 async function getDataFromSensor(collectionName: string) {
    // Open the collection that contains te requested data
    const collection = db.collection(collectionName)
    // Get and return the last data from the collection
    return  await collection.aggregate([{$sort: {_id: -1}}, {$limit: 1}])
}

export const handler: Handlers = {
    async GET(req, ctx){
        // Check if user is authenticated
        const cookies = getCookies(req.headers);
        const mistake  = (cookies.mistake)
            ? cookies.mistake === 'mistake'
            : false

        // Get the data that are needed for the index page
        let temp, hum; // Temperature-Humidity Sensor
        let dust; // Dust Sensor
        let water; // Fluid-Level Sensor
        let smoke; // Smoke Sensor

        if (cookies.auth === 'bar'){
            const tempHumData = await getDataFromSensor('TemperatureSensor')
            // Take only the values to present them
            const modIndex = tempHumData[0].value.indexOf('%')
            temp = tempHumData[0].value.slice(1,modIndex)
            hum = tempHumData[0].value.slice(modIndex+2)*100

            // Dust Sensor
            const dustData = await getDataFromSensor('DustSensor')
            dust = dustData[0].value.slice(1)*100

            // Water-Level Sensor
            const waterData = await getDataFromSensor('FluidLevelSensor')
            water = waterData[0].value

            // Smoke Sensor
            const smokeData = await getDataFromSensor('SmokeSensor')
            smoke = smokeData[0].value
        }

        const values = {
            temperature: temp,
            humidity: hum,
            dust: dust,
            water: water,
            smoke: smoke
        }
        return ctx.render!({ isAllowed: cookies.auth === 'bar',
                                   visible: mistake,
                                   readings:values
        })
    }
}

export default function Home({ data }: PageProps<Data>) {
    return (
      <div className={'flex h-screen flex-col bg-[#5C7EB5]'}>
          <Header active={"/"} flag={!!data.isAllowed}/>
          {!data.isAllowed
              // In case the user is NOT logged in!
              ? <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 sm:flex-row justify-around items-center"}>
                  <SignIn visible={data.visible}/>
                  <img src={asset('/securityLogo.png')}
                       alt={"Couldn't load image..."}
                       className={"w-1/4"}/>
                </div>
              // In case the user is logged in!
              : <div className={"flex bg-[#5C7EB5] flex-1 flex-col py-5 w-full gap-12 sm:flex-row justify-around items-center"}>
                  <IndexPanel dust={data.readings.dust.toString()}
                              humidity={data.readings.humidity.toString()}
                              temperature={data.readings.temperature.toString()}
                              water={data.readings.water.toString()}
                              smoke={data.readings.smoke.toString()}/>
                  <img src={asset('/securityLogo.png')}
                       alt={"Couldn't load image..."}
                       className={"w-1/4"}/>
              </div>}
          <Footer/>
      </div>
    );
}