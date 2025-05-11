import { lusitana } from '@/app/ui/fonts'
import Link from 'next/link'
import {
    ChartBarIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Endgame Analysis
            </h1>

            {/* Cards Container */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Boss Damage Card */}
                <Link
                    href="/endgame_analysis/boss_dmg/abilities"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <ChartBarIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">
                        Boss Damage - Abilities
                    </h2>
                    <p className="mt-2 text-center text-white">
                        View Boss Damage DPS table for each ability
                    </p>
                </Link>

                {/* Builds Card */}
                <Link
                    href="/endgame_analysis/weapons/lfrs"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <WrenchScrewdriverIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">
                        LFR Tier List
                    </h2>
                    <p className="mt-2 text-center text-white">
                        View the tier list for Linear Fusion Rifles
                    </p>
                </Link>
            </div>
        </main>
    )
}
