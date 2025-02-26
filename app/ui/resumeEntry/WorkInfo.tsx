import { useEffect, useState } from "react";
import ButtonAddField from "./ButtonAddField";
import { workField } from "@/app/utils/globalStates";
import { useAtom } from "jotai";
import InputFieldAddress from "./InputFieldAddress";

// Define the WorkField type
type WorkField = {
  [key: string]: string;
  value: string;
};

export default function WorkInfo() {
  const [workFieldCount, setWorkFieldCount] = useAtom(workField);

  const [init, setInit] = useState<WorkField[]>([
    { companyName: "Company Name", value: "" },
    { companyPost: "Post", value: "" },
    { joinDate: "Joining Date", value: "" },
    { lastDate: "Worked Till", value: "" },
  ]);

  useEffect(() => {
    const newInit: WorkField[] = [];
    for (let i = 0; i < workFieldCount; i++) {
      newInit.push(
        { [`companyName${i > 0 ? i : ""}`]: "Company Name", value: "" },
        {
          [`companyPost${i > 0 ? i : ""}`]: "Post",
          value: "",
        },
        { [`joinDate${i > 0 ? i : ""}`]: "Joining Date", value: "" },
        { [`lastDate${i > 0 ? i : ""}`]: "Worked Till", value: "" }
      );
    }
    setInit(newInit);
  }, [workFieldCount]);

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
