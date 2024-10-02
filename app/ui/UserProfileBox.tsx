import Image from "next/image";

interface UserProps {
  userData: {
    uid: string;
    pic: string;
    name: string;
    occupation: string;
    salary: number;
  };
}

export default function UserProfileBox({userData}: UserProps) {
  return (
    <div
      id="client"
      className="w-40 h-60 relative rounded-2xl bg-slate-800/25 hover:-translate-y-1 hover:scale-110 hover:bg-amber-300 transition ease-in-out cursor-pointer"
      key={userData.uid}
    >
      <div className="flex flex-col items-center">
        <Image
          src={userData.pic}
          width={400}
          height={500}
          id="pic"
          alt=""
          className="p-2 rounded-2xl"
        />
        <p id="name">{userData.name}</p>
        <p id="occupation">{userData.occupation}</p>
        <p id="salary">₹{userData.salary}</p>
      </div>
      <div className="absolute inset-0 pointer-events-none border rounded-xl border-white/5"></div>
    </div>
  );
}
