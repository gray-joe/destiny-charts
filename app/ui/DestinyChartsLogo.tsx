import Image from 'next/image'
import { lusitana } from '@/app/ui/fonts'

export default function DestinyChartsLogo() {
    return (
        <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white bg-blue-1000 p-2 rounded`}
        >
            <Image
                src="https://lsovkbfxdhcnxpaunabw.supabase.co/storage/v1/object/sign/d2warmind/d2warmind.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkMndhcm1pbmQvZDJ3YXJtaW5kLnBuZyIsImlhdCI6MTc0MDI1NjM1NCwiZXhwIjoxNzcxNzkyMzU0fQ.Z_1sOyXE-icr8uw3ki6FvgQVSveX8vlpdZ2jMfPqzgI"
                alt="Item image"
                width={50}
                height={50}
            />
            <p className="text-[32px] ml-4">Destiny Charts</p>
        </div>
    )
}
