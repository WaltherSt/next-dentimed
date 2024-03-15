import { deletePatient, getPatient } from "@/app/lib/actions";
import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreatePatient() {
  return (
    <Link
      href="/dashboard/patients/create"
      className="flex h-10 items-center rounded-lg bg-sky-400 px-4 text-sm font-medium text-white transition-colors hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
    >
      <span className="hidden md:block">Nuevo Paciente</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePatient({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/patients/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePatient({ id }: { id: string }) {
  const deletePatientWithId = deletePatient.bind(null, id);
  return (
    <form action={deletePatientWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function ViewPatient({ id }: { id: string }) {
  const viewPatientWithId = getPatient.bind(null, id);
  return (
    <form action={viewPatientWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <EyeIcon className="w-5" />
      </button>
    </form>
  );
}
