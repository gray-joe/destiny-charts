'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const links = [
    { name: 'Legendary Weapons', href: '/admin/legendary_weapons' },
    { name: 'Builds', href: '/admin/builds' },
]

export default function NavLinks() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <>
            {links.map((link) => {
                const isActive = pathname === link.href

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
                        >
                            <p className="hidden md:block">{link.name}</p>
                        </Link>
                    </div>
                )
            })}

            <div className="mt-auto">
                <button
                    onClick={handleSignOut}
                    className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-red-600/20 p-3 text-sm font-medium text-white hover:bg-red-600/30 md:flex-none md:justify-start md:p-2 md:px-3"
                >
                    <p className="hidden md:block">Sign Out</p>
                </button>
            </div>
        </>
    )
}
