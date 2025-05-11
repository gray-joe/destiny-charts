import Link from 'next/link'
import { lusitana } from '@/app/ui/fonts'

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-[50vh]">
            <h2 className={`${lusitana.className} text-xl md:text-2xl mb-4`}>
                Invalid Subclass Type
            </h2>
            <p className="text-gray-400 mb-4">
                The requested subclass type does not exist.
            </p>
            <Link
                href="/core"
                className="text-primary-light hover:text-primary-dark transition-colors"
            >
                ← Return to Core Game Mechanics
            </Link>
        </main>
    )
}
