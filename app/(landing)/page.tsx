import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>This will be our landing page!</p>
      <Link href="/app">Go to The App</Link>
    </div>
  );
}
