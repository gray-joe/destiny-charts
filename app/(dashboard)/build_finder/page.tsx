import { ActivityCard } from '@/app/ui/build_finder/activity-card'
import { fetchActivities } from '@/app/lib/data'

export default async function BuildFinder() {
  const activities = await fetchActivities()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Build</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            name={activity.name}
            imageUrl={activity.imageUrl || ''}
            iconUrl={activity.iconUrl || ''}
            subActivities={activity.subActivities}
          />
        ))}
      </div>
    </div>
  )
}
