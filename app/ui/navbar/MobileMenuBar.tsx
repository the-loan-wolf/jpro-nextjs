import Link from "next/link";
import { isLoggedIn, logoutAndRedirect } from "@/app/utils/Utils";

export default function MobileMenuBar({
  menuToggle,
  menuState,
}: {
  menuToggle: () => void;
  menuState: boolean;
}) {
  return (
    <div
      id="mobileHamMenu"
      className={`${
        menuState ? "flex" : "hidden"
      } fixed top-0 left-0 w-screen h-screen border-b bg-slate-900/80 backdrop-blur-sm z-50 flex-col gap-9 p-5 px-8`}
    >
      {/* header of mobile nav menu */}
      <div className="flex items-center justify-between gap-4 border-b pb-2">
        {/* logo inside mobile nav menu */}
        <Link href="/app" id="logoMenu" className="px-5" onClick={menuToggle}>
          <h1 className="font-semibold text-2xl">
            <span className="text-blue-500">Free</span>
            <span className="text-blue-600">Job</span>
            <span className="text-blue-700">Searcher</span>
          </h1>
        </Link>
        {/* mobile hamburger menu close button */}
        <button
          className="inline-block px-5"
          id="menuClose-btn"
          onClick={menuToggle}
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
      {/* Navigation items inside hamburger menu */}
      <nav className="flex flex-col items-center gap-6 text-2xl font-semibold">
        <Link href="/app/resume" onClick={menuToggle}>
          Add Your Resume
        </Link>
        {isLoggedIn() && (
          <>
            <Link href="/app/profile" className="hover:text-red-400">
              <p>Your Profile</p>
            </Link>
            <div id="LogoutBtn">
              <button
                className="hover:text-red-400"
                onClick={logoutAndRedirect}
              >
                Log Out?
              </button>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}
