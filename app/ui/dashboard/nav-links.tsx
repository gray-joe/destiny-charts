'use client'

import {
    RocketLaunchIcon,
    HomeIcon,
    ChartBarIcon,
    BugAntIcon,
    BeakerIcon,
    WrenchScrewdriverIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useState } from 'react'

const links = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Builds', href: '/builds', icon: WrenchScrewdriverIcon },
    { name: 'Build Finder', href: '/build_finder', icon: AcademicCapIcon },
    { name: 'Endgame Analysis', href: '/endgame_analysis', icon: ChartBarIcon },
    {
        name: 'Boss DMG',
        href: '/endgame_analysis/boss_dmg',
        icon: BugAntIcon,
        children: [
            { name: 'Abilities', href: '/endgame_analysis/boss_dmg/abilities' },
            { name: 'Sustained', href: '/endgame_analysis/boss_dmg/sustained' },
            { name: 'Swap', href: '/endgame_analysis/boss_dmg/swap' },
        ],
    },
    {
        name: 'Weapons',
        href: '/endgame_analysis/weapons',
        icon: RocketLaunchIcon,
        children: [
            {
                name: 'Linear Fusion Rifles',
                href: '/endgame_analysis/weapons/lfrs',
            },
            {
                name: 'Heavy Grenade Launchers',
                href: '/endgame_analysis/weapons/heavy-gls',
            },
            { name: 'Machine Guns', href: '/endgame_analysis/weapons/mgs' },
            { name: 'Rockets', href: '/endgame_analysis/weapons/rockets' },
            { name: 'Swords', href: '/endgame_analysis/weapons/swords' },
            {
                name: 'Breach Grenade Launchers',
                href: '/endgame_analysis/weapons/breach-gls',
            },
            { name: 'Glaives', href: '/endgame_analysis/weapons/glaives' },
            {
                name: 'Fusion Rifles',
                href: '/endgame_analysis/weapons/fusions',
            },
            {
                name: 'Rocket Sidearms',
                href: '/endgame_analysis/weapons/rocket-sidearms',
            },
            { name: 'Shotguns', href: '/endgame_analysis/weapons/shotguns' },
            {
                name: 'Sniper Rifles',
                href: '/endgame_analysis/weapons/sniper-rifles',
            },
            {
                name: 'Trace Rifles',
                href: '/endgame_analysis/weapons/trace-rifles',
            },
        ],
    },
    {
        name: 'Other',
        href: '/endgame_analysis/other',
        icon: BeakerIcon,
        children: [
            { name: 'Artifact Mods', href: '/endgame_analysis/other/artifact' },
            {
                name: 'Super Regen',
                href: '/endgame_analysis/other/super_regen',
            },
        ],
    },
]

export default function NavLinks() {
    const pathname = usePathname()
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    const toggleExpand = (name: string) => {
        setExpandedItems((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name]
        )
    }

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon
                const isExpanded = expandedItems.includes(link.name)
                const isActive = pathname === link.href
                const hasChildren = link.children && link.children.length > 0

                return (
                    <div key={link.name}>
                        <Link
                            href={link.href}
                            className={clsx(
                                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-primary-light p-3 text-sm font-medium text-white hover:bg-primary-hover md:flex-none md:justify-start md:p-2 md:px-3',
                                {
                                    'bg-primary-hover': isActive,
                                }
                            )}
                            onClick={(e: { preventDefault: () => void }) => {
                                if (hasChildren) {
                                    e.preventDefault()
                                    toggleExpand(link.name)
                                }
                            }}
                        >
                            <LinkIcon className="w-6" />
                            <p className="hidden md:block">{link.name}</p>
                            {hasChildren && (
                                <svg
                                    className={`w-4 h-4 ml-auto transition-transform ${
                                        isExpanded ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            )}
                        </Link>

                        {hasChildren && isExpanded && (
                            <div className="ml-6 mt-1 space-y-1">
                                {link.children.map((child) => (
                                    <Link
                                        key={child.name}
                                        href={child.href}
                                        className={clsx(
                                            'flex h-[40px] items-center justify-center gap-2 rounded-md bg-primary-dark p-3 text-sm font-medium text-white hover:bg-primary-hover md:flex-none md:justify-start md:p-2 md:px-3',
                                            {
                                                'bg-primary-hover':
                                                    pathname === child.href,
                                            }
                                        )}
                                    >
                                        <p className="hidden md:block">
                                            {child.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}
        </>
    )
}
