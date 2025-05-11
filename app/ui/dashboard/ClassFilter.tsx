'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Aspect } from '@/app/lib/definitions'
import { classColors } from '@/app/ui/dashboard/colors'

type Section = {
    id: string
    label: 'Hunter' | 'Titan' | 'Warlock'
}

type Props = {
    sections: readonly Section[]
    aspectsByClass: Record<Section['label'], Aspect[]>
    backgroundColor: string
}

export function ClassFilter({
    sections,
    aspectsByClass,
    backgroundColor,
}: Props) {
    const [selectedClass, setSelectedClass] = useState<
        Section['label'] | 'all'
    >('all')

    const visibleSections =
        selectedClass === 'all'
            ? sections
            : sections.filter((section) => section.label === selectedClass)

    return (
        <>
            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setSelectedClass('all')}
                    className={`flex-1 max-w-xs text-center py-3 rounded border-2 transition-colors duration-150
                        ${
                            selectedClass === 'all'
                                ? 'border-white text-white'
                                : 'border-gray-600 text-gray-400 hover:bg-[#2e3a3b]'
                        }`}
                    style={{
                        backgroundColor:
                            selectedClass === 'all'
                                ? backgroundColor
                                : undefined,
                    }}
                >
                    All Classes
                </button>
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setSelectedClass(section.label)}
                        className={`flex-1 max-w-xs text-center py-3 rounded border-2 transition-colors duration-150`}
                        style={{
                            color:
                                selectedClass === section.label
                                    ? classColors[section.label]
                                    : 'rgb(156, 163, 175)',
                            borderColor:
                                selectedClass === section.label
                                    ? classColors[section.label]
                                    : 'rgb(75, 85, 99)',
                            backgroundColor:
                                selectedClass === section.label
                                    ? backgroundColor
                                    : undefined,
                        }}
                    >
                        {section.label}
                    </button>
                ))}
            </div>

            {/* Class Sections with Aspects */}
            <div className="space-y-12">
                {visibleSections.map((section) => (
                    <div key={section.id}>
                        <h2
                            className="text-2xl font-bold mb-6"
                            style={{ color: classColors[section.label] }}
                        >
                            {section.label}
                        </h2>

                        {/* Aspects Table */}
                        <div className="bg-[#1a2324] rounded-lg overflow-hidden border border-gray-700">
                            <div className="flex bg-[#232d2e] border-b border-gray-700">
                                <div className="w-32 md:w-40 p-4"></div>
                                <div className="flex-1 p-4 text-center text-lg font-bold text-white">
                                    Aspects
                                </div>
                            </div>
                            {aspectsByClass[section.label].length === 0 ? (
                                <div className="p-6 text-center text-gray-400">
                                    No aspects found for this class and
                                    subclass.
                                </div>
                            ) : (
                                aspectsByClass[section.label].map(
                                    (aspect: Aspect, idx: number) => (
                                        <div
                                            key={aspect.id}
                                            className={`flex border-b border-gray-700 last:border-b-0`}
                                            style={{
                                                backgroundColor:
                                                    idx % 2 === 0
                                                        ? backgroundColor
                                                        : '#1a2324',
                                            }}
                                        >
                                            <div className="w-32 md:w-40 flex flex-col items-center justify-center p-4 border-r border-gray-700">
                                                <div className="relative w-12 h-12 mb-2">
                                                    <Image
                                                        src={aspect.icon_url}
                                                        alt={aspect.name}
                                                        fill
                                                        sizes="48px"
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <span className="text-base font-semibold text-white">
                                                    {aspect.name}
                                                </span>
                                            </div>
                                            <div className="flex-1 p-4 text-sm text-gray-200 whitespace-pre-line">
                                                {aspect.description}
                                            </div>
                                        </div>
                                    )
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
