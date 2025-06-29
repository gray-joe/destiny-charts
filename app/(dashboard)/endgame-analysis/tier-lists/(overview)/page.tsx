import { lusitana } from '@/app/ui/fonts'
import Link from 'next/link'

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Endgame Analysis
            </h1>

            {/* Cards Container */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Exotic Weapons Tier List Card */}
                <Link
                    href="/endgame-analysis/tier-lists/exotic-weapons"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Exotic Weapons
                    </h1>
                </Link>

                {/* Exotic Armor Tier List Card */}
                <Link
                    href="/endgame-analysis/tier-lists/exotic-armor"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Exotic Armor
                    </h1>
                </Link>

                {/* LFR Tier List Card */}
                <Link
                    href="/endgame-analysis/tier-lists/lfrs"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Linear Fusion Rifles
                    </h1>
                </Link>

                {/* Heavy Grenade Launcher Card */}
                <Link
                    href="/endgame-analysis/tier-lists/heavy-gls"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Heavy Grenade Launchers
                    </h1>
                </Link>

                {/* Machine Gun Card */}
                <Link
                    href="/endgame-analysis/tier-lists/mgs"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Machine Guns
                    </h1>
                </Link>

                {/* Rocket Launcher Card */}
                <Link
                    href="/endgame-analysis/tier-lists/rocket-launchers"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Rocket Launchers
                    </h1>
                </Link>

                {/* Sword Card */}
                <Link
                    href="/endgame-analysis/tier-lists/swords"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Swords
                    </h1>
                </Link>

                {/* Breach Grenade Launcher Card */}
                <Link
                    href="/endgame-analysis/tier-lists/breach-gls"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Breach Grenade Launchers
                    </h1>
                </Link>

                {/* Glaive Card */}
                <Link
                    href="/endgame-analysis/tier-lists/glaives"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Glaives
                    </h1>
                </Link>

                {/* Fusion Rifle Card */}
                <Link
                    href="/endgame-analysis/tier-lists/fusions"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Fusion Rifles
                    </h1>
                </Link>

                {/* Rocket Sidearm Card */}
                <Link
                    href="/endgame-analysis/tier-lists/rocket-sidearms"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Rocket Sidearms
                    </h1>
                </Link>

                {/* Sniper Rifle Card */}
                <Link
                    href="/endgame-analysis/tier-lists/sniper-rifles"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Sniper Rifles
                    </h1>
                </Link>

                {/* Shotgun Card */}
                <Link
                    href="/endgame-analysis/tier-lists/shotguns"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Shotguns
                    </h1>
                </Link>

                {/* Trace Rifle Card */}
                <Link
                    href="/endgame-analysis/tier-lists/trace-rifles"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <h1 className="mt-4 text-xl font-semibold">
                        Trace Rifles
                    </h1>
                </Link>
            </div>
        </main>
    )
}
