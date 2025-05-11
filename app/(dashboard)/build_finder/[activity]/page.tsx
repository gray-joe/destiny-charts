import { ActivityCard } from '@/app/ui/build_finder/activity-card'
import { fetchActivities } from '@/app/lib/data'
import type { MainActivity } from '@/app/lib/definitions'
import Link from 'next/link'

type Params = Promise<{
    activity: string
    subActivity: string
}>

export default async function SubActivityPage({ params }: { params: Params }) {
    const resolvedParams = await params
    const activities = await fetchActivities()
    const activity = activities.find(
        (a) => a.id === resolvedParams.activity
    ) as MainActivity | undefined

    if (!activity) {
        return <div>Activity not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link
                    href="/build_finder"
                    className="text-primary hover:text-primary-dark"
                >
                    ← Back to Activities
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">{activity.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activity.subActivities?.map((subActivity) => (
                    <ActivityCard
                        key={subActivity.id}
                        id={subActivity.id}
                        name={subActivity.name}
                        imageUrl={subActivity.imageUrl || ''}
                        iconUrl={subActivity.iconUrl || ''}
                        parentId={activity.id}
                        subActivities={subActivity.subActivities}
                    />
                ))}
            </div>
        </div>
    )
}
