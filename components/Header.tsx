type Props = {
    active: string;
    flag: boolean;
};

export function Header({ active, flag }: Props, ) {
    const menus = [
        { name: "Home", href: "/" },
        { name: "Rack Temperatures", href: "/test-header" },
        { name: "Entrees", href: "/docs" },
        { name: "Temperature Humidity", href: "/dummy"}
    ];

    return (
        <div class="sticky top-0 bg-[#28374F] w-full py-5 px-8 flex flex-col md:flex-row gap-4 mx-0">
            <div class="flex items-center flex-1">
                <div className="ml-1 text-2xl text-gray-50 font-bold">
                    <a href={"/"}>FlyMonitoring</a>
                </div>
                <a href={"/"}>
                <img src={"https://pngimage.net/wp-content/uploads/2018/06/heisenberg-logo-png-2.png"}
                     alt={"Couldn't load image..."}
                     class={"w-12 h-12"}/>
                </a>
            </div>
            <ul class="flex items-center gap-6">
                {menus.map((menu) => (
                    <li>
                        <a
                            href={menu.href}
                            class={"text-gray-50 hover:text-blue-200 py-1 border-gray-50" +
                                (menu.href === active ? " font-bold border-b-2" : "")}
                        >
                            {menu.name}
                        </a>
                    </li>
                ))}
            </ul>
            <div>
                {flag
                    ? <button type={'submit'}
                              className={"bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-2.5"}>
                        Log Out</button>
                    : ""}
            </div>
        </div>
    );
}
