import { fetchBuildById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

export interface PageProps {
  params: Promise<{ build: string }>;
}

export default async function BuildPage({
  params,
}: PageProps) {
  const resolvedParams = await params;
  
  const build = await fetchBuildById(resolvedParams.build);
  
  if (!build) {
    notFound();
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      {/* Left Column - Background Image */}
      <div className="md:w-1/3">
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
          {build.background_image ? (
            <Image
              src={build.background_image}
              alt={build.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-primary-dark" />
          )}
        </div>
      </div>

      {/* Right Column - Build Details */}
      <div className="md:w-2/3 space-y-8">
        {/* Header Section */}
        <div>
          <h1 className={`${lusitana.className} text-3xl font-bold text-white mb-2`}>
            {build.name}
          </h1>
          <p className="text-primary-light text-lg">
            {build.class} • {build.subclass}
          </p>
        </div>

        {/* Activities Section */}
        <section>
          <h2 className="text-xl text-primary-light mb-3">Recommended Activities</h2>
          <p className="text-white">{build.activities}</p>
        </section>

        {/* Subclass Details */}
        <section>
          <h2 className="text-xl text-primary-light mb-3">Subclass Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Aspects */}
            {/* <div>
              <h3 className="text-white font-semibold mb-2">Aspects</h3>
              <ul className="list-disc list-inside text-white">
                {build.aspects?.map((aspect, index) => (
                  <li key={index}>{aspect}</li>
                ))}
              </ul>
            </div> */}
            {/* Fragments */}
            {/* <div>
              <h3 className="text-white font-semibold mb-2">Fragments</h3>
              <ul className="list-disc list-inside text-white">
                {build.fragments?.map((fragment, index) => (
                  <li key={index}>{fragment}</li>
                ))}
              </ul>
            </div> */}
          </div>
        </section>

        {/* Equipment Section */}
        <section>
          <h2 className="text-xl text-primary-light mb-3">Equipment</h2>
          
          {/* Exotic Armor */}
          <div className="mb-4">
            <h3 className="text-white font-semibold mb-2">Exotic Armor</h3>
            <div className="flex items-center gap-3">
              {build.exotic_armor_icon_url && (
                <Image
                  src={build.exotic_armor_icon_url}
                  alt={build.exotic_armor}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              )}
              <span className="text-white">{build.exotic_armor}</span>
            </div>
          </div>

          {/* Exotic Weapon */}
          <div className="mb-4">
            <h3 className="text-white font-semibold mb-2">Exotic Weapon</h3>
            <div className="flex items-center gap-3">
              {build.exotic_weapon_icon_url && (
                <Image
                  src={build.exotic_weapon_icon_url}
                  alt={build.exotic_weapon}
                  fill
                  sizes="48px"
                  className="object-cover p-1"
                />
              )}
              <span className="text-white">{build.exotic_weapon}</span>
            </div>
          </div>

          {/* Legendary Weapons */}
          <div>
            <h3 className="text-white font-semibold mb-2">Recommended Legendary Weapons</h3>
            <p className="text-white">{build.legendary_weapons}</p>
          </div>
        </section>

        {/* Build Guide Link */}
        {build.build_guide_id && (
          <section>
            <a 
              href={`/guides/${build.build_guide_id}`}
              className="inline-block px-4 py-2 bg-primary-light text-white rounded-md hover:bg-primary-hover transition-colors"
            >
              View Full Build Guide
            </a>
          </section>
        )}
      </div>
    </div>
  );
}