import BossDamageTable from '@/app/ui/boss-damage-table/Table'
import { fetchSustainedBossDamageData } from '@/app/lib/data'

export default async function Page() {
    const data = await fetchSustainedBossDamageData()

    return (
        <>
            <BossDamageTable data={data} />
        </>
    )
}
