import {asset} from "$fresh/runtime.ts";

type data = {
    temp1: number;
    temp2: number;
    temp3: number;
    temp4: number;
    temp5: number;
    temp6: number;
}

export default function RackTempPanel({temp1, temp2, temp3, temp4, temp5, temp6}: data) {
    const temp1Value: number = +temp1
    const temp2Value: number = +temp2
    const temp3Value: number = +temp3
    const temp4Value: number = +temp4
    const temp5Value: number = +temp5
    const temp6Value: number = +temp6

    const temperatureSource1 = temp1Value>=25? '/high-temperature.png': '/thermometer.png';
    const temperatureSource2 = temp2Value>=25? '/high-temperature.png': '/thermometer.png';
    const temperatureSource3 = temp3Value>=25? '/high-temperature.png': '/thermometer.png';
    const temperatureSource4 = temp4Value>=25? '/high-temperature.png': '/thermometer.png';
    const temperatureSource5 = temp5Value>=25? '/high-temperature.png': '/thermometer.png';
    const temperatureSource6 = temp6Value>=25? '/high-temperature.png': '/thermometer.png';

    const menus = [
        {
            title: 'Rack Temperature 1: ',
            value: temp1,
            src: temperatureSource1,
            alt: 'Temperature icon',
            unit: ' C '
        },
        {
            title: 'Rack Temperature 2: ',
            value: temp2,
            src: temperatureSource2,
            alt: 'Temperature icon',
            unit: ' C '
        },
        {
            title: 'Rack Temperature 3: ',
            value: temp3,
            src: temperatureSource3,
            alt: 'Temperature icon',
            unit: ' C '
        },
        {
            title: 'Rack Temperature 4: ',
            value: temp4,
            src: temperatureSource4,
            alt: 'Temperature icon',
            unit: ' C '
        },
        {
            title: 'Rack Temperature 5: ',
            value: temp5,
            src: temperatureSource5,
            alt: 'Temperature icon',
            unit: ' C '
        },
        {
            title: 'Rack Temperature 6: ',
            value: temp6,
            src: temperatureSource6,
            alt: 'Temperature icon',
            unit: ' C '
        },
    ]

    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-10 rounded-lg text-gray-50 justify-center gap-6' }>
            {menus.map((item)=> (
                <div className = { 'flex flex-row' }>
                    <img src={ asset(item.src) }
                         alt={ item.alt }
                         className={ 'w-12 h-12 '}/>
                    <div className={ 'self-center pl-3 text-lg '}>
                        {item.title+item.value+item.unit}
                    </div>
                </div>
            ))}
        </div>
    )
}