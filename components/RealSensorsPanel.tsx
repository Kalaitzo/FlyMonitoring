import {asset} from "$fresh/runtime.ts";

type data = {
    readings: Record<any, any>
}

export default function RealSensorsPanel({readings}: data){
    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-5 rounded-lg text-gray-50 justify-center gap-6' }>

        </div>
    )
}