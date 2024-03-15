import { fetchPatients } from '@/app/lib/data';

import Breadcrumbs from '@/app/ui/patients/breadcrumbs';
import Form from '@/app/ui/patients/create-form';
 
export default async function Page() {
  const patients = await fetchPatients();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pacientes', href: '/dashboard/patients' },
          {
            label: 'Registro',
            href: '/dashboard/patients/create',
            active: true,
          },
        ]}
      />
            <Form   />
    </main>
  );
}