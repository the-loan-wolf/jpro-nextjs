"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/app/ui/resumeEntry/Header";
import PersonalInfo from "@/app/ui/resumeEntry/PersonalInfo";
import AddressInfo from "@/app/ui/resumeEntry/AddressInfo";
import EducationalInfo from "@/app/ui/resumeEntry/EducationalInfo";
import WorkInfo from "@/app/ui/resumeEntry/WorkInfo";
import SkillInfo from "@/app/ui/resumeEntry/SkillInfo";
import SubmitBtn from "@/app/ui/resumeEntry/SubmitBtn";

export default function Resume() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // this checks if user has already signed in or if not send them to login page
  useEffect(() => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    // console.log(loggedInUserId);
    if (!loggedInUserId) {
      router.push("/app/login"); // Redirect if not logged in
    } else {
      setIsLoading(false); // Set loading to false once user is authenticated
    }
  }, [router]);

  return (
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
        <SubmitBtn />
      </form>
    </div>
  );
}
