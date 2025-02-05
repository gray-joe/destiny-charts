'use client';

import Image from 'next/image';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { Build } from '@/app/lib/definitions';

export default function BuildCard({
    data,
}: {
    data: Build;
}) {
  return (
    <Link href={`builds/${data.id}`}>
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
            <p className={`${lusitana.className} text-sm font-bold text-primary-light`}>
              {data.class}
            </p>
            <h2 className="text-xl font-bold text-white mt-1">{data.name}</h2>
          </div>

          {/* Icons Footer */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4">
              {/* Subclass Icon */}
              {/* {data.subclass && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-dark/50">
                  <Image
                    src={data.subclass}
                    alt="Subclass"
                    fill
                    sizes="48px"
                    className="object-cover p-1"
                  />
                </div>
              )} */}
              {/* Exotic Armor Icon */}
              {data.exotic_armor_icon_url && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-dark/50">
                  <Image
                    src={data.exotic_armor_icon_url}
                    alt="Exotic Armor"
                    fill
                    sizes="48px"
                    className="object-cover p-1"
                  />
                </div>
              )}
              {/* Exotic Weapon Icon */}
              {data.exotic_weapon_icon_url && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-dark/50">
                  <Image
                    src={data.exotic_weapon_icon_url}
                    alt="Exotic Weapon"
                    fill
                    sizes="48px"
                    className="object-cover p-1"
                    onError={(e) => console.error('Image load error:', e)}
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
  );
}
