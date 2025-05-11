import { fetchBuilds, fetchActivities } from '@/app/lib/data'
import BuildCard from '@/app/ui/builds/card'
import { Build } from '@/app/lib/definitions'
import FilterBar from '@/app/ui/builds/filter-bar'
import { Suspense } from 'react'

type SearchParams = Promise<{
    activity?: string
    subactivity?: string
    encounter?: string
}>

export default async function Page({
    searchParams,
}: {
    searchParams: SearchParams
}) {
    const resolvedSearchParams = await searchParams
    const [builds, activities] = await Promise.all([
        fetchBuilds(),
        fetchActivities(),
    ])

    const filteredBuilds = builds.filter((build) => {
        if (!build.activities || build.activities.length === 0) return false

        const buildActivities = build.activities
            .map((activity) => {
                try {
                    const parsed = JSON.parse(activity as unknown as string)
                    return parsed
                } catch (error) {
                    console.error('Error parsing activity:', activity)
                    console.error(error)
                    return null
                }
            })
            .filter(Boolean)

        let activityTypeToMatch = resolvedSearchParams?.activity
        if (activityTypeToMatch) {
            const activity = activities.find(
                (activity) => activity.id === activityTypeToMatch
            )
            if (activity) {
                activityTypeToMatch = activity.name
            }
        }

        let subActivityToMatch = resolvedSearchParams?.subactivity
        if (subActivityToMatch) {
            const mainActivity = activities.find(
                (activity) => activity.id === resolvedSearchParams?.activity
            )
            if (mainActivity) {
                const subActivity = mainActivity.subActivities?.find(
                    (subActivity) => subActivity.id === subActivityToMatch
                )
                if (subActivity) {
                    subActivityToMatch = subActivity.name
                }
            }
        }

        let encounterToMatch = resolvedSearchParams?.encounter
        if (encounterToMatch) {
            const mainActivity = activities.find(
                (activity) => activity.id === resolvedSearchParams?.activity
            )
            if (mainActivity) {
                const subActivity = mainActivity.subActivities?.find(
                    (subActivity) =>
                        subActivity.id === resolvedSearchParams?.subactivity
                )
                if (subActivity) {
                    const encounter = subActivity.subActivities?.find(
                        (e) => e.id === encounterToMatch
                    )
                    if (encounter) {
                        encounterToMatch = encounter.name
                    }
                }
            }
        }

        const activityMatch =
            !activityTypeToMatch ||
            buildActivities.some((buildActivity) => {
                const activityType = buildActivity.type.toLowerCase()
                const searchActivity = activityTypeToMatch?.toLowerCase()
                return (
                    activityType === searchActivity ||
                    activityType === searchActivity?.slice(0, -1) ||
                    `${activityType}s` === searchActivity ||
                    activityType === searchActivity?.replace(/-/g, ' ') ||
                    activityType.replace(/\s+/g, '-') === searchActivity
                )
            })

        const subActivityMatch =
            !subActivityToMatch ||
            buildActivities.some((buildActivity) => {
                const activityName = buildActivity.name.toLowerCase()
                const searchSubActivity = subActivityToMatch?.toLowerCase()
                return (
                    activityName === searchSubActivity ||
                    activityName === searchSubActivity?.replace(/-/g, ' ') ||
                    activityName.replace(/\s+/g, '-') === searchSubActivity
                )
            })

        const encounterMatch =
            !encounterToMatch ||
            buildActivities.some((buildActivity) => {
                const activityName = buildActivity.name.toLowerCase()
                const searchEncounter = encounterToMatch?.toLowerCase()
                return (
                    activityName === searchEncounter ||
                    activityName === searchEncounter?.replace(/-/g, ' ') ||
                    activityName.replace(/\s+/g, '-') === searchEncounter ||
                    activityName.includes(searchEncounter || '')
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
