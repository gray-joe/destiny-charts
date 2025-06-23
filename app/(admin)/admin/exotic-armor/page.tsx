import { fetchExoticArmorWithTierList } from '@/app/lib/data'
import ExoticArmorTable from '@/app/ui/admin/ExoticArmorTable'
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

    const { armor, total } = await fetchExoticArmorWithTierList(
        currentPage,
        10,
        query
    )
    const totalPages = Math.ceil(total / 10)

    return (
        <>
            <div className="flex items-center justify-between gap-2 mb-8">
                <h1>Exotic Armor</h1>
                <div className="flex items-center gap-4">
                    <Search placeholder="Search armor..." />
                    <Link
                        href="/admin/exotic-armor/create"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Create Armor
                    </Link>
                </div>
            </div>
            <ExoticArmorTable armor={armor} basePath="/admin/exotic-armor" />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
        </>
    )
} 