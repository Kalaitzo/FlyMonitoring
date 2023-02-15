import {asset} from "$fresh/src/runtime/utils.ts";

type data = {
    readingsMove: Record<any, any>
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

export default function RealMovePanel({readingsMove}: data){
    for (let i = 0; i<readingsMove.length; i++) {
        const date = readingsMove[i].dateLastValueReported.toString()

        const tIndex = date.indexOf('T')
        const dotIndex = date.indexOf('.')
        const dateInfo = date.slice(0,tIndex).split('-')
        const timeInfo = date.slice(tIndex+1,dotIndex).split(":")
        //Timestamp
        const year = dateInfo[0]
        const month = getMonthFromNumber(+dateInfo[1])
        const day = dateInfo[2]
        const hour = (+timeInfo[0]+2).toString()
        const minutes = timeInfo[1]
        const seconds = timeInfo[2]

        readingsMove[i].dateLastValueReported = `${month} ${day} ${year} ${hour}:${minutes}:${seconds}`
    }

    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-5 rounded-lg text-gray-50 justify-center gap-6' }>
            {readingsMove.map((item:Record<any, any>) => (
                <div className={ 'flex flex-row' }>
                    <img src={ (item.value==="1")? asset("/movement.png"): asset("/no-movement.png")  }
                         alt={ 'Movement Icon' }
                         className={ 'w-12 h-12 self-center' }/>
                    <div className={ 'self-center pl-3 text-lg' }>
                        {((item.value==="1")
                            ? "Movement Detected "
                            : "No movement Detected ")}
                        <br/>
                        {item.dateLastValueReported}
                    </div>
                </div>
            ))}
        </div>
    )
}