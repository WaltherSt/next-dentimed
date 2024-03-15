"use client";

import { updatePatientId } from "@/app/lib/actions";
import { Patients } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "../buttons/button";


export default function Form({ patient }: { patient: Patients}) {
  const fechaNacimiento = new Date(patient.fecha_nacimiento)
    .toISOString()
    .split("T")
    .shift();

    const updatePatient= updatePatientId.bind(null,patient.id)

  return (
    <form action={updatePatient}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label
            htmlFor="tipo_documento"
            className="mb-2 block text-sm font-medium"
          >
            Tipo de documento
          </label>
          <div className="relative">
            <select
              id="tipo_documento"
              name="tipo_documento"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="customer-error"
              defaultValue={patient.tipo_documento}
            >
              <option value="" disabled>
                Select a type of document
              </option>
              <option value="P.P">Pasaporte</option>
              <option value="C.C">Cedula de ciudadania</option>
              <option value="T.I">Tarjeta de identidad</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="n_documento"
            className="mb-2 block text-sm font-medium"
          >
            Numero de documento
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative" aria-describedby="customer-error">
              <input
                id="n_documento"
                name="n_documento"
                type="number"
                placeholder="Ingrese el numero de documento"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
                defaultValue={patient.n_documento}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="nombres" className="mb-2 block text-sm font-medium">
            Nombres
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative" aria-describedby="customer-error">
              <input
                id=" nombres"
                name="nombres"
                type="text"
                placeholder="Nombres del paciente"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
                defaultValue={patient.nombres}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="nombres" className="mb-2 block text-sm font-medium">
            Apellidos
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative" aria-describedby="customer-error">
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                placeholder="Apellidos del paciente"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
                defaultValue={patient.apellidos}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="genero" className="mb-2 block text-sm font-medium">
            Sexo
          </label>
          <div className="relative">
            <select
              id="genero"
              name="genero"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="customer-error"
              defaultValue={patient.genero}
              required
            >
              <option value="" disabled>
                Seleccione el genero del paciente
              </option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="fecha_nacimiento"
            className="mb-2 block text-sm font-medium"
          >
            Fecha de nacimiento
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative" aria-describedby="customer-error">
              <input
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                type="date"
                placeholder="Nombres del paciente"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
                defaultValue={fechaNacimiento}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="telefono" className="mb-2 block text-sm font-medium">
            Telefono
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative" aria-describedby="customer-error">
              <input
                id="telefono"
                name="telefono"
                type="number"
                placeholder="Telefono del paciente"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
                defaultValue={patient.telefono}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="correo" className="mb-2 block text-sm font-medium">
            Correo electronico
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative" aria-describedby="customer-error">
              <input
                id="correo"
                name="correo"
                type="email"
                placeholder="Email del paciente"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
                defaultValue={patient.correo}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/patients"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar</Button>
      </div>
    </form>
  );
}
