'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Build } from '@/app/lib/definitions'

export default function BuildCard({ data }: { data: Build }) {
    const exoticArmor = data.exotic_armor
        ? JSON.parse(data.exotic_armor as unknown as string)
        : null
    const exoticWeapon = data.exotic_weapon
        ? JSON.parse(data.exotic_weapon as unknown as string)
        : null
    const superAbility = data.super_ability?.[0]
        ? JSON.parse(data.super_ability[0] as string)
        : null

    return (
        <Link href={`/builds/${data.id}`}>
            <div className="relative w-[300px] h-[400px] rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-200">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    {data.background_image ? (
                        <Image
                            src={data.background_image}
                            alt={data.name}
                            fill
                            sizes="(max-width: 300px) 100vw, 300px"
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-primary-dark" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-4">
                    {/* Header */}
                    <div>
                        <span className="inline-block px-2 py-1 rounded bg-primary-dark/80 text-sm font-medium text-white">
                            {data.class}
                        </span>
                        <h2 className="text-xl font-bold text-white mt-2">
                            {data.name}
                        </h2>
                    </div>

                    {/* Icons Footer */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-4">
                            {/* Ability Icon */}
                            {superAbility?.icon_url && (
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-dark/50">
                                    <Image
                                        src={superAbility.icon_url}
                                        alt={`Ability: ${superAbility.name}`}
                                        fill
                                        sizes="48px"
                                        className="object-cover p-1"
                                    />
                                </div>
                            )}
                            {/* Exotic Armor Icon */}
                            {exoticArmor?.icon_url && (
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-dark/50">
                                    <Image
                                        src={exoticArmor.icon_url}
                                        alt={`Exotic Armor: ${exoticArmor.name}`}
                                        fill
                                        sizes="48px"
                                        className="object-cover p-1"
                                    />
                                </div>
                            )}
                            {/* Exotic Weapon Icon */}
                            {exoticWeapon?.icon_url && (
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-dark/50">
                                    <Image
                                        src={exoticWeapon.icon_url}
                                        alt={`Exotic Weapon: ${exoticWeapon.name}`}
                                        fill
                                        sizes="48px"
                                        className="object-cover p-1"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
        </Link>
    )
}
