import {asset} from "$fresh/runtime.ts";

type data = {
    temps: Record<any, any>
}

export default function RackTempPanel({temps}: data) {
    const sideTemps = temps[0].value.split('%')
    const values = sideTemps.map((item: string) => (item.slice(3)))
    const date = temps[0].dateLastValueReported

    const menus = [
        {
            title: 'Rack Temperature 1: ',
            value: values[0],
            src: values[0]<60? '/thermometer.png': '/high-temperature.png',
            alt: 'Temperature icon',
            unit: ' C',
            date: date
        },
        {
            title: 'Rack Temperature 2: ',
            value: values[1],
            src: values[1]<60? '/thermometer.png': '/high-temperature.png',
            alt: 'Temperature icon',
            unit: ' C',
            date: date
        },
        {
            title: 'Rack Temperature 3: ',
            value: values[2],
            src: values[2]<60? '/thermometer.png': '/high-temperature.png',
            alt: 'Temperature icon',
            unit: ' C',
            date: date
        },
        {
            title: 'Rack Temperature 4: ',
            value: values[3],
            src: values[3]<60? '/thermometer.png': '/high-temperature.png',
            alt: 'Temperature icon',
            unit: ' C',
            date: date
        },
        {
            title: 'Rack Temperature 5: ',
            value: values[4],
            src: values[4]<60? '/thermometer.png': '/high-temperature.png',
            alt: 'Temperature icon',
            unit: ' C',
            date: date
        },
        {
            title: 'Rack Temperature 6: ',
            value: values[5],
            src: values[5]<60? '/thermometer.png': '/high-temperature.png',
            alt: 'Temperature icon',
            unit: ' C ',
            date: date
        },
    ]

    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-5 rounded-lg text-gray-50 justify-center gap-6' }>
            {menus.map((item)=> (
                <div className = { 'flex flex-row' }>
                    <img src={ asset(item.src) }
                         alt={ item.alt }
                         className={ 'w-12 h-12 self-center'}/>
                    <div className={ 'self-center pl-3 text-lg '}>
                        {item.title + item.value + item.unit}
                        <br/>
                        {item.date}
                    </div>
                </div>
            ))}
        </div>
    )
}