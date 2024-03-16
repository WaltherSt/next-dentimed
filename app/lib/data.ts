"use server";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { getCountPatientsByUser, getUser } from "./actions";
import { Patients } from "./definitions";

export async function fetchPatients() {
  noStore();

  try {
    const user: any = await auth();
    const item: any = await getUser(user?.user?.email);

    const userId = item.id;
    const data =
      await sql<Patients>`SELECT * FROM patient WHERE patient.User_id=${userId}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function fetchCardData() {
  noStore();

  try {
    const user: any = await auth();
    const item: any = await getUser(user?.user?.email);

    const userId = item.id;
    // const patientsCountPromise = sql`SELECT COUNT(*) FROM patient WHERE patient.User_id=${userId}`;
    const numberOfpatients = await getCountPatientsByUser(userId);

    return {
      numberOfpatients,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredPatients(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const user: any = await auth();
  const item: any = await getUser(user?.user?.email);
  const userId = item.id;

  try {
    const patients = await sql<Patients>`
    SELECT *
    FROM patient p
    WHERE
      p.nombres ILIKE ${`%${query}%`}
      AND p.user_id=${userId}
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

    return patients.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch patient.");
  }
}

export async function fetchPatientsPages(query: string) {
  noStore();

  try {
    const user: any = await auth();
    const item: any = await getUser(user?.user?.email);
    const userId = item.id;
    const count = await sql`SELECT COUNT(*)
    FROM patient
    WHERE
      patient.nombres ILIKE ${`%${query}%`}
      AND patient.User_id=${userId}
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of patients.");
  }
}
