import { navigateToEdit, navigateToCreate } from '@/app/lib/admin-actions'

export function CreateWeapon() {
    return (
        <form action={navigateToCreate}>
            <button className="rounded-md bg-primary-light px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover">
                Add Weapon
            </button>
        </form>
    )
}

export function WeaponActions({ id }: { id: string }) {
    return (
        <div className="flex justify-end gap-2">
            <form action={navigateToEdit}>
                <input type="hidden" name="id" value={id} />
                <button className="rounded-md bg-primary-light px-3 py-1 text-sm font-medium text-white hover:bg-primary-hover">
                    Edit
                </button>
            </form>
        </div>
    )
}
