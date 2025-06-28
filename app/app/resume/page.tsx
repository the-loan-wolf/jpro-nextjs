"use client";
import { useRouter } from "next/navigation";
import Header from "@/app/ui/resumeEntry/Header";
import PersonalInfo from "@/app/ui/resumeEntry/PersonalInfo";
import AddressInfo from "@/app/ui/resumeEntry/AddressInfo";
import EducationalInfo from "@/app/ui/resumeEntry/EducationalInfo";
import WorkInfo from "@/app/ui/resumeEntry/WorkInfo";
import SkillInfo from "@/app/ui/resumeEntry/SkillInfo";
import SubmitBtn from "@/app/ui/resumeEntry/SubmitBtn";
import ProfilePicUpload from "@/app/ui/resumeEntry/ProfilePicUpload";
import { memo, useEffect, useState } from "react";
import {
  workField,
  skillField,
  qualificationField,
  profilePicUrl,
  serverData,
} from "@/app/utils/globalStates";
import { useAtom, useAtomValue } from "jotai";
import {
  getUserDetails,
  firestoreDoc,
  uploadResume,
} from "@/app/utils/firebase-fn";

const Resume = memo(() => {
  const router = useRouter();

  // const qualificationFieldCount = useAtomValue(qualificationField);
  // const workFieldCount = useAtomValue(workField);
  // const skillFieldCount = useAtomValue(skillField);
  // const profilePicUrlString = useAtomValue(profilePicUrl);
  const [qualificationFieldCount, setQualificationFieldCount] =
    useAtom(qualificationField);
  const [workFieldCount, setWorkFieldCount] = useAtom(workField);
  const [skillFieldCount, setSkillFieldCount] = useAtom(skillField);
  const [profilePicUrlString, setProfilePicUrlString] = useAtom(profilePicUrl);
  const [serverDataState, setServerDataState] = useAtom(serverData);
  let loggedInUserId: string | null = null;
  const [disable, setDisable] = useState(false);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  if (typeof window !== "undefined") {
    loggedInUserId = localStorage.getItem("loggedInUserId");
    if (!loggedInUserId) {
      router.push("/app/login"); // Redirect if not logged in
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loggedInUserId) {
          const data = await getUserDetails(loggedInUserId);
          if (data && typeof data === "object") {
            parseData(data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const parseData = (data: firestoreDoc) => {
    setQualificationFieldCount(data.qualificationField);
    setWorkFieldCount(data.workField);
    setSkillFieldCount(data.skillField);
    setProfilePicUrlString(data.profilePicEle);
    setServerDataState(data);
  };

  function formHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisable(false);
    setShouldSubmit(true); // triggers effect to run submission later
  }

  useEffect(() => {
    if (shouldSubmit && !disable) {
      const form = document.querySelector("form") as HTMLFormElement;
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());
      formValues["qualificationField"] = qualificationFieldCount.toString();
      formValues["workField"] = workFieldCount.toString();
      formValues["skillField"] = skillFieldCount.toString();
      formValues["profilePicEle"] = profilePicUrlString;
      // Convert all string values to lowercase
      const lowerCaseValues = Object.fromEntries(
        Object.entries(formValues).map(([key, value]) => [
          key,
          typeof value === "string" ? value.toLowerCase() : value,
        ])
      );
      console.log(lowerCaseValues);
      setDisable(true); // here is a bug, checkbox and parmanent address input fields share common state, after changing state here wrong value is getting submited for checkbox
      loggedInUserId && uploadResume(loggedInUserId, lowerCaseValues);
      console.log(formValues);

      setShouldSubmit(false); // reset
    }
  }, [shouldSubmit, disable]);

  return (
    <div className="md:w-1/2 md:mx-auto">
      <Header Header="Add your resume here" />
      <form
        action="#"
        className="py-5 px-2 mb-5 md:border-2 md:rounded-xl font-poppins bg-white text-slate-900"
        onSubmit={formHandler}
      >
        <ProfilePicUpload />
        <PersonalInfo />
        <AddressInfo disable={disable} setDisable={setDisable} />
        <EducationalInfo />
        <WorkInfo />
        <SkillInfo />
        <SubmitBtn />
      </form>
    </div>
  );
});

Resume.displayName = "Resume";
export default Resume;
