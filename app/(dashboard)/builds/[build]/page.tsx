import { fetchBuildById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Aspect, Fragment } from '@/app/lib/definitions';

export default async function BuildPage({
  params,
}: {
  params: { build: string }
}) {
  const build = await fetchBuildById(params.build);
  
  if (!build) {
    notFound();
  }

  // Parse JSON strings into objects
  const exoticArmor = build.exotic_armor ? JSON.parse(build.exotic_armor) : null;
  const exoticWeapon = build.exotic_weapon ? JSON.parse(build.exotic_weapon) : null;
  const legendaryWeapons = build.legendary_weapons ? build.legendary_weapons.split(',').map((w: string) => w.trim()) : [];

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aspects */}
            <div>
              <h3 className="text-white font-semibold mb-2">Aspects</h3>
              <ul className="space-y-2">
                {build.aspects?.map((aspect: Aspect, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <Image
                      src={aspect.icon_url}
                      alt={aspect.name}
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                    <span className="text-white">{aspect.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Fragments */}
            <div>
              <h3 className="text-white font-semibold mb-2">Fragments</h3>
              <ul className="space-y-2">
                {build.fragments?.map((fragment: Fragment, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <Image
                      src={fragment.icon_url}
                      alt={fragment.name}
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                    <span className="text-white">{fragment.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section>
          <h2 className="text-xl text-primary-light mb-3">Equipment</h2>
          
          {/* Exotic Armor */}
          {exoticArmor && (
            <div className="mb-4">
              <h3 className="text-white font-semibold mb-2">Exotic Armor</h3>
              <div className="flex items-center gap-3">
                <Image
                  src={exoticArmor.icon_url}
                  alt={exoticArmor.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span className="text-white">{exoticArmor.name}</span>
              </div>
            </div>
          )}

          {/* Exotic Weapon */}
          {exoticWeapon && (
            <div className="mb-4">
              <h3 className="text-white font-semibold mb-2">Exotic Weapon</h3>
              <div className="flex items-center gap-3">
                <Image
                  src={exoticWeapon.icon_url}
                  alt={exoticWeapon.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span className="text-white">{exoticWeapon.name}</span>
              </div>
            </div>
          )}

          {/* Legendary Weapons */}
          {legendaryWeapons.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-2">Recommended Legendary Weapons</h3>
              <ul className="list-disc list-inside text-white">
                {legendaryWeapons.map((weapon: string, index: number) => (
                  <li key={index}>{weapon}</li>
                ))}
              </ul>
            </div>
          )}
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