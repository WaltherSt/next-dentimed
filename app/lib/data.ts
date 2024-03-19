"use server";
import { auth } from "@/auth";
import { unstable_noStore as noStore } from "next/cache";
import { getCountPatientsByUser, getUser } from "./actions";
import prisma from "./db";

export async function fetchPatients() {
  noStore();

  try {
    const user: any = await auth();
    const item: any = await getUser(user?.user?.email);

    const userId = item.id;
    const data = await prisma.patient.findMany({
      where: { user_id: userId },
    });

    return data;
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
    const patients = await prisma.patient.findMany({
      where: {
        AND: [
          { nombres: { contains: query, mode: "insensitive" } },
          { user_id: userId },
        ],
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    return patients;
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

    const count = await prisma.patient.count({
      where: { AND: [{ nombres: { contains: query } }, { user_id: userId }] },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of patients.");
  }
}
