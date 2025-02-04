import { fetchBuildById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">{build.name}</h1>
      
      {/* Class and Subclass Section */}
      <div className="mb-6">
        <h2 className="text-xl text-primary-light mb-2">Class Details</h2>
        <p className="text-white">Class: {build.class}</p>
        <p className="text-white">Subclass: {build.subclass}</p>
      </div>
    </div>
  );
}
