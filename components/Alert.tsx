type Props = {
    visible: boolean
};

export default function Alert( { visible }: Props ) {
    const flag = (visible)? "": " hidden";
    return(
        <div className={"bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"+ flag} role="alert">
            Wrong username or password!
        </div>
    );
}

