import DestinyChartsLogo from '@/app/ui/DestinyChartsLogo'
import {
    AcademicCapIcon,
    ChartBarIcon,
    ChatBubbleLeftIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col p-6">
            {/* Header Banner */}
            <div className="flex flex-col items-center rounded-lg bg-primary-light p-6 md:p-12">
                <DestinyChartsLogo />
                <p className="mt-4 text-center text-lg text-white md:text-xl">
                    Your go to place for in depth data, meta analysis and builds for all activities
                </p>
                <p className="mt-4 text-center text-lg text-blue-400 md:text-xl italic">
                    Currently updating with Edge of Fate data!
                </p>
            </div>

            {/* Cards Container */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Endgame Analysis Card */}
                <Link
                    href="/endgame-analysis"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <ChartBarIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">
                        Endgame Analysis
                    </h2>
                    <p className="mt-2 text-center text-white">
                        View DPS charts and weapon tier lists for endgame PVE
                        content
                    </p>
                </Link>

                {/* Builds Card */}
                <Link
                    href="/build-finder"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <WrenchScrewdriverIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">
                        Build Crafting
                    </h2>
                    <p className="mt-2 text-center text-white">
                        Find an optimized build for the activity you want to
                        play
                    </p>
                </Link>

                {/* AI Assistant Card */}
                <Link
                    href="/chat"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <ChatBubbleLeftIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">AI Assistant</h2>
                    <p className="mt-2 text-center text-white">
                        Got a specific question? Ask our AI assistant!
                    </p>
                </Link>

                {/* Core Mechanics Breakdown Card */}
                <Link
                    href="/core"
                    className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
                >
                    <AcademicCapIcon className="h-16 w-16 text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">
                        Core Game Data
                    </h2>
                    <p className="mt-2 text-center text-white">
                        Find more in depth info on items like Artifact perks,
                        Aspects & Fragments, Exotic Gear and more
                    </p>
                </Link>
            </div>
        </main>
    )
}
