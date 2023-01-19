import {asset} from "$fresh/src/runtime/utils.ts";

type data = {
    entries: Array<Record<any, any>>
}

export default function EntriesPanel({ entries }: data){
    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-10 rounded-lg text-gray-50 justify-center gap-6' }>
            {entries.map((item) => (
                <div className = { 'flex flex-row' }>
                    <img src={ asset('/entrance.png') }
                         alt={ 'Entrance Icon' }
                         className={ 'w-12 h-12 '}/>
                    <div className = { 'self-center pl-3 text-lg' }>
                        {item.value.slice(2)}
                    </div>
                </div>
            ))}
        </div>
    )
}