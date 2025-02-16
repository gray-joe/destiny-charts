import { ChartBarIcon } from '@heroicons/react/24/outline'
import { lusitana } from '@/app/ui/fonts'

export default function DestinyChartsLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white bg-blue-1000 p-2 rounded`}
    >
      <ChartBarIcon className="h-12 w-12 mr-4" />
      <p className="text-[32px] ">Destiny Charts</p>
    </div>
  )
}
