import Image from 'next/image'
import {
    fetchSubclassVerbs,
    fetchGrenadeAbilities,
    fetchAspectsBySubclassAndClass,
    fetchMeleeAbilities,
    fetchFragmentsBySubclass,
    fetchSuperAbilitiesByClass,
    fetchClassAbilitiesByClass,
    fetchGrenadeAbilitiesByClass,
} from '@/app/lib/data'
import { Ability, Aspect, Fragment } from '@/app/lib/definitions'
import { ClassFilter } from '@/app/ui/dashboard/ClassFilter'
import { subclassBackgrounds } from '@/app/ui/dashboard/colors'
import { highlightText } from '@/app/lib/utils'

const sections = [
    {
        id: 'hunter',
        label: 'Hunter',
    },
    {
        id: 'titan',
        label: 'Titan',
    },
    {
        id: 'warlock',
        label: 'Warlock',
    },
] as const

type ClassLabel = (typeof sections)[number]['label']

export interface PageProps {
    params: Promise<{ subclass_type: string }>
}

async function SubclassPage({ subclass_type }: { subclass_type: string }) {
    const normalizedSubclassType =
        subclass_type.charAt(0).toUpperCase() +
        subclass_type.slice(1).toLowerCase()
    const subclassVerbs = await fetchSubclassVerbs(normalizedSubclassType)
    const isPrismatic = normalizedSubclassType === 'Prismatic'
    
    const grenadeAbilitiesByClass: Record<ClassLabel, Ability[]> = isPrismatic ? {
        Hunter: await fetchGrenadeAbilitiesByClass(normalizedSubclassType, 'Hunter'),
        Titan: await fetchGrenadeAbilitiesByClass(normalizedSubclassType, 'Titan'),
        Warlock: await fetchGrenadeAbilitiesByClass(normalizedSubclassType, 'Warlock'),
    } : {
        Hunter: [],
        Titan: [],
        Warlock: [],
    }
    
    const grenadeAbilities = isPrismatic ? [] : await fetchGrenadeAbilities(normalizedSubclassType)

    const aspectsByClass: Record<ClassLabel, Aspect[]> = {
        Hunter: await fetchAspectsBySubclassAndClass(
            normalizedSubclassType,
            'Hunter'
        ),
        Titan: await fetchAspectsBySubclassAndClass(
            normalizedSubclassType,
            'Titan'
        ),
        Warlock: await fetchAspectsBySubclassAndClass(
            normalizedSubclassType,
            'Warlock'
        ),
    }

    const meleeAbilitiesByClass: Record<ClassLabel, Ability[]> = {
        Hunter: await fetchMeleeAbilities(normalizedSubclassType, 'Hunter'),
        Titan: await fetchMeleeAbilities(normalizedSubclassType, 'Titan'),
        Warlock: await fetchMeleeAbilities(normalizedSubclassType, 'Warlock'),
    }

    const superAbilitiesByClass: Record<ClassLabel, Ability[]> = {
        Hunter: await fetchSuperAbilitiesByClass(normalizedSubclassType, 'Hunter'),
        Titan: await fetchSuperAbilitiesByClass(normalizedSubclassType, 'Titan'),
        Warlock: await fetchSuperAbilitiesByClass(normalizedSubclassType, 'Warlock'),
    }

    const classAbilitiesByClass: Record<ClassLabel, Ability[]> = {
        Hunter: await fetchClassAbilitiesByClass(normalizedSubclassType, 'Hunter'),
        Titan: await fetchClassAbilitiesByClass(normalizedSubclassType, 'Titan'),
        Warlock: await fetchClassAbilitiesByClass(normalizedSubclassType, 'Warlock'),
    }

    const fragments: Fragment[] = await fetchFragmentsBySubclass(normalizedSubclassType)

    const backgroundColor =
        subclassBackgrounds[
            normalizedSubclassType as keyof typeof subclassBackgrounds
        ] || '#232d2e'

    return (
        <main className="min-h-screen p-4 md:p-8" style={{ backgroundColor }}>
            {/* Subclass Verbs Table */}
            <div className="bg-[#1a2324] rounded-lg overflow-hidden border border-gray-700 mb-12">
                <div
                    className="flex border-b border-gray-700"
                    style={{ backgroundColor }}
                >
                    <div className="w-32 md:w-40 p-4"></div>
                    <div className="flex-1 p-4 text-center text-lg font-bold text-white">
                        Subclass Verbs
                    </div>
                </div>
                {subclassVerbs.map((row, idx) => (
                    <div
                        key={row.id}
                        className={`flex border-b border-gray-700 last:border-b-0`}
                        style={{
                            backgroundColor:
                                idx % 2 === 0 ? backgroundColor : '#1a2324',
                        }}
                    >
                        <div className="w-32 md:w-40 flex flex-col items-center justify-center p-4 border-r border-gray-700">
                            <div className="relative w-12 h-12 mb-2">
                                <Image
                                    src={row.icon_url}
                                    alt={row.name}
                                    fill
                                    sizes="48px"
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-base font-semibold text-white text-center">
                                {row.name}
                            </span>
                        </div>
                        <div className="flex-1 p-4 text-sm text-gray-200 whitespace-pre-line">
                            {highlightText(row.description)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Fragments Table */}
            <div className="bg-[#1a2324] rounded-lg overflow-hidden border border-gray-700 mb-12">
                <div className="flex border-b border-gray-700" style={{ backgroundColor }}>
                    <div className="w-32 md:w-40 p-4"></div>
                    <div className="flex-1 p-4 text-center text-lg font-bold text-white">
                        Fragments
                    </div>
                </div>
                {fragments.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">
                        No fragments found for this subclass.
                    </div>
                ) : (
                    fragments.map((row: Fragment, idx: number) => (
                        <div
                            key={row.id}
                            className={`flex border-b border-gray-700 last:border-b-0`}
                            style={{
                                backgroundColor:
                                    idx % 2 === 0 ? backgroundColor : '#1a2324',
                            }}
                        >
                            <div className="w-32 md:w-40 flex flex-col items-center justify-center p-4 border-r border-gray-700">
                                <div className="relative w-12 h-12 mb-2">
                                    <Image
                                        src={row.icon_url}
                                        alt={row.name}
                                        fill
                                        sizes="48px"
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-base font-semibold text-white text-center">
                                    {row.name}
                                </span>
                            </div>
                            <div className="flex-1 p-4 text-sm text-gray-200 whitespace-pre-line">
                                {highlightText(row.description)}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Class specific sections */}
            <ClassFilter
                sections={sections}
                aspectsByClass={aspectsByClass}
                meleeAbilitiesByClass={meleeAbilitiesByClass}
                superAbilitiesByClass={superAbilitiesByClass}
                classAbilitiesByClass={classAbilitiesByClass}
                grenadeAbilitiesByClass={isPrismatic ? grenadeAbilitiesByClass : undefined}
                backgroundColor={backgroundColor}
            />

            {/* Non-Prismatic Grenade Abilities Table */}
            {!isPrismatic && (
                <div className="bg-[#1a2324] rounded-lg overflow-hidden border border-gray-700 mb-12">
                    <div
                        className="flex border-b border-gray-700"
                        style={{ backgroundColor }}
                    >
                        <div className="w-32 md:w-40 p-4"></div>
                        <div className="flex-1 p-4 text-center text-lg font-bold text-white">
                            Grenade Abilities
                        </div>
                    </div>
                    {grenadeAbilities.length === 0 ? (
                        <div className="p-6 text-center text-gray-400">
                            No grenade abilities found for this subclass.
                        </div>
                    ) : (
                        grenadeAbilities.map((row: Ability, idx: number) => (
                            <div
                                key={row.id}
                                className={`flex border-b border-gray-700 last:border-b-0`}
                                style={{
                                    backgroundColor:
                                        idx % 2 === 0 ? backgroundColor : '#1a2324',
                                }}
                            >
                                <div className="w-32 md:w-40 flex flex-col items-center justify-center p-4 border-r border-gray-700">
                                    <div className="relative w-12 h-12 mb-2">
                                        <Image
                                            src={row.icon_url}
                                            alt={row.name}
                                            fill
                                            sizes="48px"
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-base font-semibold text-white text-center">
                                        {row.name}
                                    </span>
                                </div>
                                <div className="flex-1 p-4 text-sm text-gray-200 whitespace-pre-line">
                                    {highlightText(row.description)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </main>
    )
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params
    return <SubclassPage subclass_type={resolvedParams.subclass_type} />
}
