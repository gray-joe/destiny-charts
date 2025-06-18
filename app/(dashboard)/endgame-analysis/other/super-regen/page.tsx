import OverTimeGraph from '@/app/ui/graph/GraphOverTime'
import { fetchSuperRegenList } from '@/app/lib/data'

export default async function Page() {
    const data = await fetchSuperRegenList()

    return (
        <div>
            <OverTimeGraph
                data={data.map((point) => ({
                    'Time (s)': point.time,
                    ...point,
                }))}
            />
        </div>
    )
}
