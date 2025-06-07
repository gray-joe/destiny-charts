import Image from 'next/image'
import Link from 'next/link'
import { lusitana } from '@/app/ui/fonts'

const subclassCards = [
    {
        name: 'Arc',
        href: '/core/arc',
        icon: '/icons/arc.png',
        description: 'Arc subclass verbs, abilities, and mechanics.'
    },
    {
        name: 'Solar',
        href: '/core/solar',
        icon: '/icons/solar.png',
        description: 'Solar subclass verbs, abilities, and mechanics.'
    },
    {
        name: 'Void',
        href: '/core/void',
        icon: '/icons/void.png',
        description: 'Void subclass verbs, abilities, and mechanics.'
    },
    {
        name: 'Stasis',
        href: '/core/stasis',
        icon: '/icons/stasis.png',
        description: 'Stasis subclass verbs, abilities, and mechanics.'
    },
    {
        name: 'Strand',
        href: '/core/strand',
        icon: '/icons/strand.png',
        description: 'Strand subclass verbs, abilities, and mechanics.'
    },
    {
        name: 'Prismatic',
        href: '/core/prismatic',
        icon: '/icons/prismatic.png',
        description: 'Prismatic subclass verbs, abilities, and mechanics.'
    },
    {
        name: 'Artifact Perks',
        href: '/core/artifact',
        icon: '/icons/artifact.png',
        description: 'Seasonal artifact perks and effects.'
    },
]

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Core Game Mechanics
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {subclassCards.map(card => (
                    <Link
                        key={card.name}
                        href={card.href}
                        className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-700 bg-[#1a2324] hover:bg-[#232d2e] transition-colors shadow group"
                    >
                        <div className="mb-3">
                            <Image
                                src={card.icon}
                                alt={card.name}
                                width={64}
                                height={64}
                                className="object-contain"
                            />
                        </div>
                        <div className="text-lg font-bold text-white mb-1 group-hover:underline">{card.name}</div>
                        <div className="text-gray-300 text-center text-sm">{card.description}</div>
                    </Link>
                ))}
            </div>
        </main>
    )
}
