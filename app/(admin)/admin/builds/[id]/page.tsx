import { fetchBuildById } from '@/app/lib/data'
import { updateBuild } from '@/app/lib/admin-actions'
import { fetchSubclasses } from '@/app/lib/data'
import Image from 'next/image'
import { revalidatePath } from 'next/cache'

type Params = Promise<{
  id: string
}>

export default async function EditBuildPage({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const build = await fetchBuildById(id)

  if (!build) {
    return <div>Build not found</div>
  }

  const classes = ['Hunter', 'Titan', 'Warlock']
  const subclasses = (await fetchSubclasses()).map((subclass) => subclass.name)

  return (
    <div className="w-full">
      <h1 className="text-2xl text-white mb-8">Build Details: {build.name}</h1>
      <div className="bg-primary-dark rounded-lg p-6 mb-6">
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
            <form
              action={async (formData: FormData) => {
                'use server'
                const name = formData.get('name') as string
                const description = formData.get('description') as string
                const background_image = formData.get(
                  'background_image'
                ) as string
                const class_name = formData.get('class') as string
                const subclass_name = formData.get('subclass') as string

                await updateBuild({
                  id,
                  name,
                  description,
                  background_image,
                  class: class_name,
                  subclass: subclass_name,
                  updated_at: '',
                  activities: [],
                  exotic_armor: [],
                  exotic_weapon: [],
                  legendary_weapons: '',
                  aspects: [],
                  fragments: [],
                  super_ability: [],
                })

                revalidatePath('/admin/builds')
                revalidatePath(`/admin/builds/${id}`)
              }}
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={build.name || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    defaultValue={build.description || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                    rows={4}
                  />
                </div>

                <div>
                  <label
                    htmlFor="background_image"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Background Image URL
                  </label>
                  <input
                    type="text"
                    id="background_image"
                    name="background_image"
                    defaultValue={build.background_image || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Class
                  </label>
                  <select
                    id="class"
                    name="class"
                    defaultValue={build.class || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select a class</option>
                    {classes.map((className) => (
                      <option key={className} value={className}>
                        {className}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subclass"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Subclass
                  </label>
                  <select
                    id="subclass"
                    name="subclass"
                    defaultValue={build.subclass || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select a subclass</option>
                    {subclasses.map((subclassName) => (
                      <option key={subclassName} value={subclassName}>
                        {subclassName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Build
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
