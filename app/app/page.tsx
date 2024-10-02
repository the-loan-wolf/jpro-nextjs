"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserProfileBox from "../ui/UserProfileBox";

export default function App() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    // console.log(loggedInUserId);
    if (!loggedInUserId) {
      router.replace("/app/login"); // Redirect if not logged in
    } else {
      setIsLoading(false); // Set loading to false once user is authenticated
    }
  }, [router]);

  // Show loading or nothing until the authentication check is complete
  if (isLoading) {
    return <div>Loading...</div>; // Or just return null to render nothing
  }

  return (
    <>
      {/* <p>Our app homepage</p> */}
      <main className="mt-5">
        <div
          id="user-container"
          className="flex justify-around flex-wrap gap-2"
        >
          <UserProfileBox
            userData={{
              uid: "hf548",
              pic: "/image-profile.jpg",
              name: "rishav",
              occupation: "software developer",
              salary: 10000,
            }}
          />
        </div>
      </main>
    </>
  );
}
