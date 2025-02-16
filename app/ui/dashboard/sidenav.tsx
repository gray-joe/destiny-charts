import Link from 'next/link'
import NavLinks from '@/app/ui/dashboard/nav-links'
import DestinyChartsLogo from '@/app/ui/destiny-charts-logo'

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-primary-dark overflow-y-auto">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary-dark p-4 md:h-40 hover:bg-primary-hover shrink-0"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <DestinyChartsLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 min-h-0">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-primary-light md:block"></div>
      </div>
    </div>
  )
}
