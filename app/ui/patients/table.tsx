import { fetchFilteredPatients } from "@/app/lib/data";
import { DeletePatient, UpdatePatient, ViewPatient } from "./buttons";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const patients = await fetchFilteredPatients(query, currentPage);

  

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {patients?.map((patient) => (
              <div
                key={patient.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <ViewPatient id={patient.id} />
                    <UpdatePatient id={patient.id} />
                    <DeletePatient id={patient.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-base font-black">
              <tr>
                <th scope="col" className="px-3 py-5">
                  Documento
                </th>

                <th scope="col" className="px-3 py-5">
                  Nombres
                </th>
                <th scope="col" className="px-3 py-5 ">
                  Apellidos
                </th>

                <th scope="col" className="px-3 py-5">
                  Genero
                </th>
                <th scope="col" className="px-3 py-5 ">
                  Telefono
                </th>

                <th scope="col" className="px-3 py-5">
                  Correo
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {patients?.map((patient) => (
                <tr
                  key={patient.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {patient.n_documento}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {patient.nombres}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {patient.apellidos}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {patient.genero}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {patient.telefono}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {patient.correo}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewPatient id={patient.id} />
                      <UpdatePatient id={patient.id} />
                      <DeletePatient id={patient.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
