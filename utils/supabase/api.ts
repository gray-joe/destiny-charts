import { createClient } from '@supabase/supabase-js'

export function createApiClient() {
    return createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_ROLE_KEY!
    )
}
