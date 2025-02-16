import { ActivityCard } from '@/app/ui/build_finder/activity-card'
import { activities } from '@/app/lib/activity-data'
import type {
  MainActivity,
  SubActivity,
  EncounterActivity,
} from '@/app/lib/activity-data'
import Link from 'next/link'

export default function SubSubActivityPage({
  params,
}: {
  params: {
    activity: string
    subActivity: string
  }
}) {
  const activity = activities.find((a) => a.id === params.activity) as
    | MainActivity
    | undefined
  const subActivity = activity?.subActivities?.find(
    (sa) =>
      sa.id.toLowerCase() ===
      decodeURIComponent(params.subActivity).toLowerCase()
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
        {subActivity.subActivities?.map((encounter: EncounterActivity) => (
          <ActivityCard
            key={encounter.id}
            id={encounter.id}
            parentId={`${activity.id}/${subActivity.id}`}
            name={encounter.name}
            description={encounter.description || ''}
            imageUrl={`/images/activities/${activity.id}/${subActivity.id}/${encounter.id}.jpg`}
            subActivities={encounter.subActivities}
          />
        ))}
      </div>
    </div>
  )
}
