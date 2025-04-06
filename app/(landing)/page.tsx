import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p>This will be our landing page!</p>
      <Link href="/app">
        <button className="min-w-[130px] h-10 text-white px-2.5 py-1 font-bold cursor-pointer transition-all duration-300 ease-in-out relative inline-block outline-none rounded-md border-none bg-[#3a86ff] shadow-[0_5px_#4433ff] hover:shadow-[0_3px_#4433ff] hover:top-[1px] active:shadow-[0_0_#4433ff] active:top-[5px]">
          Go to the App
        </button>
      </Link>
    </div>
  );
}
