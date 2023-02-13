type data = {
    lastPayload: Record<any, any>
}

export default function DeviceControlPanel({ lastPayload }:data) {
    // Delete the value and the _id because we don't need it for this panel
    delete lastPayload.value
    delete lastPayload._id
    // Reconstruct the date first used data in order to be readable
    const firstDate = lastPayload.dateFirstUsed.split("T")
    lastPayload.dateFirstUsed = firstDate[0] + " " + firstDate[1].slice(0,-1)
    // Reconstruct the controlledProperty when the device monitors more than 2 things
    const cntProp = lastPayload.controlledProperty
    if(cntProp.length>1){
        let text = '';
        for (const value of cntProp){
            text = text + value.toString() + ' '
        }
        lastPayload.controlledProperty = text
    }

    const arr = []
    const readKeys = ["Device Id",
                      "Type",
                      "Device Category",
                      "Controlled Property",
                      "Battery Level",
                      "Rssi",
                      "Device State",
                      "Date last value reported",
                      "Date first used"
    ];
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
            <div className={ 'flex flex-col px-5 pt-5 text-gray-50 self-center gap-2 text-lg' }>
                {arr}
            </div>
        </div>

    )
}