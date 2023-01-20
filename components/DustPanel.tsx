import {asset} from "$fresh/src/runtime/utils.ts";

type data = {
    dust: Record<any, any>
}

export default function DustPanel({dust}: data) {
    const dustValue = (dust[0].value.slice(1)*100).toString()

    return(
        <div className={ 'flex flex-col w-max h-max bg-[#28374F] p-7 rounded-lg text-gray-50 justify-center gap-6' }>
            <div className={ 'flex flex-row' }>
                <img src={ asset('/dust.png') }
                     alt={ 'Dust Icon '}
                     className={ 'w-12 h-12 ' }/>
                <div className={ 'self-center pl-3 text-lg' }>
                    {'Dust: ' + dustValue + '%'}
                    <br/>
                    {dust[0].dateLastValueReported}
                </div>
            </div>
        </div>
    )
}