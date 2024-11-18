"use client";

import { getUserDetails } from "@/app/utils/firebase-fn";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { keyOrder } from "@/app/utils/keyOrder";
import ResumeTextDetail from "@/app/ui/ResumeTextDetail";

// type Params = {
//   id: string;
// };

type ResumeData = {
  [key: string]: any; // Allows dynamic fields
};

export default function User() {
  // const { id } = params;
  const getParams = useParams<{ id: string }>();
  const id = getParams.id;
  const [profilePic, setProfilePic] = useState("");
  const [profileName, setProfileName] = useState("");
  const [data, setData] = useState<ResumeData>();
  useEffect(() => {
    // const userData = await getUserDetails(id);
    // const userData = getUserDetails(id);
    // console.log(userData);
    // parseData(userData);
    // userData.then((data) => {parseData(data)})
    getUserDetails(id).then((data) => {
      // setData(data);
      // console.log(typeof(data));
      // console.log(data);
      parseData(data);
    });
  }, []);

  function parseData(data: ResumeData): void {
    // Separate the keys based on the order list
    // const orderedKeys = keyOrder.filter((key) => key in data); // Keys in the order list
    // console.log(`keyOrder: ${keyOrder}`);
    // console.log(`orderedKeys: ${orderedKeys}`)
    const remainingKeys = Object.keys(data).filter(
      (key) => !keyOrder.includes(key)
    ); // Remaining keys

    // Combine keys for rendering: ordered first, then remaining
    const finalKeys = [...keyOrder, ...remainingKeys];
    // console.log(finalKeys);
    // Step 2: Sort the array based on the order of keys in `orderedKeys`
    const entries = Object.entries(data);
    const sortedEntries = entries.sort(([keyA], [keyB]) => {
      return finalKeys.indexOf(keyA) - finalKeys.indexOf(keyB);
    });
    // Convert back to an object (if needed)
    const sortedObject = Object.fromEntries(sortedEntries);
    console.log(sortedObject);
    setData(sortedObject);
    setProfilePic(sortedObject["profilePicEle"]);
    setProfileName(sortedObject["resumeFName"]);
  }

  return (
    // <p>user {id} resume</p>
    <main className="mt-5">
      <div id="resume-data" className="flex flex-col md:flex-row">
        <div
          id="profilePicDiv"
          className="basis-1/3 h-[90vh] flex flex-col justify-center items-center"
        >
          <Image
            src={profilePic || "/image-profile.jpg"}
            width={400}
            height={500}
            alt=""
            className="w-36 rounded-full md:rounded-2xl m-3"
          />
          <p>{profileName || "Name..."}</p>
        </div>
        <div
          id="profileData"
          className="basis-2/3 h-[90vh] overflow-y-scroll scroll-smooth"
        >
          {
            // data &&
            // for (const i in data){
            //   <ResumeTextDetail key={key} value={data[key]} />
            // }
            data &&
              Object.entries(data).map(([key, value]) => (
                <ResumeTextDetail key={key} keyName={key} value={value} />
              ))
            // jsxElements &&
            // jsxElements.map(key => key)
          }
        </div>
      </div>
    </main>
  );
}
