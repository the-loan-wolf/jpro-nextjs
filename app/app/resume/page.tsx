"use client";
import { useRouter } from "next/navigation";
import Header from "@/app/ui/resumeEntry/Header";
import PersonalInfo from "@/app/ui/resumeEntry/PersonalInfo";
import AddressInfo from "@/app/ui/resumeEntry/AddressInfo";
import EducationalInfo from "@/app/ui/resumeEntry/EducationalInfo";
import WorkInfo from "@/app/ui/resumeEntry/WorkInfo";
import SkillInfo from "@/app/ui/resumeEntry/SkillInfo";
import SubmitBtn from "@/app/ui/resumeEntry/SubmitBtn";
import { memo } from "react";
import { workField, skillField, qualificationField } from "@/app/utils/globalStates";
import { useAtomValue } from "jotai";

const Resume = memo(() => {
  const router = useRouter();
  
  const qualificationFieldCount = useAtomValue(qualificationField);
  const workFieldCount = useAtomValue(workField);
  const skillFieldCount = useAtomValue(skillField);

  if (typeof window !== "undefined") {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (!loggedInUserId) {
      router.push("/app/login"); // Redirect if not logged in
    }
  }

  function formHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    formValues["qualificationField"] = qualificationFieldCount.toString();
    formValues["workField"] = workFieldCount.toString();
    formValues["skillField"] = skillFieldCount.toString();
    // formValues["profilePicEle"] = profilePicUrl;

    console.log(formValues);
  }

  return (
    <div className="md:w-1/2 md:mx-auto">
      <Header Header="Add your resume here" />
      <form
        action="#"
        className="py-5 px-2 mb-5 md:border-2 md:rounded-xl font-poppins bg-white text-slate-900"
        onSubmit={formHandler}
      >
        <PersonalInfo />
        <AddressInfo />
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
