import BrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";

export default function Footer() {
    const menus = [
        {
            title: "Device Control",
            children: [
                { name: "Rack Temperatures", href: "/rack-temperatures" },
                { name: "Temperature Humidity", href: "/temperature-humidity" },
                { name: "Dust", href: "/dust" },
                { name: "Water Level", href: "/water-level" },
                { name: "Smoke", href: "/smoke" },
                { name: "Tags", href: "/tags"},
                { name: "Entries", href: "/entries" },
                { name: "Real Sensors", href: 'real-sensors'}
            ],
        },
        {
            title: "Information",
            children: [
                { name: "Email", value: "name@example.com" },
                { name: "Phone", value: "69XXXXXXXX" },
                { name: "Discord", value: "Discord Server" }
            ],
        },
    ];

    return (
        <div class="bg-[#28374F] w-full flex flex-col md:flex-row w-full gap-2 md:gap-16 px-8 py-4 text-sm">
            <div class="flex-1">
                <div class="flex items-center gap-1">
                    <div class="font-bold text-2xl text-gray-50">
                        <a href={"/"}>FlyMonitoring</a>
                    </div>
                </div>
                <div class="text-gray-100">
                    Application for high security room monitoring
                </div>
            </div>

            {menus.map((item) => (
                <div class="mb-4" key={item.title}>
                    <div class="font-bold text-gray-50">{item.title}</div>
                    {item.title !== "Information"
                        ? <ul className="mt-2">
                        {item.children.map((child) => (
                            <li className="mt-2" key={child.name}>
                                <a
                                    className="text-gray-200 hover:text-blue-200"
                                    href={child.href}
                                >
                                    {child.name}
                                </a>
                            </li>
                        ))}
                        </ul>
                        : <ul className={"mt-2"}>
                            {item.children.map((child) => (
                                <li className={"mt-2"} key={child.name}>
                                    <div className={"text-gray-200"}>
                                        {child.name}: {child.value}
                                    </div>
                                </li>
                                ))}
                        </ul>
                    }
                </div>
            ))}

            <div class="text-gray-100 space-y-2">
                <div class="text-xs">
                    Copyright © 2023 FlyMonitoring<br />
                    All right reserved.
                </div>
                <a
                    href="https://github.com/Kalaitzo/FlyMonitoring"
                    class="inline-block hover:text-blue-200"
                >
                    <BrandGithub />
                </a>
            </div>
        </div>
    );
}
