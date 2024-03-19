
import { getPatient } from "@/app/lib/actions";
import Breadcrumbs from "@/app/ui/patients/breadcrumbs";
import Form from "@/app/ui/patients/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await getPatient(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Pacientes", href: "/dashboard/patients" },
          {
            label: "Actualizar",
            href: `/dashboard/Patients/${id}/edit`,
            active: true,
          },
        ]}
      />
      {data != undefined ? <Form patient={data} /> : null}
    </main>
  );
}
