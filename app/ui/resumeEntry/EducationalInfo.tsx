import { useCallback, useEffect, useState } from "react";
import ButtonAddField from "./ButtonAddField";
import CheckBoxEducation from "./CheckBoxEducation";
import InputField from "./InputField";
import QualificationFieldContainer from "./QualificationFieldContainer";
import QualificationExtraField from "./QualificationExtraField";
import { qualificationField } from "@/app/utils/globalStates";
import { useAtom } from "jotai";

export default function EducationalInfo() {
  const [qualificationFieldCount, setQualificationFieldCount] =
    useAtom(qualificationField);

  return (
    <div id="educationalInfo" className="py-3 border-b-2">
      <div>
        <p>Educational</p>
      </div>
      <CheckBoxEducation id="enableMatric" />
      <QualificationFieldContainer id="matricDiv">
        <InputField id="matricInstName" labelName="Institute Name" />
        <InputField id="matricBoard" labelName="Board" />
        <InputField id="matricMarks" labelName="Marks / Percentage Obtained" />
      </QualificationFieldContainer>
      <CheckBoxEducation id="enableInter" />
      <QualificationFieldContainer id="interDiv">
        <InputField id="interInstName" labelName="Institute Name" />
        <InputField id="interBoard" labelName="Board" />
        <InputField id="interMarks" labelName="Marks / Percentage Obtained" />
      </QualificationFieldContainer>
      <CheckBoxEducation id="enableUG" />
      <QualificationFieldContainer id="ugDiv">
        <InputField id="ugInstName" labelName="Institute Name" />
        <InputField id="ugBoard" labelName="Board" />
        <InputField id="ugMarks" labelName="Marks / Percentage Obtained" />
      </QualificationFieldContainer>
      <CheckBoxEducation id="enablePG" />
      <QualificationFieldContainer id="pgDiv">
        <InputField id="pgInstName" labelName="Institute Name" />
        <InputField id="pgBoard" labelName="Board" />
        <InputField id="pgMarks" labelName="Marks / Percentage Obtained" />
      </QualificationFieldContainer>
      <CheckBoxEducation id="enablePHD" />
      <QualificationFieldContainer id="phdDiv">
        <InputField id="phdInstName" labelName="Institute Name" />
        <InputField id="phdBoard" labelName="Board" />
        <InputField id="phdMarks" labelName="Marks / Percentage Obtained" />
      </QualificationFieldContainer>
      <div className="qualification-block">
        {Array.from({ length: qualificationFieldCount }, (_, i) => (
          <QualificationExtraField key={`qual-${i}`} id={i + 1} />
        ))}
      </div>
      <ButtonAddField
        id="qualificationBtn"
        clickHandler={() => setQualificationFieldCount((prev) => prev + 1)}
      />
    </div>
  );
}
