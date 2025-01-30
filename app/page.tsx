import DestinyChartsLogo from '@/app/ui/destiny-charts-logo';
import { ChartBarIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* Header Banner */}
      <div className="flex flex-col items-center rounded-lg bg-primary-light p-6 md:p-12">
        <DestinyChartsLogo />
        <h1 className="mt-6 text-center text-2xl text-white md:text-4xl font-bold">
          Welcome to Destiny Charts
        </h1>
        <p className="mt-4 text-center text-lg text-white md:text-xl">
          Endgame PVE analysis and builds
        </p>
      </div>

      {/* Cards Container */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Dashboard Card */}
        <Link 
          href="/dashboard" 
          className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
        >
          <ChartBarIcon className="h-16 w-16 text-blue-500" />
          <h2 className="mt-4 text-xl font-semibold">Endgame Analysis</h2>
          <p className="mt-2 text-center text-white">
            View DPS charts and weapon tier lists for endgame PVE content
          </p>
        </Link>

        {/* Builds Card */}
        <Link 
          href="/builds" 
          className="flex flex-col items-center rounded-lg bg-primary-light p-8 shadow-lg hover:bg-primary transition-colors"
        >
          <WrenchScrewdriverIcon className="h-16 w-16 text-blue-500" />
          <h2 className="mt-4 text-xl font-semibold">Build Crafting</h2>
          <p className="mt-2 text-center text-white">
            Explore optimized builds for different activities and playstyles
          </p>
        </Link>
      </div>
    </main>
  );
}
