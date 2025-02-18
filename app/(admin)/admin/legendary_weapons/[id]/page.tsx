import { fetchLegendaryWeapon } from '@/app/lib/data'
import { updateWeaponIconUrl } from '@/app/lib/admin-actions'
import Image from 'next/image'

type Params = Promise<{
  id: string
}>

export default async function EditWeaponPage({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const weapon = await fetchLegendaryWeapon(id)

  return (
    <div className="w-full">
      <h1 className="text-2xl text-white mb-8">
        Weapon Details: {weapon.name}
      </h1>
      <div className="bg-primary-dark rounded-lg p-6 mb-6">
        <div className="flex items-start gap-6">
          {weapon.icon_url && (
            <div className="w-24 h-24 flex-shrink-0">
              <Image
                src={weapon.icon_url}
                alt={weapon.name}
                width={96}
                height={96}
                className="rounded-lg"
              />
            </div>
          )}

          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Name</p>
                <p className="text-white">{weapon.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Type</p>
                <p className="text-white">{weapon.type}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <form
            action={async (formData: FormData) => {
              'use server'
              const iconUrl = formData.get('icon_url') as string
              await updateWeaponIconUrl(id, iconUrl)
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="icon_url"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Icon URL
              </label>
              <input
                type="text"
                id="icon_url"
                name="icon_url"
                defaultValue={weapon.icon_url || ''}
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter icon URL"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Icon URL
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
