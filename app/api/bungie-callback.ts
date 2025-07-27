import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const client_id = process.env.BUNGIE_CLIENT_ID!
const client_secret = process.env.BUNGIE_CLIENT_SECRET!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string

  if (!code) {
    return res.status(400).send('No code received from Bungie')
  }

  try {
    const tokenResponse = await axios.post('https://www.bungie.net/Platform/App/OAuth/Token/', new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id,
      client_secret,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const { access_token, refresh_token } = tokenResponse.data

    // TODO: Store these securely (DB, JWT, etc.)
    return res.status(200).json({ access_token, refresh_token })
  } catch (error) {
    return res.status(500).json({ error: error as string })
  }
}
