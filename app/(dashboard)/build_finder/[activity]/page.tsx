import { ActivityCard } from '@/app/ui/build_finder/activity-card'
import { activities } from '@/app/lib/activity-data'
import type { MainActivity, SubActivity } from '@/app/lib/activity-data'
import Link from 'next/link'

type Params = Promise<{
  activity: string
  subActivity: string
}>

export default async function SubActivityPage({
  params,
}: {
  params: Params
}) {
  const resolvedParams = await params
  const activity = activities.find((a) => a.id === resolvedParams.activity) as
    | MainActivity
    | undefined

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
        {activity.subActivities?.map((subActivity: SubActivity) => (
          <ActivityCard
            key={subActivity.id}
            id={subActivity.id}
            parentId={activity.id}
            name={subActivity.name}
            description={subActivity.description || ''}
            imageUrl={`/images/activities/${activity.id}/${subActivity.id}.jpg`}
            subActivities={subActivity.subActivities}
          />
        ))}
      </div>
    </div>
  )
}
