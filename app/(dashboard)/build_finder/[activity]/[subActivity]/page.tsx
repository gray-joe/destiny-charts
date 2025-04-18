import { ActivityCard } from '@/app/ui/build_finder/activity-card'
import { fetchActivities } from '@/app/lib/data'
import type {
  MainActivity,
  SubActivity,
} from '@/app/lib/definitions'
import Link from 'next/link'

type Params = Promise<{
  activity: string
  subActivity: string
}>

export default async function SubSubActivityPage({
  params,
}: {
  params: Params
}) {
  const resolvedParams = await params
  const activities = await fetchActivities()

  const activity = activities.find((activity) => activity.id === resolvedParams.activity) as
    | MainActivity
    | undefined
  const subActivity = activity?.subActivities?.find(
    (subActivity) =>
      subActivity.id.toLowerCase() ===
      decodeURIComponent(resolvedParams.subActivity).toLowerCase()
  ) as SubActivity | undefined

  if (!activity || !subActivity) {
    return <div>Activity not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href={`/build_finder/${activity.id}`}
          className="text-primary hover:text-primary-dark"
        >
          ← Back to {activity.name}
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">{subActivity.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subActivity.subActivities?.map((encounter) => (
          <ActivityCard
            key={encounter.id}
            id={encounter.id}
            name={encounter.name}
            imageUrl={encounter.imageUrl || ''}
            iconUrl={encounter.iconUrl || ''}
            parentId={`${activity.id}/${subActivity.id}`}
          />
        ))}
      </div>
    </div>
  )
}
