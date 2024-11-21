"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserProfileBox from "../ui/UserProfileBox";
import { getDocument } from "../utils/firebase-fn";


export default function App() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [userProfiles, setUserProfiles] = useState<JSX.Element[]>([]);

  // this checks if user has already signed in or if not send them to login page
  useEffect(() => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    // console.log(loggedInUserId);
    if (!loggedInUserId) {
      router.replace("/app/login"); // Redirect if not logged in
    } else {
      setIsLoading(false); // Set loading to false once user is authenticated
    }
  }, [router]);

  // fetch documents from firestore
  useEffect(() => {
    // Fetch documents only once when the component mounts
    getDocument().then((documents) => {
      // console.log(documents);
      const userprofiles = documents.map((document) => (
        <UserProfileBox
          key={document.id}
          userData={{
            uid: document.id,
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

  // Show loading or nothing until the authentication check is complete or fetching of document is complete
  if (isLoading) {
    return <div>Loading...</div>; // Or just return null to render nothing
  }

  return (
    <>
      {/* <p>Our app homepage</p> */}
      <main className="mt-5 flex justify-center ">
        <div
          id="user-container"
          className="flex justify-evenly flex-wrap gap-4 max-w-5xl"
        >
          {userProfiles}
        </div>
      </main>
    </>
  );
}
