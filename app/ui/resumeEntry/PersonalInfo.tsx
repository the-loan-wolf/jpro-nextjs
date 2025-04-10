import InputField from "@/app/ui/resumeEntry/InputField";
import InputFieldAddress from "./InputFieldAddress";
import { useEffect, useState } from "react";
import { serverData, ServerDataShape } from "@/app/utils/globalStates";
import { useAtom } from "jotai";

// Define the PersonalInfoState type
type PersonalInfoField = {
  [key: string]: string;
  value: string;
};

export default function PersonalInfo() {
  const [personalInfoState, setPersonalInfoState] = useState<
    PersonalInfoField[]
  >([
    { resumeFName: "First Name", value: "" },
    { resumeMName: "Middle Name", value: "" },
    { resumeLName: "Last Name", value: "" },
    { resumeDOB: "Date of Birth", value: "" },
    { resumePhoneNo: "Phone Number", value: "" },
    { resumeFatherName: "Father Name", value: "" },
    { resumeMotherName: "Mother Name", value: "" },
    { salary: "How much money you want to work for?", value: "" },
  ]);
  const [serverDataState, setServerDataState] = useAtom(serverData);

  const fieldKeys: (keyof ServerDataShape)[] = [
    "resumeFName",
    "resumeMName",
    "resumeLName",
    "resumeDOB",
    "resumePhoneNo",
    "resumeFatherName",
    "resumeMotherName",
    "salary",
  ];
  
  useEffect(() => {
    let updatedState = personalInfoState;
    for (const key of fieldKeys) {
      if(serverDataState[key]){
        updatedState = updateAddressValue(updatedState, key, serverDataState[key]);
      }
    }
    setPersonalInfoState(updatedState);
  }, [serverDataState]);

  function updateAddressValue(
    states: PersonalInfoField[],
    key: string,
    newValue: string
  ): PersonalInfoField[] {
    return states.map((obj: PersonalInfoField) =>
      Object.keys(obj).includes(key) ? { ...obj, value: newValue } : obj
    );
  }

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setPersonalInfoState(
      updateAddressValue(personalInfoState, id, e.target.value)
    );
  };
  return (
    <>
      <div id="personalInfo" className="border-b-2 p-3">
        <div className="py-3">
          <InputFieldAddress
            id="resumeFName"
            labelName="First Name"
            value={personalInfoState[0].value}
            inputHandler={(e) => inputHandler(e, "resumeFName")}
          />
          <InputFieldAddress
            id="resumeMName"
            labelName="Middle Name"
            value={personalInfoState[1].value}
            inputHandler={(e) => inputHandler(e, "resumeMName")}
          />
          <InputFieldAddress
            id="resumeLName"
            labelName="Last Name"
            value={personalInfoState[2].value}
            inputHandler={(e) => inputHandler(e, "resumeLName")}
          />
        </div>

        <div className="py-3 flex flex-wrap justify-between">
          <label htmlFor="resumeDOB">Date of Birth</label>
          <input
            type="date"
            id="resumeDOB"
            name="resumeDOB"
            value={personalInfoState[3].value}
            onChange={(e) => inputHandler(e, "resumeDOB")}
            className="border rounded px-2 focus:outline-none border-[#0f172A]"
          />
        </div>

        <div className="py-3 flex flex-wrap justify-between">
          <label htmlFor="resumePhoneNo">Phone Number</label>
          <input
            type="tel"
            id="resumePhoneNo"
            name="resumePhoneNo"
            pattern="[0-9]{10}"
            title="Example: 1234567895"
            maxLength={10}
            value={personalInfoState[4].value}
            onChange={(e) => inputHandler(e, "resumePhoneNo")}
            className="border rounded px-2 focus:outline-none border-[#0f172A]"
            required
          />
        </div>

        <InputFieldAddress
          id="resumeFatherName"
          labelName="Father Name"
          value={personalInfoState[5].value}
          inputHandler={(e) => inputHandler(e, "resumeFatherName")}
        />
        <InputFieldAddress
          id="resumeMotherName"
          labelName="Mother Name"
          value={personalInfoState[6].value}
          inputHandler={(e) => inputHandler(e, "resumeMotherName")}
        />
        <InputFieldAddress
          id="salary"
          labelName="How much money you want to work for?"
          value={personalInfoState[7].value}
          inputHandler={(e) => inputHandler(e, "salary")}
        />
      </div>
    </>
  );
}
