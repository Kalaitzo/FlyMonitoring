import { useState } from "preact/hooks";

type Props = {
    active: string;
};

export default function Hamburger({ active }: Props) {
    const [navOpen, setNavOpen] = useState(false);

    const menus = [
        { name: "Home", href: "/" },
        { name: "Rack Temperatures", href: "/rack-temperatures" },
        { name: "Temperature Humidity", href: '/temperature-humidity'},
        { name: "Water Level", href: "/water-level"},
        { name: "Smoke", href: "/smoke"},
        { name: "Tags", href: "/tags"},
        { name: "Entries", href: "/entries" },
    ];

    return (
        <div className={'flex flex-row justify-between items-center gap-8 lg:hidden '}>
            <div className="m-34 inline-block items-center space-y-2" onClick={() => setNavOpen(!navOpen)}>
                <div className="w-8 h-0.5 bg-gray-50"></div>
                <div className="w-8 h-0.5 bg-gray-50"></div>
                <div className="w-8 h-0.5 bg-gray-50"></div>
            </div>

            <ul className={(navOpen? "visible flex flex-wrap items-center gap-6": "hidden")}>
                {menus.map((menu) => (
                    <li>
                        <a
                            href={menu.href}
                            className={"text-gray-50 hover:text-blue-200 py-1 border-gray-50"+
                                (menu.href === active ? " font-bold border-b-2" : "")}
                        >
                            {menu.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}