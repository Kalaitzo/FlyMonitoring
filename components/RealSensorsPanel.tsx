import {asset} from "$fresh/runtime.ts";

type data = {
    readings: Record<any, any>
}

function getMonthFromNumber(monthNumber: number): string{
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    return months[monthNumber-1] || "Invalid Month Number"
}

export default function RealSensorsPanel({readings}: data){
    const modIndex = readings[0].value.indexOf('%')
    const temperature = readings[0].value.slice(1,modIndex)
    const humidity = (+readings[0].value.slice(modIndex+2)).toFixed(2).toString()
    const date = readings[0].dateLastValueReported.toString()

    const temperatureValue: number = +temperature
    const temperatureSource = temperatureValue>=25? '/high-temperature.png': '/thermometer.png'

    const tIndex = date.indexOf('T')
    const dotIndex = date.indexOf('.')
    const dateInfo = date.slice(0,tIndex).split('-')
    const timeInfo = date.slice(tIndex+1,dotIndex).split(':')

    const year = dateInfo[0]
    const month = getMonthFromNumber(+dateInfo[1])
    const day = dateInfo[2]
    const hour = (+timeInfo[0]+2).toString()
    const minutes = timeInfo[1]
    const seconds = timeInfo[2]

    const timestamp = `${month} ${day} ${year} ${hour}:${minutes}:${seconds}`

    const menus = [
        {
            title: 'Room Temperature: ',
            value: temperature,
            src: temperatureSource,
            alt: 'Temperature icon',
            unit: ' C',
            date:timestamp
        },
        {
            title: 'Humidity: ',
            value: humidity,
            src: '/humidity.png',
            alt: 'Humidity icon',
            unit: '%',
            date:timestamp
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
                    </div>
                </div>
            ))}
        </div>
    )
}