import { asset } from "$fresh/runtime.ts";
import Hamburger from "../islands/Hamburger.tsx";

type Props = {
    active: string;
    flag: boolean;
};

export function Header({ active, flag }: Props, ) {

    const menus = [
        { name: "Home", href: "/" },
        { name: "Rack Temperatures", href: "/rack-temperatures" },
        { name: "Temperature Humidity", href: '/temperature-humidity'},
        { name: "Dust", href: "/dust" },
        { name: "Water Level", href: "/water-level"},
        { name: "Smoke", href: "/smoke"},
        { name: "Tags", href: "/tags"},
        { name: "Entries", href: "/entries" },
        { name: 'Real Sensors', href: '/real-sensors'}
    ];

    return (
        <div class="flex bg-[#28374F] items-center py-5 px-8 flex-col sm:flex-row gap-4 mx-0">
            <div class="flex flex-1 items-center gap-2">
                <div className="ml-1 text-2xl text-gray-50 font-bold">
                    <a href={"/"}>FlyMonitoring</a>
                </div>
                <a href={"/"}>
                {/*<img src={"https://pngimage.net/wp-content/uploads/2018/06/heisenberg-logo-png-2.png"}*/}
                {/*     alt={"Couldn't load image..."}*/}
                {/*     class={"w-12 h-12"}/>*/}
                    <img src={asset('/FlyMonitoringLogo.png')}
                         class={'w-12 h-12'}
                         alt={'FlyMonitoring Logo'}/>
                </a>
            </div>
            <Hamburger active={active}/>
            <ul class="flex ml-14 flex-wrap items-center gap-6 hidden lg:flex">
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
                    ? <a href={'/api/logout'}>
                        <button className={"bg-[#76A1E8] hover:bg-[#5C7EB5] text-gray-50 rounded px-6 py-2.5"}>
                            Log Out
                        </button>
                      </a>
                    : ""}
            </div>
        </div>
    );
}
