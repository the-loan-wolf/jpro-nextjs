"use client";

import { getUserDetails } from "@/app/utils/firebase-fn";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  stateField,
  keyField,
  primaryDetails,
  addressDetails,
  parmanentAddressDetails,
  matricDetails,
  interDetails,
  ugDetails,
  pgDetails,
  phdDetails,
  qualificationDetails,
  companyDetails,
  skillDetails,
} from "@/app/utils/keyOrder";
import ResumeTextDetail from "@/app/ui/ResumeTextDetail";

type ResumeData = {
  [key: string]: any; // Allows dynamic fields
};

export default function User() {
  const getParams = useParams<{ id: string }>();
  const id = getParams.id;
  const [profilePic, setProfilePic] = useState("");
  const [profileName, setProfileName] = useState("");
  const [textFieldJSX, setTextFieldJSX] = useState<JSX.Element[]>();
  const keyOrder = [
    ...primaryDetails,
    ...addressDetails,
    ...parmanentAddressDetails,
    ...matricDetails,
    ...interDetails,
    ...ugDetails,
    ...pgDetails,
    ...phdDetails,
  ];

  useEffect(() => {
    getUserDetails(id).then((data) => {
      parseData(data);
    });
  }, []);

  function parseData(data: ResumeData): void {
    const keys = Object.keys(data); // remove this line when not needed
    console.log(keys); // remove this line when not needed
    const formatedData = formatDataCorrectly(data);
    setProfilePic(formatedData["profilePicEle"]);
    setProfileName(formatedData["resumeFName"]);

    const textFields: JSX.Element[] = Object.entries(formatedData).map(
      ([key, value]) => {
        if (key === "profilePicEle") {
          return null;
        }
        if(key.startsWith("degName")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.degName} value={value} />
          );
        }
        if(key.startsWith("instName")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.instName} value={value} />
          );
        }
        if(key.startsWith("instBoard")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.instBoard} value={value} />
          );
        }
        if(key.startsWith("instMarks")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.instMarks} value={value} />
          );
        }
        if(key.startsWith("companyName")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.companyName} value={value} />
          );
        }
        if(key.startsWith("compPost")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.compPost} value={value} />
          );
        }
        if(key.startsWith("joinDate")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.joinDate} value={value} />
          );
        }
        if(key.startsWith("lastDate")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.lastDate} value={value} />
          );
        }
        if(key.startsWith("workEx")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.workEx} value={value} />
          );
        }
        if(key.startsWith("skillName")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.skillName} value={value} />
          );
        }
        if(key.startsWith("skillSource")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.skillSource} value={value} />
          );
        }
        if(key.startsWith("skillEx")){
          return (
            <ResumeTextDetail key={key} keyName={keyField.skillEx} value={value} />
          );
        }
        return (
          <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
        );
      }
    );

    setTextFieldJSX(textFields);
  }

  function formatDataCorrectly(data: ResumeData): ResumeData {

    const finalKeys = addDynamicfield(data);
    // Step 2: Sort the Object based on the order of keys in `keyOrder`
    // const entries = Object.entries(finalData); //First covert object into an array
    const entries = Object.entries(data); //First covert object into an array
    const sortedEntries = entries.sort(([keyA], [keyB]) => {
      return finalKeys.indexOf(keyA) - finalKeys.indexOf(keyB);
    });
    // console.log(sortedEntries);
    // Convert back to an object (if needed) // optimization needed! if we can use directly array then this function does not need to execute
    const sortedObject = Object.fromEntries(sortedEntries);
    // console.log(sortedObject);
    // setData(sortedObject);

    // delete some entries
    const finalData = Object.fromEntries(
      Object.entries(sortedObject).filter(
        ([key, value]) =>
          value != null &&
          value !== "" &&
          !stateField.includes(key)
      )
    );
    return finalData;
  }
  
  function addDynamicfield(data: ResumeData):Array<string> {
    const qualificationCount: number = data.qualificationField;
    console.log(`qualificationCount: ${qualificationCount}`)
    const companyCount: number = data.workField;
    console.log(`companyCount: ${companyCount}`)
    const skillCount: number = data.skillField;
    console.log(`skillCount: ${skillCount}`)
    for(let i = 1; i <= qualificationCount; i++){
      const newQualificationKeys = qualificationDetails.map(item => item + i);
      keyOrder.push(...newQualificationKeys);
    }
    for(let i = 0; i < companyCount; i++){
      const newCompanyKeys = companyDetails.map(item => i ? item + i : item);
      keyOrder.push(...newCompanyKeys);
    }
    for(let i = 0; i < skillCount; i++){
      const newSkillKeys = skillDetails.map(item => i ? item + i : item);
      keyOrder.push(...newSkillKeys);
    }
    console.log(keyOrder);
    return keyOrder;
  }

  return (
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
          {textFieldJSX}
        </div>
      </div>
    </main>
  );
}
