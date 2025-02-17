import { PropsWithChildren } from "react";
import { checkBoxToggleState } from "@/app/utils/globalStates";
import { useAtomValue } from "jotai";
import clsx from "clsx";

type Props = {
  id: "matricDiv" | "interDiv" | "ugDiv" | "pgDiv" | "phdDiv";
};
export default function QualificationFieldContainer({
  children,
  id,
}: PropsWithChildren<Props>) {
  const checkBoxState = useAtomValue(checkBoxToggleState);
  let fieldName = null;
  let checkBoxValue = null;
  if (id === "matricDiv") {
    fieldName = "Matric / 10th Details";
    checkBoxValue = checkBoxState.enableMatric;
  } else if (id === "interDiv") {
    fieldName = "Inter / 12th Details";
    checkBoxValue = checkBoxState.enableInter;
  } else if (id === "ugDiv") {
    fieldName = "UG Details";
    checkBoxValue = checkBoxState.enableUG;
  } else if (id === "pgDiv") {
    fieldName = "PG Details";
    checkBoxValue = checkBoxState.enablePG;
  } else if (id === "phdDiv") {
    fieldName = "PhD Details";
    checkBoxValue = checkBoxState.enablePHD;
  }

  return (
    <div
      id="matricDiv"
      className={clsx(
        {
          block: checkBoxValue,
          hidden: !checkBoxValue,
        },
        "py-3 border-b-2"
      )}
    >
      <div className="py-3">
        <p>{fieldName}</p>
      </div>
      {children}
    </div>
  );
}
