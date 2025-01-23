"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/app/ui/resumeEntry/Header";
import InputField from "@/app/ui/resumeEntry/InputField";
import PersonalInfo from "@/app/ui/resumeEntry/PersonalInfo";
import AddressInfo from "@/app/ui/resumeEntry/AddressInfo";
import EducationalInfo from "@/app/ui/resumeEntry/EducationalInfo";
import WorkInfo from "@/app/ui/resumeEntry/WorkInfo";
import SkillInfo from "@/app/ui/resumeEntry/SkillInfo";

export default function Resume() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state
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

  // Show loading or nothing until the authentication check is complete or fetching of document is complete
  // if (isLoading) {
  //   return <div>Loading...</div>; // Or just return null to render nothing
  // }

  return (
    // <p>enter your resume here!</p>
    <div id="formContainer" className="md:w-1/2 md:mx-auto">
      <Header Header="Add your resume here" />
      {/* <!-- ---------------------- FORM-------------------------------------------------------------- --> */}
      <form
        action="post"
        className="py-5 px-2 mb-5 md:border-2 md:rounded-xl font-poppins bg-white text-slate-900"
        id="myForm"
      >
        <PersonalInfo />
        <AddressInfo />
        <EducationalInfo />
        <WorkInfo />
        <SkillInfo />
        <button
          className="p-3 bg-amber-200 mt-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-amber-300 transition ease-in-out"
          id="submitResumeBtn"
          type="button"
        >
          Save Data
        </button>
      </form>
    </div>
  );
}
