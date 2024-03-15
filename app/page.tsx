import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex w-full h-screen text-sm justify-center items-center">
      <Link
        className="p-3 bg-sky-400 rounded text-white hover:bg-sky-500"
        href={"/login"}
      >
        Log in
      </Link>
    </div>
  );
}
