type data = {
    lastPayload: Record<any, any>
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

export default function DeviceControlPanelReal({lastPayload}: data){
    // Delete the value and the _id because we don't need it for this panel
    delete lastPayload.value
    delete lastPayload._id
    // Reconstruct the controlledProperty when the device monitors more than 2 things
    const cntProp = lastPayload.controlledProperty

    if (cntProp.length>1){
        let text = '';
        for (const value of cntProp){
            text = text + value.toString() + ', '
        }
        lastPayload.controlledProperty = text.slice(0,-2)
    }

    // Reconstruct the date last value reported
    const lastDate: string = lastPayload.dateLastValueReported
    const dateInfo: Array<string> = lastDate.split('T')[0].split('-')
    const month = getMonthFromNumber(+dateInfo[1])

    const dotIndex: number = lastDate.split('T')[1].indexOf('.')
    const time: string = lastDate.split('T')[1].slice(0,dotIndex)
    const timeInfo = time.split(':')
    const hour = +timeInfo[0]+2

    lastPayload.dateLastValueReported = `${month} ${dateInfo[2]} ${dateInfo[0]} ${hour}:${timeInfo[1]}:${timeInfo[2]}`

    const arr = [];
    const readKeys = ['Device Id', "Type", "Device Category", "Controlled Property", "Date last value reported",]
    let cnt = 0;
    for (const key in lastPayload){
        arr.push(
            <div>
                {readKeys[cnt]}: {lastPayload[key]}
            </div>
        )
        cnt++
    }

    return(
        <div className={ 'flex flex-col w-80 md:w-max justify-center h-max bg-[#28374F] py-5 rounded-lg text-gray-50' }>
            <div className={ 'w-1/2 flex flex-col text-gray-50 justify-center gap-2 self-center' }>
                <div className={"text-xl self-center"}>Device Control</div>
                <div className={"w-3/4 h-0.5 bg-gray-50 self-center"}></div>
            </div>
            <div className={ 'flex flex-col px-5 pt-5 text-gray-50 self-center gap-3 text-lg' }>
                {arr}
            </div>
        </div>

    )
}