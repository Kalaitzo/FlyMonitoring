import Alert from "./Alert.tsx";

type Props = {
    visible: boolean
};

export default function SignIn({ visible }: Props ) {
    return (
        <div class="flex">
            <div class="bg-[#76A1E8] shadow-md rounded-xl px-8 pt-6 pb-8">
                <Alert visible={visible}/>
                <h2 class="text-2xl font-bold mb-2 text-gray-800 text-center">Sign In</h2>
                <form action='/api/login' method='post'>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input class="shadow
                                      appearance-none
                                      border
                                      rounded
                                      w-full
                                      py-2
                                      px-3
                                      text-gray-700
                                      leading-tight
                                      focus:outline-none
                                      focus:shadow-outline"
                               id="username"
                               name='username'
                               type="text"
                               placeholder="Username"/>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow
                                      appearance-none
                                      border
                                      rounded
                                      w-full
                                      py-2
                                      px-3
                                      text-gray-700
                                      mb-3
                                      leading-tight
                                      focus:outline-none
                                      focus:shadow-outline"
                               id="password"
                               name="password"
                               type="password"
                               placeholder="********"/>
                    </div>
                    <div class="flex flex-col gap-3 items-center justify-center">
                        <button class="bg-[#5C7EB5]
                                       hover:bg-[#425A82]
                                       text-gray-800
                                       font-bold
                                       py-2
                                       px-4
                                       rounded
                                       focus:outline-none
                                       focus:shadow-outline"
                                type="submit">
                            Sign In
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}