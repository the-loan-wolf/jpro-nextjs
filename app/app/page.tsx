"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserProfileBox from "../ui/UserProfileBox";
import { getDocument } from "../utils/firebase-fn";


export default function App() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [userProfiles, setUserProfiles] = useState<JSX.Element[]>([]);
  useEffect(() => {
    // Fetch documents only once when the component mounts
    getDocument().then((documents) => {
      console.log(documents);
      const userprofiles = documents.map((document) => (
        <UserProfileBox
          key={document.id}
          userData={{
            pic: document.profilePicEle,
            name: document.resumeFName + ' ' + document.resumeLName,
            occupation: document.compPost,
            salary: document.salary,
          }}
        />
      ));
      setUserProfiles(userprofiles);
      setIsLoading(false); // Stop loading once data is fetched
    });
  }, []);

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
          {userProfiles}
        </div>
      </main>
    </>
  );
}
