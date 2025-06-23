import { updateExoticArmor } from '@/app/lib/admin-actions'
import { redirect } from 'next/navigation'

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const icon_url = formData.get('icon_url') as string
    const description = formData.get('description') as string
    const ad_clear = formData.get('ad_clear') ? parseInt(formData.get('ad_clear') as string) : undefined
    const champions = formData.get('champions') ? parseInt(formData.get('champions') as string) : undefined
    const survivability = formData.get('survivability') ? parseInt(formData.get('survivability') as string) : undefined
    const movement = formData.get('movement') ? parseInt(formData.get('movement') as string) : undefined
    const dps = formData.get('dps') ? parseInt(formData.get('dps') as string) : undefined
    const support = formData.get('support') ? parseInt(formData.get('support') as string) : undefined

    if (!name || !icon_url) {
        throw new Error('Name and icon URL are required')
    }

    await updateExoticArmor(
        id, 
        name, 
        icon_url, 
        description,
        ad_clear,
        champions,
        survivability,
        movement,
        dps,
        support
    )
    redirect('/admin/exotic-armor')
} 