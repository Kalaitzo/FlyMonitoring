import {asset} from "$fresh/src/runtime/utils.ts";
import ActuatorButton from "./ActuatorButton.tsx";

type data = {
    temperatures: Record<any, any>
}

export default function TempHumPanel({temperatures}: data){
    const modIndex = temperatures[0].value.indexOf('%')
    const temperature = temperatures[0].value.slice(1,modIndex)
    const humidity = (temperatures[0].value.slice(modIndex+2)*100).toFixed(2).toString()
    const date = temperatures[0].dateLastValueReported.toString()

    const temperatureValue: number = +temperature;
    const temperatureSource = temperatureValue>=25? '/high-temperature.png': '/thermometer.png';

    const menus = [
        {
            title: 'Room Temperature: ',
            value: temperature,
            src: temperatureSource,
            alt: 'Temperature icon',
            unit: ' C',
            date:date
        },
        {
            title: 'Humidity: ',
            value: humidity,
            src: '/humidity.png',
            alt: 'Humidity icon',
            unit: '%',
            date:date
        }
    ]

    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-5 rounded-lg text-gray-50 justify-center gap-6' }>
            {menus.map((item) => (
                <div className={ 'flex flex-row' }>
                    <img src={ asset(item.src) }
                         alt={ item.alt }
                         className={ 'w-12 h-12 self-center' }/>
                    <div className={ 'self-center pl-3 text-lg center' }>
                        {item.title + item.value + item.unit}
                        <br/>
                        {item.date}
                        {item.title==='Room Temperature: '
                            ?
                            <div className={'text-center py-3'}>
                                <ActuatorButton/>
                            </div>
                            : ''
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}