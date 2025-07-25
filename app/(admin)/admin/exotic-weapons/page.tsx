import { fetchExoticWeapons } from '@/app/lib/data'
import WeaponsTable from '@/app/ui/admin/WeaponsTable'
import { Pagination } from '@/app/ui/admin/Pagination'
import Search from '@/app/ui/admin/Search'
import Link from 'next/link'

type SearchParams = Promise<{
    page?: number
    query?: string
}>

export default async function Page({
    searchParams,
}: {
    searchParams: SearchParams
}) {
    const resolvedSearchParams = await searchParams
    const currentPage = Number(resolvedSearchParams?.page) || 1
    const query = resolvedSearchParams?.query || ''

    const { weapons, total } = await fetchExoticWeapons(
        currentPage,
        10,
        query
    )
    const totalPages = Math.ceil(total / 10)

    return (
        <>
            <div className="flex items-center justify-between gap-2 mb-8">
                <h1>Exotic Weapons</h1>
                <div className="flex items-center gap-4">
                    <Search placeholder="Search weapons..." />
                    <Link
                        href="/admin/exotic-weapons/create"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Create Weapon
                    </Link>
                </div>
            </div>
            <WeaponsTable weapons={weapons} basePath="/admin/exotic-weapons" />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
        </>
    )
}
