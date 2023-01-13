import { asset } from "$fresh/runtime.ts";

const data = {
    temperature: 20,
    humidity: 25,
    dust: 5,
    water: 0
}

export default function TestComponents(){
    return(
        <div className={ 'flex flex-col h-200 w-max bg-[#28374F] p-4 rounded-lg text-gray-50' }>
            <div className={ 'flex flex-row align-center' }>
                <img src={ asset("/logo.svg" )}
                     alt={ 'Temperature icon' }
                     className={ 'w-12 h-12 ' }/>
                <div className={ 'self-center pl-3' }>
                    {'Room Temperature: ' + data.temperature.toString() + 'C'}
                </div>
            </div>
            <div className={ 'flex flex-row align-center' }>
                <img src={ asset("/logo.svg" )}
                     alt={ 'Temperature icon' }
                     className={ 'w-12 h-12 ' }/>
                <div className={ 'self-center pl-3' }>
                    {'Humidity: ' + data.humidity.toString() + '%'}
                </div>
            </div>
            <div className={ 'flex flex-row align-center' }>
                <img src={ asset("/logo.svg" )}
                     alt={ 'Temperature icon'}
                     className={ 'w-12 h-12 ' }/>
                <div className={ 'self-center pl-3' }>
                    {'Dust: ' + data.dust.toString() + '%'}
                </div>
            </div>
            <div className={ 'flex flex-row align-center' }>
                <img src={ asset("/logo.svg" )}
                     alt={ 'Temperature icon'}
                     className={ 'w-12 h-12 ' }/>
                <div className={ 'self-center pl-3' }>
                    {'Water Level: ' + data.water.toString() + 'cm'}
                </div>
            </div>
        </div>
    )
}