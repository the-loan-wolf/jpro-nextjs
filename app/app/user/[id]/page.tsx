import { getUserDetails } from "@/app/utils/firebase-fn";
import Image from "next/image";
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

// app/blog/[id]/page.tsx
type Props = {
  params: Promise<{ id: string }>;
};

export default async function User({ params }: Props) {
  const { id } = await params;

  let profilePic: string = "";
  let profileName: string = "";
  let videoLink: string = "";
  const primaryDetailsArray: JSX.Element[] = [];
  const addressDetailsArray: JSX.Element[] = [];
  const ParmanentaddressDetailsArray: JSX.Element[] = [];
  const matricDetailsArray: JSX.Element[] = [];
  const interDetailsArray: JSX.Element[] = [];
  const ugDetailsArray: JSX.Element[] = [];
  const pgDetailsArray: JSX.Element[] = [];
  const phdDetailsArray: JSX.Element[] = [];
  let qualificationDetailsArray: JSX.Element[] = [];
  let companyDetailsArray: JSX.Element[] = [];
  let skillDetailsArray: JSX.Element[] = [];

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

  try {
    const data = await getUserDetails(id);
    if (data && typeof data === "object") {
      if (data.vidIntro) {
        videoLink = data.vidIntro;
      }
      parseData(data);
    }
  } catch (error) {
    console.error(error);
  }

  function parseData(data: ResumeData): void {
    const formatedData = formatDataCorrectly(data);
    profilePic = formatedData["profilePicEle"];
    profileName = formatedData["resumeFName"];

    qualificationDetailsArray = Object.entries(formatedData).flatMap(
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
            <div key={key}>
              <ResumeTextDetail
                key={key}
                keyName={keyField.instMarks}
                value={value}
              />
              <br></br>
            </div>
          );
        }
        return []; // Return an empty array instead of `undefined`
      }
    );

    companyDetailsArray = Object.entries(formatedData).flatMap(
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
            <div key={key}>
              <ResumeTextDetail
                key={key}
                keyName={keyField.workEx}
                value={value}
              />
              <br></br>
            </div>
          );
        }
        return []; // Return an empty array instead of `undefined`
      }
    );

    skillDetailsArray = Object.entries(formatedData).flatMap(([key, value]) => {
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
          <div key={key}>
            <ResumeTextDetail
              key={key}
              keyName={keyField.skillEx}
              value={value}
            />
            <br></br>
          </div>
        );
      }
      return []; // Return an empty array instead of `undefined`
    });

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
          break;

        case "matricInstName":
        case "matricBoard":
        case "matricMarks":
          matricDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          break;

        case "interInstName":
        case "interBoard":
        case "interMarks":
          interDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          break;

        case "ugInstName":
        case "ugBoard":
        case "ugMarks":
          ugDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          break;

        case "pgInstName":
        case "pgBoard":
        case "pgMarks":
          pgDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          break;

        case "phdInstName":
        case "phdBoard":
        case "phdMarks":
          phdDetailsArray.push(
            <ResumeTextDetail key={key} keyName={keyField[key]} value={value} />
          );
          break;
      }
    });
  }

  function formatDataCorrectly(data: ResumeData): ResumeData {
    const finalKeys = addDynamicfield(data);
    // Step 2: Sort the Object based on the order of keys in `keyOrder`
    const entries = Object.entries(data); //First covert object into an array
    const sortedEntries = entries.sort(([keyA], [keyB]) => {
      return finalKeys.indexOf(keyA) - finalKeys.indexOf(keyB);
    });
    // Convert back to an object (if needed) // optimization needed! if we can use directly array then this function does not need to execute
    const sortedObject = Object.fromEntries(sortedEntries);
    // delete some entries(empty fields)
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
    const companyCount: number = data.workField;
    const skillCount: number = data.skillField;
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
    <main className="mt-5 flex sm:h-[90vh]">
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
          <p className="text-white uppercase font-bold text-lg font-ebGaramond">
            {profileName || "Name..."}
          </p>
          {videoLink && (
            <div>
              <iframe
                allowFullScreen={true}
                className="border-0 mt-2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                // title="Getting started | Video viewing basics"
                width="400"
                height="230"
                src={`https://www.youtube.com/embed/${videoLink}?autoplay=0&amp;cc_lang_pref=en&amp;cc_load_policy=1&amp;controls=2&amp;rel=0&amp;hl=en&amp;enablejsapi=1&amp;widgetid=1&vf=6`}
                id="widget2"
              ></iframe>
            </div>
          )}
        </div>
        <div
          id="profileData"
          className="basis-2/3 h-full md:overflow-y-scroll scroll-smooth flex flex-col lg:px-12 md:px-12"
        >
          {primaryDetailsArray.length > 0 ? (
            <UserDetailContainer fieldName="Primary Info">
              {primaryDetailsArray}
            </UserDetailContainer>
          ) : null}
          {addressDetailsArray.length > 0 ? (
            <UserDetailContainer fieldName="Address Info">
              {addressDetailsArray}
            </UserDetailContainer>
          ) : null}
          {ParmanentaddressDetailsArray.length > 0 ? (
            <UserDetailContainer fieldName="Parmanent Address Info">
              {ParmanentaddressDetailsArray}
            </UserDetailContainer>
          ) : null}
          {matricDetailsArray.length > 0 ? (
            <UserDetailContainer fieldName="Matric Info">
              {matricDetailsArray}
            </UserDetailContainer>
          ) : null}
          {interDetailsArray.length > 0 ? (
            <UserDetailContainer fieldName="Inter Info">
              {interDetailsArray}
            </UserDetailContainer>
          ) : null}
          {ugDetailsArray.length > 0 ? (
            <UserDetailContainer fieldName="Undergraduate Info">
              {ugDetailsArray}
            </UserDetailContainer>
          ) : null}
          {pgDetailsArray.length > 0 ? (
            <UserDetailContainer fieldName="Postgraduate Info">
              {pgDetailsArray}
            </UserDetailContainer>
          ) : null}
          {phdDetailsArray.length > 0 ? (
            <UserDetailContainer fieldName="Phd Info">
              {phdDetailsArray}
            </UserDetailContainer>
          ) : null}
          {qualificationDetailsArray.length > 0 ? (
            <UserDetailContainer fieldName="Other Qualification Info">
              {qualificationDetailsArray}
            </UserDetailContainer>
          ) : null}
          {companyDetailsArray.length > 0 ? (
            <UserDetailContainer fieldName="Work Experience">
              {companyDetailsArray}
            </UserDetailContainer>
          ) : null}
          {skillDetailsArray.length > 0 ? (
            <UserDetailContainer fieldName="Skills Info">
              {skillDetailsArray}
            </UserDetailContainer>
          ) : null}
        </div>
      </div>
    </main>
  );
}
