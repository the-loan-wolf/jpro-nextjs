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
import UserDetailContainer from "@/app/ui/UserDetailContainer";

type ResumeData = {
  [key: string]: any; // Allows dynamic fields
};

export default function User() {
  const getParams = useParams<{ id: string }>();
  const id = getParams.id;
  const [profilePic, setProfilePic] = useState("");
  const [profileName, setProfileName] = useState("");
  // const [textFieldJSX, setTextFieldJSX] = useState<JSX.Element[]>();
  const [primaryState, setPrimaryState] = useState<JSX.Element[]>([]);
  const [addressState, setAddressState] = useState<JSX.Element[]>([]);
  const [parmanentAddressState, setParmanentAddressState] = useState<
    JSX.Element[]
  >([]);
  const [matricState, setMatricState] = useState<JSX.Element[]>([]);
  const [interState, setInterState] = useState<JSX.Element[]>([]);
  const [ugState, setUgState] = useState<JSX.Element[]>([]);
  const [pgState, setPgState] = useState<JSX.Element[]>([]);
  const [phdState, setPhdState] = useState<JSX.Element[]>([]);
  const [qualificationState, setQualificationState] = useState<JSX.Element[]>(
    []
  );
  const [companyState, setCompanyState] = useState<JSX.Element[]>([]);
  const [skillState, setSkillState] = useState<JSX.Element[]>([]);
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
    const fetchData = async ()=>{
      try{
        const data = await getUserDetails(id)
        if(data && typeof data === "object"){
          parseData(data);
        }
      }catch(error){
        console.error(error)
      }
    }
    fetchData();
  }, []);

  function parseData(data: ResumeData): void {
    // const keys = Object.keys(data); // remove this line when not needed
    // console.log(keys); // remove this line when not needed
    const formatedData = formatDataCorrectly(data);
    setProfilePic(formatedData["profilePicEle"]);
    setProfileName(formatedData["resumeFName"]);
    const primaryDetailsArray: JSX.Element[] = [];
    const addressDetailsArray: JSX.Element[] = [];
    const ParmanentaddressDetailsArray: JSX.Element[] = [];
    const matricDetailsArray: JSX.Element[] = [];
    const interDetailsArray: JSX.Element[] = [];
    const ugDetailsArray: JSX.Element[] = [];
    const pgDetailsArray: JSX.Element[] = [];
    const phdDetailsArray: JSX.Element[] = [];
    const qualificationDetailsArray: JSX.Element[] = Object.entries(formatedData).flatMap(
      ([key, value]) => {
        if (key.startsWith("degName")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.degName}
              value={value}
            />
          );
        }
        if (key.startsWith("instName")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.instName}
              value={value}
            />
          );
        }
        if (key.startsWith("instBoard")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.instBoard}
              value={value}
            />
          );
        }
        if (key.startsWith("instMarks")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.instMarks}
              value={value}
            />
          );
        }
        return []; // Return an empty array instead of `undefined`
      }
    );
    setQualificationState(qualificationDetailsArray);
    const companyDetailsArray: JSX.Element[] = Object.entries(formatedData).flatMap(
      ([key, value]) => {
        if (key.startsWith("companyName")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.companyName}
              value={value}
            />
          );
        }
        if (key.startsWith("compPost")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.compPost}
              value={value}
            />
          );
        }
        if (key.startsWith("joinDate")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.joinDate}
              value={value}
            />
          );
        }
        if (key.startsWith("lastDate")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.lastDate}
              value={value}
            />
          );
        }
        if (key.startsWith("workEx")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.workEx}
              value={value}
            />
          );
        }
        return []; // Return an empty array instead of `undefined`
      }
    );
    setCompanyState(companyDetailsArray);
    const skillDetailsArray: JSX.Element[] = Object.entries(formatedData).flatMap(
      ([key, value]) => {
        if (key.startsWith("skillName")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.skillName}
              value={value}
            />
          );
        }
        if (key.startsWith("skillSource")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.skillSource}
              value={value}
            />
          );
        }
        if (key.startsWith("skillEx")) {
          return (
            <ResumeTextDetail
              key={key}
              keyName={keyField.skillEx}
              value={value}
            />
          );
        }
        return []; // Return an empty array instead of `undefined`
      }
    );
    setSkillState(skillDetailsArray);
    // const textFields: JSX.Element[] = Object.entries(formatedData).map(
    //   ([key, value]) => {
    //     if (key === "profilePicEle") {
    //       return null;
    //     }
    //     if (key.startsWith("degName")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.degName}
    //           value={value}
    //         />
    //       );
    //     }
    //     if (key.startsWith("instName")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.instName}
    //           value={value}
    //         />
    //       );
    //     }
    //     if (key.startsWith("instBoard")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.instBoard}
    //           value={value}
    //         />
    //       );
    //     }
    //     if (key.startsWith("instMarks")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.instMarks}
    //           value={value}
    //         />
    //       );
    //     }
    //     if (key.startsWith("companyName")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.companyName}
    //           value={value}
    //         />
    //       );
    //     }
    //     if (key.startsWith("compPost")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.compPost}
    //           value={value}
    //         />
    //       );
    //     }
    //     if (key.startsWith("joinDate")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.joinDate}
    //           value={value}
    //         />
    //       );
    //     }
    //     if (key.startsWith("lastDate")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.lastDate}
    //           value={value}
    //         />
    //       );
    //     }
    //     if (key.startsWith("workEx")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.workEx}
    //           value={value}
    //         />
    //       );
    //     }
    //     if (key.startsWith("skillName")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.skillName}
    //           value={value}
    //         />
    //       );
    //     }
    //     if (key.startsWith("skillSource")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.skillSource}
    //           value={value}
    //         />
    //       );
    //     }
    //     if (key.startsWith("skillEx")) {
    //       return (
    //         <ResumeTextDetail
    //           key={key}
    //           keyName={keyField.skillEx}
    //           value={value}
    //         />
    //       );
    //     }
    //     // return (
    //     //   <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
    //     // );
    //   }
    // );
    Object.entries(formatedData).map(([key, value]) => {
      switch (key) {
        case "resumeFName":
        case "resumeMName":
        case "resumeLName":
        case "resumeDOB":
        case "resumePhoneNo":
        case "resumeFatherName":
        case "resumeMotherName":
        case "salary":
          primaryDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          setPrimaryState(primaryDetailsArray);
          break;
        case "resumeCountry":
        case "resumeState":
        case "resumeDistrict":
        case "resumePlace":
        case "resumePin":
        case "resumeAddr":
          addressDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          setAddressState(addressDetailsArray);
          break;
        case "resumePCountry":
        case "resumePState":
        case "resumePDistrict":
        case "resumePPlace":
        case "resumePPin":
        case "resumePAddr":
          ParmanentaddressDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          setParmanentAddressState(ParmanentaddressDetailsArray);
          break;
        case "matricInstName":
        case "matricBoard":
        case "matricMarks":
          matricDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          setMatricState(matricDetailsArray);
          break;
        case "interInstName":
        case "interBoard":
        case "interMarks":
          interDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          setInterState(interDetailsArray);
          break;
        case "ugInstName":
        case "ugBoard":
        case "ugMarks":
          ugDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          setUgState(ugDetailsArray);
          break;
        case "pgInstName":
        case "pgBoard":
        case "pgMarks":
          pgDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          setPgState(pgDetailsArray);
          break;
        case "phdInstName":
        case "phdBoard":
        case "phdMarks":
          phdDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          setPhdState(phdDetailsArray);
          break;
      }
    });

    // setTextFieldJSX(textFields);
    // console.log(qualificationState);
    // console.log(companyState);
    // console.log(skillState);
    // console.log(skillState.length);
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
          value != null && value !== "" && !stateField.includes(key)
      )
    );
    return finalData;
  }

  function addDynamicfield(data: ResumeData): Array<string> {
    const qualificationCount: number = data.qualificationField;
    // console.log(`qualificationCount: ${qualificationCount}`);
    const companyCount: number = data.workField;
    // console.log(`companyCount: ${companyCount}`);
    const skillCount: number = data.skillField;
    // console.log(`skillCount: ${skillCount}`);
    for (let i = 1; i <= qualificationCount; i++) {
      const newQualificationKeys = qualificationDetails.map((item) => item + i);
      keyOrder.push(...newQualificationKeys);
    }
    for (let i = 0; i < companyCount; i++) {
      const newCompanyKeys = companyDetails.map((item) =>
        i ? item + i : item
      );
      keyOrder.push(...newCompanyKeys);
    }
    for (let i = 0; i < skillCount; i++) {
      const newSkillKeys = skillDetails.map((item) => (i ? item + i : item));
      keyOrder.push(...newSkillKeys);
    }
    console.log(keyOrder);
    return keyOrder;
  }

  return (
    <main className="mt-5 flex h-[90vh]">
      <div id="resume-data" className="flex flex-col md:flex-row w-full">
        <div
          id="profilePicDiv"
          className="basis-1/3 h-full flex flex-col justify-center items-center"
        >
          <Image
            src={profilePic || "/image-profile.jpg"}
            width={300}
            height={300}
            alt=""
            className="w-36 rounded-full md:rounded-2xl m-3"
          />
          <p className="text-white uppercase">{profileName || "Name..."}</p>
        </div>
        <div
          id="profileData"
          className="basis-2/3 h-full overflow-y-scroll scroll-smooth flex flex-col px-12"
        >
          {primaryState.length > 0 ? (
            <UserDetailContainer fieldName="Primary Info">
              {primaryState}
            </UserDetailContainer>
          ) : null}
          {addressState.length > 0 ? (
            <UserDetailContainer fieldName="Address Info">
              {addressState}
            </UserDetailContainer>
          ) : null}
          {parmanentAddressState.length > 0 ? (
            <UserDetailContainer fieldName="Parmanent Address Info">
              {parmanentAddressState}
            </UserDetailContainer>
          ) : null}
          {matricState.length > 0 ? (
            <UserDetailContainer fieldName="Matric Info">
              {matricState}
            </UserDetailContainer>
          ) : null}
          {interState.length > 0 ? (
            <UserDetailContainer fieldName="Inter Info">
              {interState}
            </UserDetailContainer>
          ) : null}
          {ugState.length > 0 ? (
            <UserDetailContainer fieldName="Undergraduate Info">
              {ugState}
            </UserDetailContainer>
          ) : null}
          {pgState.length > 0 ? (
            <UserDetailContainer fieldName="Postgraduate Info">
              {pgState}
            </UserDetailContainer>
          ) : null}
          {phdState.length > 0 ? (
            <UserDetailContainer fieldName="Phd Info">
              {phdState}
            </UserDetailContainer>
          ) : null}
          {qualificationState.length > 0 ? (
            <UserDetailContainer fieldName="Other Qualification Info">
              {qualificationState}
            </UserDetailContainer>
          ) : null}
          {companyState.length > 0 ? (
            <UserDetailContainer fieldName="Work Experience">
              {companyState}
            </UserDetailContainer>
          ) : null}
          {skillState.length > 0 ? (
            <UserDetailContainer fieldName="Skills Info">
              {skillState}
            </UserDetailContainer>
          ) : null}
        </div>
      </div>
    </main>
  );
}
