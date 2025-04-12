import { useEffect, useState } from "react";
import ButtonAddField from "./ButtonAddField";
import { serverData, skillField } from "@/app/utils/globalStates";
import { useAtom } from "jotai";
import InputFieldAddress from "./InputFieldAddress";

// Define the SkillField type
type SkillField = {
  [key: string]: string;
  value: string;
};

export default function SkillInfo() {
  const [skillFieldCount, setSkillFieldCount] = useAtom(skillField);
  const [serverDataState, setServerDataState] = useAtom(serverData);

  const [init, setInit] = useState<SkillField[]>([
    { skillName: "Skill Name", value: "" },
    { skillSource: "Where you learned it from", value: "" },
    { skillEx: "Experience Time", value: "" },
  ]);

  useEffect(() => {
    const newInit: SkillField[] = [];
    for (let i = 0; i < skillFieldCount; i++) {
      newInit.push(
        {
          [`skillName${i > 0 ? i : ""}`]: "Skill Name",
          value:
            (serverDataState as Record<string, string | undefined>)[
              `skillName${i > 0 ? i : ""}`
            ] ?? "",
        },
        {
          [`skillSource${i > 0 ? i : ""}`]: "Where you learned it from",
          value:
            (serverDataState as Record<string, string | undefined>)[
              `skillSource${i > 0 ? i : ""}`
            ] ?? "",
        },
        {
          [`skillEx${i > 0 ? i : ""}`]: "Experience Time",
          value:
            (serverDataState as Record<string, string | undefined>)[
              `skillEx${i > 0 ? i : ""}`
            ] ?? "",
        }
      );
    }
    setInit(newInit);
  }, [skillFieldCount, serverDataState]);

  function updateAddressValue(
    states: SkillField[],
    key: string,
    newValue: string
  ): SkillField[] {
    return states.map((obj: SkillField) =>
      Object.keys(obj).includes(key) ? { ...obj, value: newValue } : obj
    );
  }

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setInit(updateAddressValue(init, key, event.target.value));
  };

  return (
    <div id="skillsInfo" className="py-3 border-b-2">
      <div id="skillInfoChild">
        {init.map((obj, index) => {
          const key = Object.keys(obj)[0];
          const val = Object.values(obj)[0];
          return (
            <InputFieldAddress
              key={index}
              id={key}
              labelName={val}
              value={obj.value}
              inputHandler={(e) => inputHandler(e, key)}
            />
          );
        })}
      </div>
      <ButtonAddField
        clickHandler={() => setSkillFieldCount((prev) => prev + 1)}
        id="skillBtn"
      />
    </div>
  );
}
