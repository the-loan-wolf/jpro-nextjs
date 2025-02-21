import { useState } from "react";
import InputField from "./InputField";
import { addNewField } from "@/app/utils/Utils";
import ButtonAddField from "./ButtonAddField";
import { skillField } from "@/app/utils/globalStates";
import { useAtom } from "jotai";

export default function SkillInfo(){
  const [skillFieldCount, setSkillFieldCount] = useAtom(skillField);

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