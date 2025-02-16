'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  MainActivity,
  SubActivity,
} from '@/app/lib/activity-data'

export default function FilterBar({
  activities,
}: {
  activities: MainActivity[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedActivity, setSelectedActivity] = useState(
    searchParams.get('activity') || ''
  )
  const [selectedSubActivity, setSelectedSubActivity] = useState(
    searchParams.get('subactivity') || ''
  )
  const [selectedEncounter, setSelectedEncounter] = useState(
    searchParams.get('encounter') || ''
  )

  // Find the currently selected activity and subactivity objects
  const currentActivity = activities.find((a) => a.id === selectedActivity) as
    | MainActivity
    | undefined
  const currentSubActivity = currentActivity?.subActivities?.find(
    (sa) => sa.id === selectedSubActivity
  ) as SubActivity | undefined

  const updateFilters = (
    activity?: string,
    subactivity?: string,
    encounter?: string
  ) => {
    const params = new URLSearchParams()
    if (activity) params.set('activity', activity)
    if (subactivity) params.set('subactivity', subactivity)
    if (encounter) params.set('encounter', encounter)

    router.push(`/builds?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-4 bg-primary-light p-4 rounded-lg">
      {/* Activity Select */}
      <select
        value={selectedActivity}
        onChange={(e) => {
          const newActivity = e.target.value
          setSelectedActivity(newActivity)
          setSelectedSubActivity('')
          setSelectedEncounter('')
          updateFilters(newActivity)
        }}
        className="rounded-md border-gray-300 bg-white text-gray-900 px-3 py-2"
      >
        <option value="">All Activities</option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.name}
          </option>
        ))}
      </select>

      {/* Sub-Activity Select (shown only when activity is selected) */}
      {currentActivity?.subActivities && (
        <select
          value={selectedSubActivity}
          onChange={(e) => {
            const newSubActivity = e.target.value
            setSelectedSubActivity(newSubActivity)
            setSelectedEncounter('')
            updateFilters(selectedActivity, newSubActivity)
          }}
          className="rounded-md border-gray-300 bg-white text-gray-900 px-3 py-2"
        >
          <option value="">All {currentActivity.name}</option>
          {currentActivity.subActivities.map((subActivity) => (
            <option key={subActivity.id} value={subActivity.id}>
              {subActivity.name}
            </option>
          ))}
        </select>
      )}

      {/* Encounter Select (shown only when subactivity is selected) */}
      {currentSubActivity?.subActivities && (
        <select
          value={selectedEncounter}
          onChange={(e) => {
            const newEncounter = e.target.value
            setSelectedEncounter(newEncounter)
            updateFilters(selectedActivity, selectedSubActivity, newEncounter)
          }}
          className="rounded-md border-gray-300 bg-white text-gray-900 px-3 py-2"
        >
          <option value="">All {currentSubActivity.name}</option>
          {currentSubActivity.subActivities.map((encounter) => (
            <option key={encounter.id} value={encounter.id}>
              {encounter.name}
            </option>
          ))}
        </select>
      )}

      {/* Clear Filters Button (shown only when filters are active) */}
      {(selectedActivity || selectedSubActivity || selectedEncounter) && (
        <button
          onClick={() => {
            setSelectedActivity('')
            setSelectedSubActivity('')
            setSelectedEncounter('')
            router.push('/builds')
          }}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
