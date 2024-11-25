import { db } from "@vercel/postgres";
import { Revenue } from "../lib/definitions";

const client = await db.connect();

async function listInvoices() {
	const data = await client.sql`
    SELECT * FROM revenue
  `;

	return data.rows;
}

// async function getRevenue() {
//   // const data = await client.sql`SELECT * FROM revenue`;
//   const data = await db<Revenue>`SELECT * FROM revenue`;
//   return data.rows;
// }

async function getRevenue(): Promise<Revenue[]> {
  try {
    const { rows } = await client.sql`SELECT * FROM revenue`;
    return rows as Revenue[];
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function GET() {
  try {
  	// return Response.json(await listInvoices());
  	return Response.json(await getRevenue());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
