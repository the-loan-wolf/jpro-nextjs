import { useEffect, useState } from "react";
import ButtonAddField from "./ButtonAddField";
import { serverData, workField } from "@/app/utils/globalStates";
import { useAtom } from "jotai";
import InputFieldAddress from "./InputFieldAddress";

// Define the WorkField type
type WorkField = {
  [key: string]: string;
  value: string;
};

export default function WorkInfo() {
  const [workFieldCount, setWorkFieldCount] = useAtom(workField);
  const [serverDataState, setServerDataState] = useAtom(serverData);

  const [init, setInit] = useState<WorkField[]>([
    { companyName: "Company Name", value: "" },
    { compPost: "Post", value: "" },
    { joinDate: "Joining Date", value: "" },
    { lastDate: "Worked Till", value: "" },
    { workEx: "Want to describe your work there?", value: ""}
  ]);

  useEffect(() => {
    // console.log(serverDataState)
    const newInit: WorkField[] = [];
    for (let i = 0; i < workFieldCount; i++) {
      newInit.push(
        {
          [`companyName${i > 0 ? i : ""}`]: "Company Name",
          value:
            (serverDataState as Record<string, string | undefined>)[
              `companyName${i > 0 ? i : ""}`
            ] ?? "",
        },
        {
          [`compPost${i > 0 ? i : ""}`]: "Post",
          value:
            (serverDataState as Record<string, string | undefined>)[
              `compPost${i > 0 ? i : ""}`
            ] ?? "",
        },
        {
          [`joinDate${i > 0 ? i : ""}`]: "Joining Date",
          value:
            (serverDataState as Record<string, string | undefined>)[
              `joinDate${i > 0 ? i : ""}`
            ] ?? "",
        },
        {
          [`lastDate${i > 0 ? i : ""}`]: "Worked Till",
          value:
            (serverDataState as Record<string, string | undefined>)[
              `lastDate${i > 0 ? i : ""}`
            ] ?? "",
        },
        {
          [`workEx${i > 0 ? i : ""}`]: "Want to describe your work there?",
          value:
            (serverDataState as Record<string, string | undefined>)[
              `workEx${i > 0 ? i : ""}`
            ] ?? "",
        }
      );
    }
    setInit(newInit);
  }, [workFieldCount, serverDataState]);

  function updateAddressValue(
    states: WorkField[],
    key: string,
    newValue: string
  ): WorkField[] {
    return states.map((obj: WorkField) =>
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
    <div id="workInfo" className="py-3 border-b-2">
      <div id="workInfoChild">
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
        clickHandler={() => setWorkFieldCount((prev) => prev + 1)}
        id="workBtn"
      />
    </div>
  );
}
