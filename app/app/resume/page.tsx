"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/app/ui/resumeEntry/Header";
import ProfilePicUpload from "@/app/ui/resumeEntry/ProfilePicUpload";
import InputField from "@/app/ui/resumeEntry/InputField";

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
        {/* <!-- ---------------------- Personal Info -------------------------------------------------------------- --> */}
        <ProfilePicUpload />
        <div id="personalInfo" className="border-b-2 p-3">
          <div className="py-3">
            <InputField id="resumeFName" labelName="First Name" />
            <InputField id="resumeMName" labelName="Middle Name" />
            <InputField id="resumeLName" labelName="Last Name" />
          </div>

          <div className="py-3 flex justify-between">
            <label htmlFor="resumeDOB">Date of Birth</label>
            <input
              type="date"
              id="resumeDOB"
              name="resumeDOB"
              className="border rounded px-2 focus:outline-none"
            />
          </div>

          <div className="py-3 flex justify-between">
            <label htmlFor="resumePhoneNo">Phone Number</label>
            <input
              type="tel"
              id="resumePhoneNo"
              name="resumePhoneNo"
              pattern="[0-9]{10}"
              title="Example: 1234567895"
              maxLength={10}
              className="border rounded px-2 focus:outline-none"
              required
            />
          </div>

          <InputField id="resumeFatherName" labelName="Father Name" />
          <InputField id="resumeMotherName" labelName="Mother Name" />
          <InputField
            id="salary"
            labelName="How much money you want to work for?"
          />
        </div>
        {/* <!-- ----------------- Address Info ----------------------------------------------------- --> */}
        <div id="addressInfo" className="border-b-2 p-3">
          <div id="currentAddressPara">
            <p>Current Address</p>
          </div>
          <div id="currentAddress" className="py-3 border-b-2">
            <InputField id="resumeCountry" labelName="Country" />
            <InputField id="resumeState" labelName="State" />
            <InputField id="resumeDistrict" labelName="District" />
            <InputField id="resumePlace" labelName="City/Village" />

            <div className="py-3 flex justify-between">
              <label htmlFor="resumePin">Pin Code</label>
              <input
                type="text"
                id="resumePin"
                name="resumePin"
                pattern="[0-9]{6}"
                title="Example: 123456"
                maxLength={6}
                className="border rounded px-2 focus:outline-none"
              />
            </div>

            <InputField id="resumeAddr" labelName="Remaining Address" />
          </div>
          <div id="parmanentAddressPara" className="py-3">
            <p>Parmanent Address</p>
          </div>
          <div className="py-3">
            <input type="checkbox" id="sameAddress" name="sameAddress" />
            <label htmlFor="sameAddress">Same as Current Address?</label>
          </div>
          <div id="parmanentAddress" className="py-3">
            <InputField id="resumePCountry" labelName="Country" />
            <InputField id="resumePState" labelName="State" />
            <InputField id="resumePDistrict" labelName="District" />
            <InputField id="resumePPlace" labelName="City/Village" />

            <div className="py-3 flex justify-between">
              <label htmlFor="resumePPin">Pin Code</label>
              <input
                type="text"
                id="resumePPin"
                name="resumePPin"
                pattern="[0-9]{6}"
                title="Example: 123456"
                maxLength={6}
                className="border rounded px-2 focus:outline-none"
              />
            </div>

            <InputField id="resumePAddr" labelName="Remaining Address" />
          </div>
        </div>
        {/* <!-- ----------------- Educational Info ----------------------------------------------------- --> */}
        <div id="educationalInfo" className="py-3 border-b-2">
          <div>
            <p>Educational</p>
          </div>
          <div>
            <input type="checkbox" id="enableMatric" name="enableMatric" />
            <label htmlFor="enableMatric">Add Matric / 10th Details</label>
          </div>
          <div
            id="matricDiv"
            className="py-3 border-b-2"
            style={{ display: "none" }}
          >
            <div className="py-3">
              <p>Matric / 10th Details</p>
            </div>
            <InputField id="matricInstName" labelName="Institute Name" />
            <InputField id="matricBoard" labelName="Board" />
            <InputField
              id="matricMarks"
              labelName="Marks / Percentage Obtained"
            />
          </div>
          <div>
            <input type="checkbox" id="enableInter" name="enableInter" />
            <label htmlFor="enableInter">Add Inter / 12th Details</label>
          </div>
          <div
            id="interDiv"
            className="py-3 border-b-2"
            style={{ display: "none" }}
          >
            <div className="py-3">
              <p>Inter / 12th Details</p>
            </div>
            <InputField id="interInstName" labelName="Institute Name" />
            <InputField id="interBoard" labelName="Board" />
            <InputField
              id="interMarks"
              labelName="Marks / Percentage Obtained"
            />
          </div>
          <div>
            <input type="checkbox" id="enableUG" name="enableUG" />
            <label htmlFor="enableUG">Add Undergraduate Details</label>
          </div>
          <div
            id="ugDiv"
            className="py-3 border-b-2"
            style={{ display: "none" }}
          >
            <div className="py-3">
              <p>UG Details</p>
            </div>
            <InputField id="ugInstName" labelName="Institute Name" />
            <InputField id="ugBoard" labelName="Board" />
            <InputField id="ugMarks" labelName="Marks / Percentage Obtained" />
          </div>
          <div>
            <input type="checkbox" id="enablePG" name="enablePG" />
            <label htmlFor="enablePG">Add Postgraduate Details</label>
          </div>
          <div
            id="pgDiv"
            className="py-3 border-b-2"
            style={{ display: "none" }}
          >
            <div className="py-3">
              <p>PG Details</p>
            </div>
            <InputField id="pgInstName" labelName="Institute Name" />
            <InputField id="pgBoard" labelName="Board" />
            <InputField id="pgMarks" labelName="Marks / Percentage Obtained" />
          </div>
          <div>
            <input type="checkbox" id="enablePHD" name="enablePHD" />
            <label htmlFor="enablePHD">Add PhD Details</label>
          </div>
          <div id="phdDiv" className="py-3" style={{ display: "none" }}>
            <div className="py-3">
              <p>PhD Details</p>
            </div>
            <InputField id="phdInstName" labelName="Institute Name" />
            <InputField id="phdBoard" labelName="Board" />
            <InputField id="phdMarks" labelName="Marks / Percentage Obtained" />
          </div>
          <button
            className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
            id="addQualificationBtn"
            type="button"
          >
            Add any other Qualification
          </button>
        </div>
        {/* <!-- ----------------- Work Info ----------------------------------------------------- --> */}
        <div id="workInfo" className="py-3 border-b-2">
          <div id="workInfoChild">
            <InputField id="companyName" labelName="Company Name" />
            <InputField id="companyPost" labelName="Post" />
            <div className="py-3 flex justify-between">
              <label htmlFor="joinDate">Joining Date</label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="lastDate">Worked Till</label>
              <input
                type="date"
                id="lastDate"
                name="lastDate"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="workEx">Want to describe your work there?</label>
              <textarea
                // type="text"
                id="workEx"
                name="workEx"
                className="border rounded px-2 focus:outline-none"
              ></textarea>
            </div>
          </div>

          <button
            id="workBtn"
            type="button"
            className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
          >
            Add more company detail
          </button>
        </div>
        {/* <!-- ----------------- Skill Info ----------------------------------------------------- --> */}
        <div id="skillsInfo" className="py-3 border-b-2">
          <div id="skillInfoChild">
            <InputField id="skillName" labelName="Skill Name" />
            <InputField
              id="skillSource"
              labelName="Where you learned it from"
            />
            <InputField id="skillEx" labelName="Experience Time" />
          </div>
          <button
            id="skillBtn"
            type="button"
            className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
          >
            Add more Skill
          </button>
        </div>
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
