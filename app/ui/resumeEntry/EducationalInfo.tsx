import { ChangeEvent, useEffect, useState } from "react";
import ButtonAddField from "./ButtonAddField";
import CheckBoxEducation from "./CheckBoxEducation";
import QualificationFieldContainer from "./QualificationFieldContainer";
import QualificationExtraField from "./QualificationExtraField";
import { qualificationField, serverData } from "@/app/utils/globalStates";
import { useAtom } from "jotai";
import InputFieldAddress from "./InputFieldAddress";

export default function EducationalInfo() {
  const [qualificationFieldCount, setQualificationFieldCount] =
    useAtom(qualificationField);
  const [serverDataState, setServerDataState] = useAtom(serverData);
  const [inputState, setInputState] = useState({
    matricInstName: "",
    matricBoard: "",
    matricMarks: "",
    interInstName: "",
    interBoard: "",
    interMarks: "",
    ugInstName: "",
    ugBoard: "",
    ugMarks: "",
    pgInstName: "",
    pgBoard: "",
    pgMarks: "",
    phdInstName: "",
    phdBoard: "",
    phdMarks: "",
  });

  const inputHandler = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    setInputState((prev) => ({
      ...prev,
      [id]: event.target.value,
    }));
  };

  useEffect(() => {
    setInputState({
      matricInstName: serverDataState.matricInstName ?? "",
      matricBoard: serverDataState.matricBoard ?? "",
      matricMarks: serverDataState.matricMarks ?? "",
    
      interInstName: serverDataState.interInstName ?? "",
      interBoard: serverDataState.interBoard ?? "",
      interMarks: serverDataState.interMarks ?? "",
    
      ugInstName: serverDataState.ugInstName ?? "",
      ugBoard: serverDataState.ugBoard ?? "",
      ugMarks: serverDataState.ugMarks ?? "",
    
      pgInstName: serverDataState.pgInstName ?? "",
      pgBoard: serverDataState.pgBoard ?? "",
      pgMarks: serverDataState.pgMarks ?? "",
    
      phdInstName: serverDataState.phdInstName ?? "",
      phdBoard: serverDataState.phdBoard ?? "",
      phdMarks: serverDataState.phdMarks ?? ""
    });
    
  }, [serverDataState]);

  return (
    <div id="educationalInfo" className="py-3 border-b-2">
      <div>
        <p>Educational</p>
      </div>
      <CheckBoxEducation id="enableMatric" />
      <QualificationFieldContainer id="matricDiv">
        <InputFieldAddress
          id="matricInstName"
          labelName="Institute Name"
          value={inputState.matricInstName}
          inputHandler={(e) => inputHandler(e, "matricInstName")}
        />
        <InputFieldAddress
          id="matricBoard"
          labelName="Board"
          value={inputState.matricBoard}
          inputHandler={(e) => inputHandler(e, "matricBoard")}
        />
        <InputFieldAddress
          id="matricMarks"
          labelName="Marks / Percentage Obtained"
          value={inputState.matricMarks}
          inputHandler={(e) => inputHandler(e, "matricMarks")}
        />
      </QualificationFieldContainer>
      <CheckBoxEducation id="enableInter" />
      <QualificationFieldContainer id="interDiv">
        <InputFieldAddress
          id="interInstName"
          labelName="Institute Name"
          value={inputState.interInstName}
          inputHandler={(e) => inputHandler(e, "interInstName")}
        />
        <InputFieldAddress
          id="interBoard"
          labelName="Board"
          value={inputState.interBoard}
          inputHandler={(e) => inputHandler(e, "interBoard")}
        />
        <InputFieldAddress
          id="interMarks"
          labelName="Marks / Percentage Obtained"
          value={inputState.interMarks}
          inputHandler={(e) => inputHandler(e, "interMarks")}
        />
      </QualificationFieldContainer>
      <CheckBoxEducation id="enableUG" />
      <QualificationFieldContainer id="ugDiv">
        <InputFieldAddress
          id="ugInstName"
          labelName="Institute Name"
          value={inputState.ugInstName}
          inputHandler={(e) => inputHandler(e, "ugInstName")}
        />
        <InputFieldAddress
          id="ugBoard"
          labelName="Board"
          value={inputState.ugBoard}
          inputHandler={(e) => inputHandler(e, "ugBoard")}
        />
        <InputFieldAddress
          id="ugMarks"
          labelName="Marks / Percentage Obtained"
          value={inputState.ugMarks}
          inputHandler={(e) => inputHandler(e, "ugMarks")}
        />
      </QualificationFieldContainer>
      <CheckBoxEducation id="enablePG" />
      <QualificationFieldContainer id="pgDiv">
        <InputFieldAddress
          id="pgInstName"
          labelName="Institute Name"
          value={inputState.pgInstName}
          inputHandler={(e) => inputHandler(e, "pgInstName")}
        />
        <InputFieldAddress
          id="pgBoard"
          labelName="Board"
          value={inputState.pgBoard}
          inputHandler={(e) => inputHandler(e, "pgBoard")}
        />
        <InputFieldAddress
          id="pgMarks"
          labelName="Marks / Percentage Obtained"
          value={inputState.pgMarks}
          inputHandler={(e) => inputHandler(e, "pgMarks")}
        />
      </QualificationFieldContainer>
      <CheckBoxEducation id="enablePHD" />
      <QualificationFieldContainer id="phdDiv">
        <InputFieldAddress
          id="phdInstName"
          labelName="Institute Name"
          value={inputState.phdInstName}
          inputHandler={(e) => inputHandler(e, "phdInstName")}
        />
        <InputFieldAddress
          id="phdBoard"
          labelName="Board"
          value={inputState.phdBoard}
          inputHandler={(e) => inputHandler(e, "phdBoard")}
        />
        <InputFieldAddress
          id="phdMarks"
          labelName="Marks / Percentage Obtained"
          value={inputState.phdMarks}
          inputHandler={(e) => inputHandler(e, "phdMarks")}
        />
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
