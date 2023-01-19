import {asset} from "$fresh/src/runtime/utils.ts";

type data = {
    tagDetections: Record<any, any>
}

export default function TagsPanel({tagDetections}: data){
    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-10 rounded-lg text-gray-50 justify-center gap-6' }>
            {tagDetections.map((item:Record<any, any>) => (
                <div className={ 'flex flex-row' }>
                    <img src={ (item.value==="1")? asset("/movement.png"): asset("/no-movement.png")  }
                         alt={ 'Movement Icon' }
                         className={ 'w-12 h-12 ' }/>
                    <div className={ 'self-center pl-3 text-lg' }>
                        {((item.value==="1")
                            ? "Movement Detected "
                            : "No movement Detected ")
                            + item.dateLastValueReported}
                    </div>
                </div>
            ))}
        </div>
    )
}