"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  if (isLoading) {
    return <div>Loading...</div>; // Or just return null to render nothing
  }

  return (
    // <p>enter your resume here!</p>
    <div id="formContainer" className="md:w-1/2 md:mx-auto">
      <h1 className="font-ebGaramond text-3xl font-bold text-white p-5">
        Add your resume here
      </h1>
      {/* <!-- ---------------------- FORM-------------------------------------------------------------- --> */}
      <form
        action="post"
        className="py-5 px-2 mb-5 md:border-2 md:rounded-xl font-poppins bg-white text-slate-900"
        id="myForm"
      >
        {/* <!-- ---------------------- Personal Info -------------------------------------------------------------- --> */}
        {/* <!-- upload profile pic --> */}
        <div className="flex flex-col md:flex-row items-center justify-center">
          <Image
            id="profilePicEle"
            src="/image-profile.jpg"
            width={300}
            height={300}
            alt=""
            className="w-36 rounded-full md:rounded-2xl m-3"
          />
          <div className="flex flex-col">
            <input type="file" id="profilePic" />
            <button
              id="profilePicBtn"
              className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
            >
              Upload Picture
            </button>
          </div>
        </div>
        <div id="personalInfo" className="border-b-2 p-3">
          <div className="py-3">
            <div className="py-1 flex justify-between">
              <label htmlFor="resumeFName">First Name</label>
              <input
                type="text"
                id="resumeFName"
                name="resumeFName"
                className="border rounded px-2 focus:outline-none"
              />
            </div>

            <div className="py-1 flex justify-between">
              <label htmlFor="resumeMName">Middle Name</label>
              <input
                type="text"
                id="resumeMName"
                name="resumeMName"
                className="border rounded px-2 focus:outline-none"
              />
            </div>

            <div className="py-1 flex justify-between">
              <label htmlFor="resumeLName">Last Name</label>
              <input
                type="text"
                id="resumeLName"
                name="resumeLName"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
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

          <div className="py-3 flex justify-between">
            <label htmlFor="resumeFatherName">Father Name</label>
            <input
              type="text"
              id="resumeFatherName"
              name="resumeFatherName"
              className="border rounded px-2 focus:outline-none"
            />
          </div>

          <div className="py-3 flex justify-between">
            <label htmlFor="resumeMotherName">Mother Name</label>
            <input
              type="text"
              id="resumeMotherName"
              name="resumeMotherName"
              className="border rounded px-2 focus:outline-none"
            />
          </div>

          <div className="py-3 flex justify-between">
            <label htmlFor="salary">
              How much money you want to work for?
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              className="border rounded px-2 focus:outline-none"
            />
          </div>
        </div>
        {/* <!-- ----------------- Address Info ----------------------------------------------------- --> */}
        <div id="addressInfo" className="border-b-2 p-3">
          <div id="currentAddressPara">
            <p>Current Address</p>
          </div>
          <div id="currentAddress" className="py-3 border-b-2">
            <div className="py-3 flex justify-between">
              <label htmlFor="resumeCountry">Country</label>
              <input
                type="text"
                id="resumeCountry"
                name="resumeCountry"
                className="border rounded px-2 focus:outline-none"
              />
            </div>

            <div className="py-3 flex justify-between">
              <label htmlFor="resumeState">State</label>
              <input
                type="text"
                id="resumeState"
                name="resumeState"
                className="border rounded px-2 focus:outline-none"
              />
            </div>

            <div className="py-3 flex justify-between">
              <label htmlFor="resumeDistrict">District</label>
              <input
                type="text"
                id="resumeDistrict"
                name="resumeDistrict"
                className="border rounded px-2 focus:outline-none"
              />
            </div>

            <div className="py-3 flex justify-between">
              <label htmlFor="resumePlace">City/Village</label>
              <input
                type="text"
                id="resumePlace"
                name="resumePlace"
                className="border rounded px-2 focus:outline-none"
              />
            </div>

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

            <div className="py-3 flex justify-between">
              <label htmlFor="resumeAddr">Remaining Address</label>
              <input
                type="text"
                id="resumeAddr"
                name="resumeAddr"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
          </div>
          <div id="parmanentAddressPara" className="py-3">
            <p>Parmanent Address</p>
          </div>
          <div className="py-3">
            <input type="checkbox" id="sameAddress" name="sameAddress" />
            <label htmlFor="sameAddress">Same as Current Address?</label>
          </div>
          <div id="parmanentAddress" className="py-3">
            <div className="py-3 flex justify-between">
              <label htmlFor="resumePCountry">Country</label>
              <input
                type="text"
                id="resumePCountry"
                name="resumePCountry"
                className="border rounded px-2 focus:outline-none"
              />
            </div>

            <div className="py-3 flex justify-between">
              <label htmlFor="resumePState">State</label>
              <input
                type="text"
                id="resumePState"
                name="resumePState"
                className="border rounded px-2 focus:outline-none"
              />
            </div>

            <div className="py-3 flex justify-between">
              <label htmlFor="resumePDistrict">District</label>
              <input
                type="text"
                id="resumePDistrict"
                name="resumePDistrict"
                className="border rounded px-2 focus:outline-none"
              />
            </div>

            <div className="py-3 flex justify-between">
              <label htmlFor="resumePPlace">City/Village</label>
              <input
                type="text"
                id="resumePPlace"
                name="resumePPlace"
                className="border rounded px-2 focus:outline-none"
              />
            </div>

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

            <div className="py-3 flex justify-between">
              <label htmlFor="resumePAddr">Remaining Address</label>
              <input
                type="text"
                id="resumePAddr"
                name="resumePAddr"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
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
            <div className="py-3 flex justify-between">
              <label htmlFor="matricInstName">Institute Name</label>
              <input
                type="text"
                id="matricInstName"
                name="matricInstName"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="matricBoard">Board</label>
              <input
                type="text"
                id="matricBoard"
                name="matricBoard"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="matricMarks">Marks / Percentage Obtained</label>
              <input
                type="text"
                id="matricMarks"
                name="matricMarks"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
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
            <div className="py-3 flex justify-between">
              <label htmlFor="interInstName">Institute Name</label>
              <input
                type="text"
                id="interInstName"
                name="interInstName"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="interBoard">Board</label>
              <input
                type="text"
                id="interBoard"
                name="interBoard"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="interMarks">Marks / Percentage Obtained</label>
              <input
                type="text"
                id="interMarks"
                name="interMarks"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
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
            <div className="py-3 flex justify-between">
              <label htmlFor="ugInstName">Institute Name</label>
              <input
                type="text"
                id="ugInstName"
                name="ugInstName"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="ugBoard">Board</label>
              <input
                type="text"
                id="ugBoard"
                name="ugBoard"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="ugMarks">Marks / Percentage Obtained</label>
              <input
                type="text"
                id="ugMarks"
                name="ugMarks"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
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
            <div className="py-3 flex justify-between">
              <label htmlFor="pgInstName">Institute Name</label>
              <input
                type="text"
                id="pgInstName"
                name="pgInstName"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="pgBoard">Board</label>
              <input
                type="text"
                id="pgBoard"
                name="pgBoard"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="pgMarks">Marks / Percentage Obtained</label>
              <input
                type="text"
                id="pgMarks"
                name="pgMarks"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <input type="checkbox" id="enablePHD" name="enablePHD" />
            <label htmlFor="enablePHD">Add PhD Details</label>
          </div>
          <div id="phdDiv" className="py-3" style={{ display: "none" }}>
            <div className="py-3">
              <p>PhD Details</p>
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="phdInstName">Institute Name</label>
              <input
                type="text"
                id="phdInstName"
                name="phdInstName"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="phdBoard">Board</label>
              <input
                type="text"
                id="phdBoard"
                name="phdBoard"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="phdMarks">Marks / Percentage Obtained</label>
              <input
                type="text"
                id="phdMarks"
                name="phdMarks"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
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
            <div className="py-3 flex justify-between">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="compPost">Post</label>
              <input
                type="text"
                id="compPost"
                name="compPost"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
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
            <div className="py-3 flex justify-between">
              <label htmlFor="skillName">Skill Name</label>
              <input
                type="text"
                id="skillName"
                name="skillName"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="skillSource">Where you learned it from</label>
              <input
                type="text"
                id="skillSource"
                name="skillSource"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
            <div className="py-3 flex justify-between">
              <label htmlFor="skillEx">Experience Time</label>
              <input
                type="text"
                id="skillEx"
                name="skillEx"
                className="border rounded px-2 focus:outline-none"
              />
            </div>
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
