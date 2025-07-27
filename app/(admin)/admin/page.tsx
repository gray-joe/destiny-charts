import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div>
            <p>Hello {data.user.email}</p>
            <a href={`https://www.bungie.net/en/OAuth/Authorize?client_id=${process.env.NEXT_PUBLIC_BUNGIE_CLIENT_ID}&response_type=code`}>
                Login with Bungie
            </a>
        </div>
    )
}
