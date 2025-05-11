import { fetchBuildById } from '@/app/lib/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { lusitana } from '@/app/ui/fonts'
import { Aspect, Fragment } from '@/app/lib/definitions'

type Params = Promise<{
    build: string
}>

export default async function BuildPage({ params }: { params: Params }) {
    const resolvedParams = await params
    const build = await fetchBuildById(resolvedParams.build)

    if (!build) {
        notFound()
    }

    const exoticArmor = build.exotic_armor
        ? JSON.parse(build.exotic_armor)
        : null
    const exoticWeapon = build.exotic_weapon
        ? JSON.parse(build.exotic_weapon)
        : null
    const legendaryWeapons = build.legendary_weapons
        ? build.legendary_weapons.split(',').map((w: string) => w.trim())
        : []
    const superAbility = build.super_ability?.[0]
        ? JSON.parse(build.super_ability[0])
        : null

    const aspects = build.aspects
        ? build.aspects.map((aspect: string) => JSON.parse(aspect))
        : []
    const fragments = build.fragments
        ? build.fragments.map((fragment: string) => JSON.parse(fragment))
        : []

    return (
        <div className="flex flex-col md:flex-row gap-8 p-6">
            {/* Left Column - Background Image */}
            <div className="md:w-1/3">
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                    {build.background_image ? (
                        <Image
                            src={build.background_image}
                            alt={build.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-primary-dark" />
                    )}
                </div>
            </div>

            {/* Right Column - Build Details */}
            <div className="md:w-2/3 space-y-8">
                {/* Header Section */}
                <div>
                    <h1
                        className={`${lusitana.className} text-3xl font-bold text-white mb-2`}
                    >
                        {build.name}
                    </h1>
                    <p className="text-white text-lg">
                        {build.class} • {build.subclass}
                    </p>
                </div>

                {/* Activities Section */}
                <div className="bg-primary-dark rounded-lg p-6">
                    <h2 className="text-sm font-medium text-gray-400 mb-4">
                        Recommended Activities
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {build.activities.map(
                            (activity: string, index: number) => {
                                const parsedActivity = JSON.parse(activity)
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-primary-dark/50 shrink-0">
                                            <Image
                                                src={parsedActivity.icon_url}
                                                alt={parsedActivity.name}
                                                fill
                                                sizes="40px"
                                                className="object-cover p-1"
                                            />
                                        </div>
                                        <span className="text-white text-sm truncate">
                                            {parsedActivity.name}
                                        </span>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>

                {/* Subclass Details */}
                <div className="bg-primary-dark rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Super Ability */}
                        {superAbility && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 mb-4">
                                    Super Ability
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-dark/50">
                                        <Image
                                            src={superAbility.icon_url}
                                            alt={`Super: ${superAbility.name}`}
                                            fill
                                            sizes="48px"
                                            className="object-cover p-1"
                                        />
                                    </div>
                                    <span className="text-white text-sm">
                                        {superAbility.name}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Aspects */}
                        {aspects.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 mb-4">
                                    Aspects
                                </h3>
                                <div className="space-y-3">
                                    {aspects.map(
                                        (aspect: Aspect, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-dark/50">
                                                    <Image
                                                        src={aspect.icon_url}
                                                        alt={aspect.name}
                                                        fill
                                                        sizes="48px"
                                                        className="object-cover p-1"
                                                    />
                                                </div>
                                                <span className="text-white text-sm">
                                                    {aspect.name}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Fragments */}
                        {fragments.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 mb-4">
                                    Fragments
                                </h3>
                                <div className="space-y-3">
                                    {fragments.map(
                                        (fragment: Fragment, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-dark/50">
                                                    <Image
                                                        src={fragment.icon_url}
                                                        alt={fragment.name}
                                                        fill
                                                        sizes="48px"
                                                        className="object-cover p-1"
                                                    />
                                                </div>
                                                <span className="text-white text-sm">
                                                    {fragment.name}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Exotic Equipment */}
                <div className="bg-primary-dark rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Exotic Armor */}
                        {exoticArmor && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 mb-4">
                                    Exotic Armor
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-dark/50">
                                        <Image
                                            src={exoticArmor.icon_url}
                                            alt={`Exotic Armor: ${exoticArmor.name}`}
                                            fill
                                            sizes="48px"
                                            className="object-cover p-1"
                                        />
                                    </div>
                                    <span className="text-white text-sm">
                                        {exoticArmor.name}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Exotic Weapon */}
                        {exoticWeapon && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 mb-4">
                                    Exotic Weapon
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-dark/50">
                                        <Image
                                            src={exoticWeapon.icon_url}
                                            alt={`Exotic Weapon: ${exoticWeapon.name}`}
                                            fill
                                            sizes="48px"
                                            className="object-cover p-1"
                                        />
                                    </div>
                                    <span className="text-white text-sm">
                                        {exoticWeapon.name}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Equipment Section */}
                <section>
                    {/* Legendary Weapons */}
                    {legendaryWeapons.length > 0 && (
                        <div>
                            <h3 className="text-white font-semibold mb-2">
                                Recommended Legendary Weapons
                            </h3>
                            <ul className="list-disc list-inside text-white">
                                {legendaryWeapons.map(
                                    (weapon: string, index: number) => (
                                        <li key={index}>{weapon}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
