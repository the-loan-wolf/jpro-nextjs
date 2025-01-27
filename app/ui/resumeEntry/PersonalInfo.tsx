import ProfilePicUpload from "@/app/ui/resumeEntry/ProfilePicUpload";
import InputField from "@/app/ui/resumeEntry/InputField";

export default function PersonalInfo(){
  return (
    <>
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
    </>
  );
};