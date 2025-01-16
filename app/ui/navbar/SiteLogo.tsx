import Link from "next/link";

export default function SiteLogo({isSearchMobileVisible}:{isSearchMobileVisible: boolean}){
    return(
        <>
        {/* site logo*/}
        <Link
          href="/app"
          id="logo"
          className={`${isSearchMobileVisible ? "hidden" : "flex"} px-2`}
        >
          <h1 id="siteLogo" className="font-semibold text-2xl">
            <span className="text-blue-500">Free</span>
            <span className="text-blue-600">Job</span>
            <span className="text-blue-700">Search</span>
          </h1>
        </Link>
        </>
    )
}