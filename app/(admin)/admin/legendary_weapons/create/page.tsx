import { createBuild } from '@/app/lib/admin-actions'
import { redirect } from 'next/navigation'

export default function CreateBuildPage() {
  async function create(formData: FormData) {
    'use server'
    const result = await createBuild(formData)
    if (result.success) {
      redirect(`/admin/builds/${result.id}`)
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl text-white mb-8">Create New Build</h1>
      <div className="bg-primary-dark rounded-lg p-6">
        <form action={create}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter build name"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter build description"
              />
            </div>

            <div>
              <label htmlFor="background_image" className="block text-sm font-medium text-gray-400 mb-2">
                Background Image URL
              </label>
              <input
                type="text"
                id="background_image"
                name="background_image"
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter background image URL"
              />
            </div>

            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-400 mb-2">
                Class
              </label>
              <select
                id="class"
                name="class"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a class</option>
                <option value="Hunter">Hunter</option>
                <option value="Titan">Titan</option>
                <option value="Warlock">Warlock</option>
              </select>
            </div>

            <div>
              <label htmlFor="subclass" className="block text-sm font-medium text-gray-400 mb-2">
                Subclass
              </label>
              <select
                id="subclass"
                name="subclass"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a subclass</option>
                <option value="Arc">Arc</option>
                <option value="Solar">Solar</option>
                <option value="Void">Void</option>
                <option value="Stasis">Stasis</option>
                <option value="Strand">Strand</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Build
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}