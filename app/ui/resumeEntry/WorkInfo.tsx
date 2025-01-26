import InputField from "./InputField";
import DateField from "./DateField";
import TextAreaField from "./TextAreaField";
import { useState } from "react";
import { addNewField } from "@/app/utils/Utils";

const WorkInfo = () => {
  const [workFieldCount, setWorkFieldCount] = useState(1);

  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    addNewField(e, workFieldCount, setWorkFieldCount);
  }
  return (
    <div id="workInfo" className="py-3 border-b-2">
      <div id="workInfoChild">
        <InputField id="companyName" labelName="Company Name" />
        <InputField id="companyPost" labelName="Post" />
        <DateField date="joinDate" />
        <DateField date="lastDate" />
        <TextAreaField />
      </div>

      <button
        id="workBtn"
        type="button"
        className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
        onClick={clickHandler}
      >
        Add more company detail
      </button>
    </div>
  );
};
export default WorkInfo;
