'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

export function Pagination({
    totalPages,
    currentPage,
}: {
    totalPages: number
    currentPage: number
}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    return (
        <div className="inline-flex">
            <PaginationArrow
                direction="left"
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            <div className="flex -space-x-px">
                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1
                    return (
                        <PaginationNumber
                            key={page}
                            href={createPageURL(page)}
                            page={page}
                            isActive={currentPage === page}
                        />
                    )
                })}
            </div>

            <PaginationArrow
                direction="right"
                href={createPageURL(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
            />
        </div>
    )
}

function PaginationNumber({
    page,
    href,
    isActive,
}: {
    page: number
    href: string
    isActive: boolean
}) {
    return (
        <Link
            href={href}
            className={clsx(
                'flex h-10 w-10 items-center justify-center text-sm border',
                {
                    'z-10 bg-primary-dark border-primary-light text-white':
                        isActive,
                    'bg-background hover:bg-primary-dark/50 border-gray-700':
                        !isActive,
                }
            )}
        >
            {page}
        </Link>
    )
}

function PaginationArrow({
    href,
    direction,
    isDisabled,
}: {
    href: string
    direction: 'left' | 'right'
    isDisabled?: boolean
}) {
    const arrow = direction === 'left' ? '←' : '→'

    if (isDisabled) {
        return (
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-700 bg-background/50 text-gray-600">
                {arrow}
            </div>
        )
    }

    return (
        <Link
            href={href}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-700 bg-background hover:bg-primary-dark/50"
        >
            {arrow}
        </Link>
    )
}
