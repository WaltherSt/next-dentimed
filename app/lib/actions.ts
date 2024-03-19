"use server";

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { PrismaSingleton } from "./prisma";

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
    return await PrismaSingleton.getInstance().patient.delete({
      where: { id: id },
    });
  } catch (error) {
    return { message: "Database Error: Fallo la eliminación del paciente" };
  } finally {
    revalidatePath("/dashboard/patients");
  }
}

export async function getPatient(id: string) {
  try {
    return await PrismaSingleton.getInstance().patient.findFirst({
      where: { id: id },
    });
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
    return await PrismaSingleton.getInstance().users.findFirst({
      where: { email: email },
    });
  } catch (error) {
    return "Error: usuario no encontrado ";
  }
}
export async function createPatient(formData: FormData) {
  try {
    const user: any = await auth();
    const item: any = await getUser(user?.user?.email);
    const user_id = item.id;
    const { fecha_nacimiento } = Object.fromEntries(formData.entries());

    await PrismaSingleton.getInstance()
      .patient.create({
        data: {
          ...Object.fromEntries(formData.entries()),
          fecha_nacimiento: new Date(fecha_nacimiento.toString()),
          user_id,
        },
      })
      .catch((e) => console.log(e));
  } catch (error) {
    return { message: "Database error: No se pudo crear el paciente ", error };
  } finally {
    redirect("/dashboard/patients");
  }
}

const updatePatient = FormSchema.omit({ id: true });
export async function updatePatientId(idPatient: string, formData: FormData) {
  try {
    const { fecha_nacimiento } = Object.fromEntries(formData.entries());
    const fields = updatePatient.parse(Object.fromEntries(formData.entries()));

    await PrismaSingleton.getInstance()
      .patient.update({
        where: { id: idPatient },
        data: {
          ...fields,
          fecha_nacimiento: new Date(fecha_nacimiento.toString()),
        },
      })
      .catch((e) => console.log(e));
  } catch (error) {
    return { message: `DataBase Error: ${error}` };
  }
  revalidatePath("/dashboard/patients");
  redirect("/dashboard/patients");
}

export async function getCountPatientsByUser(userId: string) {
  try {
    return await PrismaSingleton.getInstance().patient.count({
      where: { user_id: userId },
    });
  } catch (error) {
    console.log(error);
  }
}
