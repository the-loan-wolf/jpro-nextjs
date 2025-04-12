import { useAtom } from "jotai";
import InputField from "./InputField";
import { serverData } from "@/app/utils/globalStates";
import { ChangeEvent, useEffect, useState } from "react";
import InputFieldAddress from "./InputFieldAddress";

export default function QualificationExtraField({ id }: { id: number }) {
  const [serverDataState, setServerDataState] = useAtom(serverData);
  const [qualState, setQualState] = useState({
    degName: "",
    instName: "",
    instBoard: "",
    instMarks: "",
  });

  const inputHandler = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    setQualState((prev) => ({
      ...prev,
      [id]: event.target.value,
    }));
  };

  useEffect(() => {
    setQualState({
      degName: (serverDataState as Record<string, string | undefined>)[`degName${id}`] ?? "",
      instName: (serverDataState as Record<string, string | undefined>)[`instName${id}`] ?? "",
      instBoard: (serverDataState as Record<string, string | undefined>)[`instBoard${id}`] ?? "",
      instMarks: (serverDataState as Record<string, string | undefined>)[`instMarks${id}`] ?? "",
    });
  }, [serverDataState]);

  return (
    <div className="border-t-2">
      <InputFieldAddress
        id={`degName${id}`}
        labelName="Qualification Type"
        value={qualState.degName}
        inputHandler={(e) => inputHandler(e, "degName")}
      />
      <InputFieldAddress
        id={`instName${id}`}
        labelName="Institute Name"
        value={qualState.instName}
        inputHandler={(e) => inputHandler(e, "instName")}
      />
      <InputFieldAddress
        id={`instBoard${id}`}
        labelName="Board"
        value={qualState.instBoard}
        inputHandler={(e) => inputHandler(e, "instBoard")}
      />
      <InputFieldAddress
        id={`instMarks${id}`}
        labelName="Marks / Percentage Obtained"
        value={qualState.instMarks}
        inputHandler={(e) => inputHandler(e, "instMarks")}
      />
    </div>
  );
}
