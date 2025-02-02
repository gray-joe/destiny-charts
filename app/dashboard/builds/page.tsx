import { fetchBuilds } from '@/app/lib/data';
import BuildCard from '@/app/ui/builds/card';
import { Build } from '@/app/lib/definitions';

export default async function Page() {
  const builds = await fetchBuilds();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {builds.map((build: Build) => (
        <div key={build.id}>
          <BuildCard
            data={build}
          />
        </div>
      ))}
    </div>
  );
}