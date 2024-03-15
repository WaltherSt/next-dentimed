import { fetchPatientsPages } from "@/app/lib/data";
import { barlow } from "@/app/ui/fonts";
import { CreatePatient } from "@/app/ui/patients/buttons";
import Pagination from "@/app/ui/patients/pagination";
import Table from "@/app/ui/patients/table";
import Search from "@/app/ui/seach";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPatientsPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${barlow.className} text-2xl`}>Pacientes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar paciente..." />
        <CreatePatient />
      </div>
      <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
