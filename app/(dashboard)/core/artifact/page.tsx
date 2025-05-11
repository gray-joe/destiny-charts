import { fetchArtifactPerks } from '@/app/lib/data'
import { ArtifactPerk } from '@/app/lib/definitions'
import Image from 'next/image'

export default async function ArtifactPage() {
    const perks = await fetchArtifactPerks(25)

    // Group perks by column
    const perksByColumn: { [key: number]: ArtifactPerk[] } = {}
    perks.forEach((perk) => {
        if (!perksByColumn[perk.column_number]) {
            perksByColumn[perk.column_number] = []
        }
        perksByColumn[perk.column_number].push(perk)
    })

    return (
        <div className="w-full">
            <h1 className="text-2xl text-white mb-8">
                Season 25 Artifact Perks
            </h1>

            {/* Display perks in a uniform grid, 5 columns */}
            <div className="grid grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((column) => (
                    <div key={column} className="flex flex-col gap-4">
                        {perksByColumn[column]?.map((perk) => (
                            <div
                                key={perk.name}
                                className="bg-primary-dark rounded-lg p-4 relative flex flex-col h-[300px]"
                            >
                                {/* Perk Icon and Name */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative w-10 h-10 flex-shrink-0">
                                        <Image
                                            src={perk.icon_url}
                                            alt={perk.name}
                                            fill
                                            className="object-cover rounded"
                                            sizes="40px"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white leading-tight">
                                        {perk.name}
                                    </h3>
                                </div>

                                {/* Perk Description */}
                                <div className="text-sm text-gray-300 space-y-2 flex-grow overflow-y-auto">
                                    {perk.description
                                        .split('\n')
                                        .map((line, i) => (
                                            <p
                                                key={i}
                                                className="whitespace-pre-wrap"
                                            >
                                                {line}
                                            </p>
                                        ))}
                                </div>

                                {/* Boost indicator if description includes "BOOST" */}
                                {perk.description.includes('BOOST') && (
                                    <div className="absolute top-2 right-2">
                                        <span className="text-green-400 text-sm">
                                            ↑ BOOST
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
