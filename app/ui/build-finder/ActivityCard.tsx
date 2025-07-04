import Link from 'next/link'
import Image from 'next/image'

interface ActivityCardProps {
    id: string
    name: string
    imageUrl: string
    iconUrl: string
    parentId?: string
    subActivities?: {
        id: string
        name: string
    }[]
}

export function ActivityCard({
    id,
    name,
    imageUrl,
    parentId,
    subActivities,
}: ActivityCardProps) {
    const buildPath = parentId ? `${parentId}/${id}` : id

    const buildQueryParams = (() => {
        if (!parentId) {
            return `activity=${id}`
        }

        const [mainActivity, subActivity] = parentId.split('/')
        if (subActivity) {
            return `activity=${mainActivity}&subactivity=${subActivity}&encounter=${id}`
        }

        return `activity=${parentId}&subactivity=${id}`
    })()

    return (
        <div className="relative group">
            <div className="bg-primary-light hover:bg-primary rounded-lg overflow-hidden shadow-lg transition-colors">
                <div className="relative h-48 w-full">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">
                        {name}
                    </h3>
                    <div className="flex gap-2">
                        {/* View builds for this activity directly */}
                        <Link
                            href={`/builds?${buildQueryParams}`}
                            className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                            View Builds
                        </Link>

                        {/* Show sub-activities if they exist */}
                        {subActivities && subActivities.length > 0 && (
                            <Link
                                href={`/build-finder/${buildPath}`}
                                className="inline-block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                            >
                                Refine Search
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
