import { db } from '@vercel/postgres'

const client = await db.connect()

//adhoc queries
