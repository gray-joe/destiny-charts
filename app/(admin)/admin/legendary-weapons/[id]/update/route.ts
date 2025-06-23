import { updateLegendaryWeapon } from '@/app/lib/admin-actions'
import { redirect } from 'next/navigation'

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const formData = await request.formData()
    
    await updateLegendaryWeapon(id, formData)
    redirect('/admin/legendary-weapons')
} 