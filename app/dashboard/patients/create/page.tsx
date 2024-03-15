import Breadcrumbs from "@/app/ui/patients/breadcrumbs";
import Form from "@/app/ui/patients/create-form";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Pacientes", href: "/dashboard/patients" },
          {
            label: "Registro",
            href: "/dashboard/patients/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
