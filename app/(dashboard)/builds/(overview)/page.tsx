import { fetchBuilds } from '@/app/lib/data'
import BuildCard from '@/app/ui/builds/card'
import { Build } from '@/app/lib/definitions'
import { activities } from '@/app/lib/activity-data'
import FilterBar from '@/app/ui/builds/filter-bar'
import { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    activity?: string
    subactivity?: string
    encounter?: string
  }
}) {
  const builds = await fetchBuilds()

  // Filter builds based on URL parameters
  const filteredBuilds = builds.filter((build) => {
    if (!build.activities || build.activities.length === 0) return false

    // Parse the activities array of JSON strings
    const buildActivities = build.activities
      .map((activity) => {
        try {
          return JSON.parse(activity)
        } catch (e) {
          console.error('Error parsing activity:', activity)
          return null
        }
      })
      .filter(Boolean)

    // Check if any of the build's activities match the filters
    const activityMatch =
      !searchParams?.activity ||
      buildActivities.some((buildActivity) => {
        const activityType = buildActivity.type.toLowerCase()
        return activityType === searchParams.activity?.toLowerCase()
      })

    const subActivityMatch =
      !searchParams?.subactivity ||
      buildActivities.some((buildActivity) => {
        const activityName = buildActivity.name.toLowerCase()
        return activityName === searchParams.subactivity?.toLowerCase()
      })

    const encounterMatch =
      !searchParams?.encounter ||
      buildActivities.some((buildActivity) => {
        const activityName = buildActivity.name.toLowerCase()
        return activityName.includes(
          searchParams.encounter?.toLowerCase() || ''
        )
      })

    return activityMatch && subActivityMatch && encounterMatch
  })

  return (
    <div className="space-y-6 p-6">
      <Suspense>
        <FilterBar activities={activities} />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuilds.map((build: Build) => (
          <div key={build.id}>
            <BuildCard data={build} />
          </div>
        ))}
      </div>
    </div>
  )
}
