"use server";

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { PrismaClient } from "@prisma/client";
import { sql } from "@vercel/postgres";

const prisma = new PrismaClient();

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
    return await prisma.patient.delete({ where: { id: id } });
  } catch (error) {
    return { message: "Database Error: Fallo la eliminación del paciente" };
  } finally {
    revalidatePath("/dashboard/patients");
  }
}

export async function getPatient(id: string) {
  try {
    return await prisma.patient.findFirst({ where: { id: id } });
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
    return await prisma.users.findFirst({ where: { email: email } });
  } catch (error) {
    return "Error: usuario no encontrado ";
  }
}

const CreatePatient = FormSchema.omit({ id: true });
// implementar orm

export async function createPatient(formData: FormData) {
  try {
    const user: any = await auth();
    const item: any = await getUser(user?.user?.email);
    const user_id = item.id;

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

    // const resultado = await prisma.patient.create({
    //   data: {
    //     n_documento,
    //     tipo_documento,
    //     nombres,
    //     apellidos,
    //     genero,
    //     fecha_nacimiento,
    //     telefono,
    //     correo,
    //     user_id,
    //   },
    // });

    // console.log(resultado);

    await sql`
      INSERT INTO patient (N_documento, Tipo_documento, Nombres, Apellidos, Genero, Fecha_nacimiento, Telefono, Correo, User_id)
    VALUES (${n_documento}, ${tipo_documento}, ${nombres}, ${apellidos}, ${genero}, ${fecha_nacimiento}, ${telefono}, ${correo}, ${user_id})`;
  } catch (error) {
    return { message: "Database error: No se pudo crear el paciente ", error };
  } finally {
    redirect("/dashboard/patients");
  }
}

const updatePatient = FormSchema.omit({});
// implementar orm

export async function updatePatientId(idPatient: string, formData: FormData) {
  try {
    const fields = updatePatient.parse(Object.fromEntries(formData.entries()));

    const data = await prisma.patient.update({
      where: { id: idPatient },
      data: fields,
    });
    console.log(data);
    revalidatePath("/dashboard/patients");
    redirect("/dashboard/patients");
  } catch (error) {
    return { message: error };
  }
}

export async function getCountPatientsByUser(userId: string) {
  try {
    return await prisma.patient.count({ where: { user_id: userId } });
  } catch (error) {
    console.log(error);
  }
}
