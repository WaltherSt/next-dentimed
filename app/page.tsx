import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex w-full h-screen text-sm justify-center items-center">

      
      <Link href={"/login"}>Log in</Link>
    </div>
  );
}
