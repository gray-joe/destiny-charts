import { lusitana } from '@/app/ui/fonts'
import Link from 'next/link'
import {
    ChartBarIcon,
    NumberedListIcon,
    FireIcon,
} from '@heroicons/react/24/outline'

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Endgame Analysis
            </h1>

            {/* Cards Container */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* DPS Meta Card */}
                <Link
                    href="/endgame-analysis/dps-meta"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <FireIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">
                        DPS Meta
                    </h2>
                    <p className="mt-2 text-center text-white">
                        View DPS meta information
                    </p>
                </Link>

                {/* Tier List Card */}
                <Link
                    href="/endgame-analysis/tier-lists"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <NumberedListIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">
                        Tier List
                    </h2>
                    <p className="mt-2 text-center text-white">
                        View the tier lists for each weapon type
                    </p>
                </Link>

                {/* Other Card */}
                <Link
                    href="/endgame-analysis/other"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <ChartBarIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">
                        Other
                    </h2>
                    <p className="mt-2 text-center text-white">
                        View other information that might be useful for endgame build crafting such as super regeneration stats
                    </p>
                </Link>
            </div>
        </main>
    )
}
