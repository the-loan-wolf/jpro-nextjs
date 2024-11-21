"use client";

import { getUserDetails } from "@/app/utils/firebase-fn";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { keyOrder, keyField } from "@/app/utils/keyOrder";
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
  const [textFieldJSX, setTextFieldJSX] = useState<JSX.Element[]>();

  useEffect(() => {
    getUserDetails(id).then((data) => {
      parseData(data);
    });
  }, []);

  function parseData(data: ResumeData): void {

    const formatedData = formatDataCorrectly(data);
    setProfilePic(formatedData["profilePicEle"]);
    setProfileName(formatedData["resumeFName"]);

    const textFields : JSX.Element[] = Object.entries(formatedData).map(([key, value]) => {
      if (key === "profilePicEle") {
        return null;
      }
      return <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />;
    })

    setTextFieldJSX(textFields);
  }

  function formatDataCorrectly(data: ResumeData): ResumeData {
    
    // delete some entries
    const finalData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) =>
          value != null && value !== "" && !["skillField", "qualificationField", "workField"].includes(key)
      )
    );
    

    // subtract the orderKey from raw data to get the remaining key
    const remainingKeys = Object.keys(finalData).filter(
      (key) => !keyOrder.includes(key)
    )
    // console.log(remainingKeys)

    // Again Combine keys so ordered key stays first then remaining keys
    const finalKeys = [...keyOrder, ...remainingKeys];
    // console.log(finalKeys);

    // Step 2: Sort the Object based on the order of keys in `keyOrder`
    const entries = Object.entries(finalData); //First covert object into an array
    const sortedEntries = entries.sort(([keyA], [keyB]) => {
      return finalKeys.indexOf(keyA) - finalKeys.indexOf(keyB);
    });
    console.log(sortedEntries);
    // Convert back to an object (if needed) // optimization needed! if we can use directly array then this function does not need to execute
    const sortedObject = Object.fromEntries(sortedEntries);
    // console.log(sortedObject);
    // setData(sortedObject);
    return sortedObject
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
            textFieldJSX
          }
        </div>
      </div>
    </main>
  );
}
