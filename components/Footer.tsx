import BrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";

export default function Footer() {
    const menus = [
        {
            title: "Device Control",
            children: [
                { name: "Rack Temperature", href: "/rack-temperature" },
                { name: "Temperature Humidity", href: "/temperature-humidity" },
                { name: "Water Level", href: "/water-level" },
                { name: "Smoke", href: "/smoke" },
                { name: "Entrees", href: "/entrees" },
            ],
        },
        {
            title: "Information",
            children: [
                { name: "Email", href: "#" },
                { name: "Phone", href: "#" },
                { name: "Discord", href: "#" }
            ],
        },
    ];

    return (
        <div class="sticky bottom-0 bg-[#28374F] flex flex-col md:flex-row w-full w-full gap-2 md:gap-16 px-8 py-4 text-sm">
            <div class="flex-1">
                <div class="flex items-center gap-1">
                    <div class="font-bold text-2xl text-gray-50">
                        FlyMonitoring
                    </div>
                </div>
                <div class="text-gray-100">
                    Application for high security room monitoring
                </div>
            </div>

            {menus.map((item) => (
                <div class="mb-4" key={item.title}>
                    <div class="font-bold text-gray-50">{item.title}</div>
                    <ul class="mt-2">
                        {item.children.map((child) => (
                            <li class="mt-2" key={child.name}>
                                <a
                                    class="text-gray-200 hover:text-blue-200"
                                    href={child.href}
                                >
                                    {child.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <div class="text-gray-100 space-y-2">
                <div class="text-xs">
                    Copyright © 2020 FlyMonitoring<br />
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
