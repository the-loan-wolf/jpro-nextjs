import Image from "next/image";
import Link from "next/link";

interface UserProps {
  userData: {
    uid: string;
    pic: string;
    name: string;
    occupation: string;
    salary: string;
  };
}

export default function UserProfileBox({ userData }: UserProps) {
  return (
    <div className="w-40 h-60 relative rounded-2xl bg-slate-800/25 hover:-translate-y-1 hover:scale-110 hover:bg-amber-300 transition ease-in-out cursor-pointer">
      <Link href={`/app/user/${userData.uid}`} prefetch={true}>
        <div className="flex flex-col items-center">
          <Image
            src={userData.pic}
            width={300}
            height={300}
            alt="profie pic"
            className="p-2 rounded-2xl"
          />
          <p>{userData.name}</p>
          <p>{userData.occupation}</p>
          <p>₹{userData.salary}</p>
        </div>
        <div className="absolute inset-0 pointer-events-none border rounded-xl border-white/5"></div>
      </Link>
    </div>
  );
}
