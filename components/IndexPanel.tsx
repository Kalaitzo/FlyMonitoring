import { asset } from "$fresh/runtime.ts";

type data = {
    temperature: string
    humidity: string
    dust: string
    smoke: string
    water: string
}

export default function IndexPanel({ temperature, humidity, dust, smoke, water }:  data){
    const temperatureValue: number = +temperature;

    const temperatureSource = temperatureValue>=25? '/high-temperature.png': '/thermometer.png';
    const smokeSource = smoke === "0"? '/no-fire.png': '/fire.png';
    const waterSource = water === "0"? '/no-water.png': 'water.png';
    const humiditySource = '/humidity.png'
    const dustSource = '/dust.png'

    water = water === "0"? 'No flood detected': 'Flood detected'
    smoke = smoke === "0"? 'No smoke detected': 'Smoke detected'

    const menus = [
        {
            title: 'Room Temperature: ',
            value: temperature,
            src: temperatureSource,
            alt: 'Temperature icon',
            unit: ' C ',
            href: '/temperature-humidity'
        },
        {
            title: 'Humidity: ',
            value: humidity,
            src: humiditySource,
            alt: 'Humidity icon',
            unit: ' %',
            href: '/temperature-humidity'
        },
        {
            title: 'Dust: ',
            value: dust,
            src: dustSource,
            alt: 'Dust icon',
            unit: ' %',
            href: '/dust'
        },
        {
            title: 'Water: ',
            value: water,
            src: waterSource,
            alt: 'Water icon',
            unit: '',
            href: '/water-level'
        },
        {
            title: 'Smoke: ',
            value: smoke,
            src: smokeSource,
            alt: 'Smoke icon',
            unit: '',
            href: '/smoke'
        },
    ];

    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-10 rounded-lg text-gray-50 justify-center gap-6' }>
            {menus.map((item) => (
                <div className={ 'flex flex-row' }>
                <img src={ asset(item.src)}
                     alt={ item.alt.toString() }
                     className={ 'w-12 h-12 ' }/>
                <div className={ 'self-center pl-3 text-lg' }>
                    <a href={item.href}>{item.title + item.value + item.unit}</a>
                </div>
            </div>
            ))}
        </div>
    )
}