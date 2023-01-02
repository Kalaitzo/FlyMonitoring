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
        <div class="fixed inset-x-0 bottom-0 bg-white flex flex-col md:flex-row w-full w-full gap-8 md:gap-16 px-8 py-8 text-sm">
            <div class="flex-1">
                <div class="flex items-center gap-1">
                    <div class="font-bold text-2xl">
                        FlyMonitoring
                    </div>
                </div>
                <div class="text-gray-500">
                    Application for high security room monitoring
                </div>
            </div>

            {menus.map((item) => (
                <div class="mb-4" key={item.title}>
                    <div class="font-bold">{item.title}</div>
                    <ul class="mt-2">
                        {item.title !== 'Information'? 'No no no' : 'Info'}
                        {item.children.map((child) => (
                            <li class="mt-2" key={child.name}>
                                <a
                                    class="text-gray-500 hover:text-gray-700"
                                    href={child.href}
                                >
                                    {child.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <div class="text-gray-500 space-y-2">
                <div class="text-xs">
                    Copyright © 2020 FlyMonitoring<br />
                    All right reserved.
                </div>

                <a
                    href="https://github.com/Kalaitzo/FlyMonitoring"
                    class="inline-block hover:text-black"
                >
                    <BrandGithub />
                </a>
            </div>
        </div>
    );
}
