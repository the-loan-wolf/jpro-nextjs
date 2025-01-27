import { useState, useEffect } from "react";
import ButtonAddField from "./ButtonAddField";
import CheckBoxEducation from "./CheckBoxEducation";
import InputField from "./InputField";
import QualificationFieldContainer from "./QualificationFieldContainer";
import QualificationExtraField from "./QualificationExtraField";

export default function EducationalInfo() {
  const [qualificationField, setQualificationField] = useState(0);
  const [extraField, setExtraField] = useState<JSX.Element[]>([]);
  function clickHandler() {
    addNewField();
  }
  function addNewField() {
    setQualificationField((prevValue) => prevValue + 1);
  }

  useEffect(() => {
    if (qualificationField === 0) return; // Prevent initial render issue
  
    setExtraField((prevExtraField) => [
      ...prevExtraField,
      <QualificationExtraField key={qualificationField} id={qualificationField} />,
    ]);
  }, [qualificationField]);

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
      {extraField}
      <ButtonAddField id="qualificationBtn" clickHandler={clickHandler} />
    </div>
  );
}
