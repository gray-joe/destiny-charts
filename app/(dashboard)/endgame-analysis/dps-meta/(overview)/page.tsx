import { lusitana } from '@/app/ui/fonts'
import Link from 'next/link'
import {
    BoltIcon,
    ChevronDoubleRightIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline'

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Endgame Analysis
            </h1>

            {/* Cards Container */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Abilities Card */}
                <Link
                    href="/endgame-analysis/dps-meta/abilities"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <BoltIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">
                        Abilities
                    </h2>
                    <p className="mt-2 text-center text-white">
                        View DPS table for each ability
                    </p>
                </Link>

                {/* Sustained DPS Card */}
                <Link
                    href="/endgame-analysis/dps-meta/sustained"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <ChevronRightIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">
                        Sustained DPS Meta
                    </h2>
                    <p className="mt-2 text-center text-white">
                        View the sustained DPS table for each weapon
                    </p>
                </Link>

                {/* Swap DPS Card */}
                <Link
                    href="/endgame-analysis/dps-meta/swap"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <ChevronDoubleRightIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">
                        Swap DPS Meta
                    </h2>
                    <p className="mt-2 text-center text-white">
                        View the swap DPS table for each rotation
                    </p>
                </Link>
            </div>
        </main>
    )
}
