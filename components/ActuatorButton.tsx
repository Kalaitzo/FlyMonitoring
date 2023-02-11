export default function ActuatorButton(){
    return(
        <form action="/api/temperature-actuator" method={'post'}>
            <button class="bg-[#76A1E8]
                           hover:bg-[#5C7EB5]
                           text-gray-50
                           py-2
                           px-4
                           rounded
                           focus:outline-none
                           focus:shadow-outline"
                    type="submit">
                Increase AC Power
            </button>
        </form>
    )
}