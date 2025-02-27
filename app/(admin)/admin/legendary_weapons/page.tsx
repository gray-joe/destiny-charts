import { fetchLegendaryWeapons } from '@/app/lib/data'
import WeaponsTable from '@/app/ui/admin/weapons-table'
import { Pagination } from '@/app/ui/admin/pagination'

type SearchParams = Promise<{
  page?: number
}>

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const resolvedSearchParams = await searchParams
  const currentPage = Number(resolvedSearchParams?.page) || 1

  const { weapons, total } = await fetchLegendaryWeapons(currentPage, 10)
  const totalPages = Math.ceil(total / 10)

  return (
    <>
      <h1>Legendary Weapons</h1>
      <WeaponsTable weapons={weapons} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  )
}
