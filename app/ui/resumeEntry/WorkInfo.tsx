import InputField from "./InputField";
import DateField from "./DateField";
import TextAreaField from "./TextAreaField";
import { useState } from "react";
import { addNewField } from "@/app/utils/Utils";
import ButtonAddField from "./ButtonAddField";

export default function WorkInfo(){
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
      <ButtonAddField clickHandler={clickHandler} id="workBtn" />
    </div>
  );
};