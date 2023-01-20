import {asset} from "$fresh/src/runtime/utils.ts";

type data = {
    waters: Record<any, any>
}

export default function WaterLevelPanel({ waters }: data){
    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-7 rounded-lg text-gray-50 justify-center gap-6' }>
            {waters.map((item:Record<any, any>) => (
                <div className={ 'flex flex-row' }>
                    <img src={ (item.value==="1")? asset("/water.png"): asset("/no-water.png")  }
                         alt={ 'Water Icon' }
                         className={ 'w-12 h-12 self-center' }/>
                    <div className={ 'self-center pl-3 text-lg' }>
                        {((item.value==="1")
                            ? "Water Detected "
                            : "No water Detected ")}
                        <br/>
                        {item.dateLastValueReported}
                    </div>
                </div>
            ))}
        </div>
    )
}