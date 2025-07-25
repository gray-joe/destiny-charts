import { fetchTierList, fetchExoticTierList, fetchExoticArmorTierList } from '@/app/lib/data'
import WeaponsTable from '@/app/ui/weapons-tier-list/Table'
import ExoticTable from '@/app/ui/exotic-tier-list/Table'
import { notFound } from 'next/navigation'

const weaponTypes = {
    'exotic-weapons': {
        type: 'Exotic Weapon',
        display: 'Exotic Weapons',
    },
    'exotic-armor': {
        type: 'Exotic Armor',
        display: 'Exotic Armor',
    },
    lfrs: {
        type: 'Linear Fusion Rifle',
        display: 'Linear Fusion Rifles',
    },
    shotguns: {
        type: 'Shotgun',
        display: 'Shotguns',
    },
    'heavy-gls': {
        type: 'Heavy Grenade Launcher',
        display: 'Heavy Grenade Launchers',
    },
    'rocket-sidearms': {
        type: 'Rocket Sidearm',
        display: 'Rocket Sidearms',
    },
    'rocket-launchers': {
        type: 'Rocket Launcher',
        display: 'Rocket Launchers',
    },
    swords: {
        type: 'Sword',
        display: 'Swords',
    },
    'breach-gls': {
        type: 'Breach Grenade Launcher',
        display: 'Breach Grenade Launchers',
    },
    glaives: {
        type: 'Glaive',
        display: 'Glaives',
    },
    fusions: {
        type: 'Fusion Rifle',
        display: 'Fusion Rifles',
    },
    'trace-rifles': {
        type: 'Trace Rifle',
        display: 'Trace Rifles',
    },
    'sniper-rifles': {
        type: 'Sniper Rifle',
        display: 'Sniper Rifles',
    },
    mgs: {
        type: 'Machine Gun',
        display: 'Machine Guns',
    },
} as const

export interface PageProps {
    params: Promise<{ type: keyof typeof weaponTypes }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export function generateStaticParams() {
    const params = Object.keys(weaponTypes).map((type) => ({
        type,
    }))
    return params
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params

    const weaponType = weaponTypes[resolvedParams.type]

    if (!weaponType) {
        notFound()
    }

    if (resolvedParams.type === 'exotic-weapons') {
        const exotics = await fetchExoticTierList()
        
        return (
            <>
                <h1>{weaponType.display}</h1>
                <ExoticTable exotics={exotics} />
            </>
        )
    }

    if (resolvedParams.type === 'exotic-armor') {
        const exotics = await fetchExoticArmorTierList()
        
        return (
            <>
                <h1>{weaponType.display}</h1>
                <ExoticTable exotics={exotics} />
            </>
        )
    }

    const weapons = await fetchTierList(weaponType.type)

    return (
        <>
            <h1>{weaponType.display}</h1>
            <WeaponsTable weapons={weapons} />
        </>
    )
}
