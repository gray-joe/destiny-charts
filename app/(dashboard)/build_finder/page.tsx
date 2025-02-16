import { ActivityCard } from '@/app/ui/build_finder/activity-card'
import { activities } from '@/app/lib/activity-data'

export default function BuildFinder() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Build</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            name={activity.name}
            description={activity.description}
            imageUrl={activity.imageUrl}
            subActivities={activity.subActivities}
          />
        ))}
      </div>
    </div>
  )
}
