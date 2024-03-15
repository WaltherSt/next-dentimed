"use server";

import { auth, signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Patients } from "./definitions";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function deletePatient(id: string) {
  try {
    await sql`DELETE FROM patient WHERE id = ${id}`;
  } catch (error) {
    return { message: "Database Error: Fallo la eliminación del paciente" };
  } finally {
    revalidatePath("/dashboard/patients");
  }
}

export async function getPatient(id: string) {
  try {
    const result = await sql<Patients>`SELECT * FROM patient WHERE id = ${id}`;
    return result.rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/dashboard/patients");
  }
}

const FormSchema = z.object({
  id: z.string().optional(),
  n_documento: z.string(),
  tipo_documento: z.string(),
  nombres: z.string(),
  apellidos: z.string(),
  genero: z.string(),
  fecha_nacimiento: z.string(),
  telefono: z.string(),
  correo: z.string().email(),
});

export async function getUser(email: string) {
  try {
    return await sql`SELECT id FROM users WHERE email = ${email}`;
  } catch (error) {
    return "Error: usuario no encontrado ";
  }
}

const CreatePatient = FormSchema.omit({ id: true });
export async function createPatient(formData: FormData) {
  try {
    const { user } = await auth();
    const { rows } = await getUser(user.email);
    const userId = rows[0].id;

    const {
      n_documento,
      tipo_documento,
      nombres,
      apellidos,
      genero,
      fecha_nacimiento,
      telefono,
      correo,
    } = CreatePatient.parse(Object.fromEntries(formData.entries()));

    await sql`
    INSERT INTO patient (N_documento, Tipo_documento, Nombres, Apellidos, Genero, Fecha_nacimiento, Telefono, Correo, User_id)
  VALUES (${n_documento}, ${tipo_documento}, ${nombres}, ${apellidos}, ${genero}, ${fecha_nacimiento}, ${telefono}, ${correo}, ${userId})`;
  } catch (error) {
    return { message: "Database error: No se pudo crear el paciente ", error };
  } finally {
    redirect("/dashboard/patients");
  }
}

const updatePatient = FormSchema.omit({});

export async function updatePatientId(idPatient: string, formData: FormData) {
  const {
    n_documento,
    tipo_documento,
    nombres,
    apellidos,
    genero,
    fecha_nacimiento,
    telefono,
    correo,
  } = updatePatient.parse(Object.fromEntries(formData.entries()));

  try {
    await sql`
      UPDATE patient
      SET N_documento =${n_documento}, 
      Tipo_documento = ${tipo_documento},
       Nombres = ${nombres},
       Apellidos=${apellidos},
       Genero=${genero},
       Fecha_nacimiento=${fecha_nacimiento},
       Telefono=${telefono},
       Correo=${correo}
      WHERE id = ${idPatient}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/patients");
  redirect("/dashboard/patients");
}
