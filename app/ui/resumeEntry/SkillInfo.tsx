import { useState } from "react";
import InputField from "./InputField";
import { addNewField } from "@/app/utils/Utils";
import ButtonAddField from "./ButtonAddField";

const SkillInfo = () => {
  const [skillFieldCount, setSkillFieldCount] = useState(1);

  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    addNewField(e, skillFieldCount, setSkillFieldCount);
  }

  return (
    <div id="skillsInfo" className="py-3 border-b-2">
      <div id="skillInfoChild">
        <InputField id="skillName" labelName="Skill Name" />
        <InputField id="skillSource" labelName="Where you learned it from" />
        <InputField id="skillEx" labelName="Experience Time" />
      </div>
      <ButtonAddField clickHandler={clickHandler} id="skillBtn" />
    </div>
  );
};
export default SkillInfo;
