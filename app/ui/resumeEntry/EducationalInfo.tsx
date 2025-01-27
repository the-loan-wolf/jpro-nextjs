import ButtonAddField from "./ButtonAddField";
import CheckBoxEducation from "./CheckBoxEducation";
import InputField from "./InputField";

const EducationalInfo = () => {
  return (
    <div id="educationalInfo" className="py-3 border-b-2">
      <div>
        <p>Educational</p>
      </div>
      <CheckBoxEducation id="enableMatric" />
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
        <InputField id="matricMarks" labelName="Marks / Percentage Obtained" />
      </div>
      <CheckBoxEducation id="enableInter" />
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
        <InputField id="interMarks" labelName="Marks / Percentage Obtained" />
      </div>
      <CheckBoxEducation id="enableUG" />
      <div id="ugDiv" className="py-3 border-b-2" style={{ display: "none" }}>
        <div className="py-3">
          <p>UG Details</p>
        </div>
        <InputField id="ugInstName" labelName="Institute Name" />
        <InputField id="ugBoard" labelName="Board" />
        <InputField id="ugMarks" labelName="Marks / Percentage Obtained" />
      </div>
      <CheckBoxEducation id="enablePG" />
      <div id="pgDiv" className="py-3 border-b-2" style={{ display: "none" }}>
        <div className="py-3">
          <p>PG Details</p>
        </div>
        <InputField id="pgInstName" labelName="Institute Name" />
        <InputField id="pgBoard" labelName="Board" />
        <InputField id="pgMarks" labelName="Marks / Percentage Obtained" />
      </div>
      <CheckBoxEducation id="enablePHD" />
      <div id="phdDiv" className="py-3" style={{ display: "none" }}>
        <div className="py-3">
          <p>PhD Details</p>
        </div>
        <InputField id="phdInstName" labelName="Institute Name" />
        <InputField id="phdBoard" labelName="Board" />
        <InputField id="phdMarks" labelName="Marks / Percentage Obtained" />
      </div>
      <ButtonAddField id="qualificationBtn" />
    </div>
  );
};
export default EducationalInfo;
