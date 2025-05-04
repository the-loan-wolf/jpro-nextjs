import { PropsWithChildren } from "react";

type UserDetailContainerProps = {
  fieldName: string;
};

export default function UserDetailContainer({
  children,
  fieldName,
}: PropsWithChildren<UserDetailContainerProps>) {
  return (
    <div className="h-min p-2 mt-4 relative rounded-2xl bg-slate-800/25 hover:-translate-y-1 hover:scale-101 md:hover:scale-105 lg:hover:scale-105 transition ease-in-out">
      <div className="">
        <p className="font-semibold text-lg pb-1 text-white font-poppins">{fieldName}</p>
        {children}
      </div>
      <div className="absolute inset-0 pointer-events-none border rounded-xl border-white/5"></div>
    </div>
  );
}
