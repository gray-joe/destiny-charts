import AbilitiesTable from '@/app/ui/abilities/table'
import { fetchAbilitiesData } from '@/app/lib/data'

export default async function Page() {
    const data = await fetchAbilitiesData()

    return (
        <>
            <AbilitiesTable data={data} />
        </>
    )
}
