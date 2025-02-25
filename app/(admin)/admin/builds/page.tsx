import { fetchBuilds } from '@/app/lib/data'
import Link from 'next/link'
import Image from 'next/image'

export default async function BuildsPage() {
  const builds = await fetchBuilds()

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-8">
        <h1 className="text-2xl text-white">Builds</h1>
        <Link
          href="/admin/builds/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Build
        </Link>
      </div>
      
      <div className="grid gap-6">
        {builds.map((build) => (
          <div key={build.id} className="bg-primary-dark rounded-lg p-6">
            <div className="flex items-start gap-6">
              {build.background_image && (
                <div className="w-24 h-24 flex-shrink-0">
                  <Image
                    src={build.background_image}
                    alt={build.name || 'Build background'}
                    width={96}
                    height={96}
                    className="rounded-lg"
                  />
                </div>
              )}

              <div className="flex-grow">
                <h2 className="text-xl text-white mb-2">{build.name}</h2>
                <p className="text-gray-400 mb-4">{build.description}</p>
                <div className="flex gap-4">
                  <div className="text-sm text-gray-400">
                    <span className="font-medium">Class:</span> {build.class}
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="font-medium">Subclass:</span>{' '}
                    {build.subclass}
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href={`/admin/builds/${build.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
