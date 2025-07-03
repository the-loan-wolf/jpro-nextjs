"use client";

import { useAtom } from "jotai";
import { resumeListings } from "../utils/globalStates";
import UserProfileBox from "./UserProfileBox";

export default function ResumeList() {
  const [listings] = useAtom(resumeListings);

  if (!listings) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-y-4">
      {listings.map((listing) => (
        <UserProfileBox
          key={listing.id}
          userData={{
            uid: listing.id,
            pic: listing.data.profilePicEle,
            name: `${listing.data.resumeFName} ${listing.data.resumeLName}`,
            occupation: listing.data.compPost,
            salary: listing.data.salary,
          }}
        />
      ))}
    </div>
  );
}
