import Link from "next/link";
import { useState } from "react";
import { isLoggedIn, logoutAndRedirect } from "@/app/utils/Utils";

export default function FloatingProfileBox() {
  const [floatingBoxState, setFloatingBoxState] = useState(false);
  const showFloatingBox = () => {
    setFloatingBoxState(true);
  };
  const hideFloatingBox = () => {
    setFloatingBoxState(false);
  };
  
  return (
    <div
      id="profile"
      className="px-5 w-full h-full"
      onPointerOver={showFloatingBox}
      onPointerOut={hideFloatingBox}
    >
      <p>Profile</p>
      <div
        id="profileDiv"
        className={`${
          floatingBoxState ? "visible" : "invisible"
        } backdrop-blur-sm backdrop-brightness-75 border border-slate-400 rounded-xl p-2 absolute w-40 right-1  top-10 flex flex-col justify-center items-center text-slate-100`}
      >
        {/* <div className="addResumeBtn">
                <button className="hover:text-red-400">Add Your Resume</button>
              </div> */}
        <Link href="/app/resume" className="hover:text-red-400">
          <p>Add Your Resume</p>
        </Link>
        {isLoggedIn() && (
          <>
            <Link href="/app/profile" className="hover:text-red-400">
              <p>Your Profile</p>
            </Link>
            <div id="LogoutBtn">
              <button className="hover:text-red-400" onClick={logoutAndRedirect}>
                Log Out?
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
