import {asset} from "$fresh/src/runtime/utils.ts";

type data = {
    smokeDetections: Record<any, any>
}

export default function SmokePanel({smokeDetections}: data) {
    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-5 rounded-lg text-gray-50 justify-center gap-6' }>
            {smokeDetections.map((item:Record<any, any>) => (
                <div className={ 'flex flex-row' }>
                    <img src={ (item.value==="1")? asset("/fire.png"): asset("/no-fire.png")  }
                         alt={ 'Smoke Icon' }
                         className={ 'w-12 h-12 self-center' }/>
                    <div className={ 'self-center pl-3 text-lg' }>
                        {((item.value==="1")
                            ? "Smoke Detected "
                            : "No smoke Detected ")}
                        <br/>
                        {item.dateLastValueReported}
                    </div>
                </div>
            ))}
        </div>
    )
}