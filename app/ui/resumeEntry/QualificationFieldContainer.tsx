import { PropsWithChildren } from "react";

type Props = {
  id: string;
};
export default function QualificationFieldContainer({
  children,
  id,
}: PropsWithChildren<Props>) {
  let fieldName = null;
  if (id === "matricDiv") {
    fieldName = "Matric / 10th Details";
  } else if (id === "interDiv") {
    fieldName = "Inter / 12th Details";
  } else if (id === "ugDiv") {
    fieldName = "UG Details";
  } else if (id === "pgDiv") {
    fieldName = "PG Details";
  } else if (id === "phdDiv") {
    fieldName = "PhD Details";
  }
  return (
    <div id="matricDiv" className="py-3 border-b-2" style={{ display: "none" }}>
      <div className="py-3">
        <p>{fieldName}</p>
      </div>
      {children}
    </div>
  );
}
