import InputField from "./InputField";

const EducationalInfo = () => {
  return (
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
        <InputField id="matricInstName" labelName="Institute Name" />
        <InputField id="matricBoard" labelName="Board" />
        <InputField id="matricMarks" labelName="Marks / Percentage Obtained" />
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
        <InputField id="interInstName" labelName="Institute Name" />
        <InputField id="interBoard" labelName="Board" />
        <InputField id="interMarks" labelName="Marks / Percentage Obtained" />
      </div>
      <div>
        <input type="checkbox" id="enableUG" name="enableUG" />
        <label htmlFor="enableUG">Add Undergraduate Details</label>
      </div>
      <div id="ugDiv" className="py-3 border-b-2" style={{ display: "none" }}>
        <div className="py-3">
          <p>UG Details</p>
        </div>
        <InputField id="ugInstName" labelName="Institute Name" />
        <InputField id="ugBoard" labelName="Board" />
        <InputField id="ugMarks" labelName="Marks / Percentage Obtained" />
      </div>
      <div>
        <input type="checkbox" id="enablePG" name="enablePG" />
        <label htmlFor="enablePG">Add Postgraduate Details</label>
      </div>
      <div id="pgDiv" className="py-3 border-b-2" style={{ display: "none" }}>
        <div className="py-3">
          <p>PG Details</p>
        </div>
        <InputField id="pgInstName" labelName="Institute Name" />
        <InputField id="pgBoard" labelName="Board" />
        <InputField id="pgMarks" labelName="Marks / Percentage Obtained" />
      </div>
      <div>
        <input type="checkbox" id="enablePHD" name="enablePHD" />
        <label htmlFor="enablePHD">Add PhD Details</label>
      </div>
      <div id="phdDiv" className="py-3" style={{ display: "none" }}>
        <div className="py-3">
          <p>PhD Details</p>
        </div>
        <InputField id="phdInstName" labelName="Institute Name" />
        <InputField id="phdBoard" labelName="Board" />
        <InputField id="phdMarks" labelName="Marks / Percentage Obtained" />
      </div>
      <button
        className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
        id="addQualificationBtn"
        type="button"
      >
        Add any other Qualification
      </button>
    </div>
  );
};
export default EducationalInfo;
