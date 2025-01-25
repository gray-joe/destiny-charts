import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';

// Define the type for a weapon entry
interface Weapon {
  id: string;
  icon_url: string;
  name: string;
  affinity: string;
  frame: string;
  enhanced: boolean;
  reserves: number;
  perk_one: string;
  perk_two: string;
  origin_trait: string;
  rank_in_type: number;
  tier: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
}

export default async function WeaponsTable({
  weapons,
}: {
  weapons: Weapon[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Tier List
      </h1>
      <Search placeholder="Search weapons..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full rounded-md text-gray-900">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Icon</th>
                    <th scope="col" className="px-3 py-5 font-medium">Name</th>
                    <th scope="col" className="px-3 py-5 font-medium">Affinity</th>
                    <th scope="col" className="px-3 py-5 font-medium">Frame</th>
                    <th scope="col" className="px-3 py-5 font-medium">Enhanced</th>
                    <th scope="col" className="px-3 py-5 font-medium">Reserves</th>
                    <th scope="col" className="px-3 py-5 font-medium">Perk 1</th>
                    <th scope="col" className="px-3 py-5 font-medium">Perk 2</th>
                    <th scope="col" className="px-3 py-5 font-medium">Origin Trait</th>
                    <th scope="col" className="px-3 py-5 font-medium">Rank</th>
                    <th scope="col" className="px-3 py-5 font-medium">Tier</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {weapons.map((weapon) => (
                    <tr 
                      key={weapon.id} 
                      className={`group hover:bg-gray-100 ${
                        getTierBackgroundColor(weapon.tier)
                      }`}
                    >
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6">
                        {weapon.icon_url ? (
                          <Image
                            src={weapon.icon_url}
                            alt={weapon.name}
                            width={48}
                            height={48}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200" />
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.affinity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.frame}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.enhanced ? 'Yes' : 'No'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.reserves}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.perk_one}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.perk_two}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.origin_trait}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.rank_in_type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm font-bold">
                        {weapon.tier}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get background color based on tier
function getTierBackgroundColor(tier: string) {
  const colors = {
    'S': 'bg-emerald-100',
    'A': 'bg-green-100',
    'B': 'bg-yellow-100',
    'C': 'bg-orange-100',
    'D': 'bg-red-100',
    'E': 'bg-purple-100',
    'F': 'bg-gray-100',
    'G': 'bg-gray-200',
  };
  return colors[tier as keyof typeof colors] || 'bg-white';
}
