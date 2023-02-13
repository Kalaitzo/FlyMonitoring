import {asset} from "$fresh/runtime.ts";

type data = {
    readingsTempHum: Record<any, any>
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

export default function RealSensorsPanel({readingsTempHum}: data){
    const modIndex = readingsTempHum.value.indexOf('%')
    const temperature = readingsTempHum.value.slice(1,modIndex)
    const humidity = (+readingsTempHum.value.slice(modIndex+2)).toFixed(2).toString()
    const dateTempHum = readingsTempHum.dateLastValueReported.toString()

    const tIndexTempHum = dateTempHum.indexOf('T')
    const dotIndexTempHum = dateTempHum.indexOf('.')
    const dateInfoTempHum = dateTempHum.slice(0,tIndexTempHum).split('-')
    const timeInfoTempHum = dateTempHum.slice(tIndexTempHum+1,dotIndexTempHum).split(':')
    // Timestamp
    const yearTempHum = dateInfoTempHum[0]
    const monthTempHum = getMonthFromNumber(+dateInfoTempHum[1])
    const dayTempHum = dateInfoTempHum[2]
    const hourTempHum = (+timeInfoTempHum[0]+2).toString()
    const minutesTempHum = timeInfoTempHum[1]
    const secondsTempHum = timeInfoTempHum[2]
    const timestampTempHum = `${monthTempHum} ${dayTempHum} ${yearTempHum} ${hourTempHum}:${minutesTempHum}:${secondsTempHum}`
    // Image source
    const temperatureValue: number = +temperature
    const temperatureSource = temperatureValue>=25? '/high-temperature.png': '/thermometer.png'


    const tempHumReading = [
        {
            title: 'Room Temperature: ',
            value: temperature,
            src: temperatureSource,
            alt: 'Temperature icon',
            unit: ' C',
            date:timestampTempHum
        },
        {
            title: 'Humidity: ',
            value: humidity,
            src: '/humidity.png',
            alt: 'Humidity icon',
            unit: '%',
            date:timestampTempHum
        },
    ]


    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-5 rounded-lg text-gray-50 justify-center gap-6' }>
            {tempHumReading.map((item) => (
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