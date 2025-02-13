import { memo } from "react";

type Props = {
  id: string;
};

const CheckBoxEducation = memo(({ id }: Props) => {
  let label = null;
  if (id === "enableMatric") {
    label = "Add Matric / 10th Details";
  } else if (id === "enableInter") {
    label = "Add Inter / 12th Details";
  } else if (id === "enableUG") {
    label = "Add Undergraduate Details";
  } else if (id === "enablePG") {
    label = "Add Postgraduate Details";
  } else if (id === "enablePHD") {
    label = "Add PhD Details";
  }

  return (
    <div>
      <input type="checkbox" id={id} name={id} />
      <label htmlFor={id}> {label}</label>
    </div>
  );
});

CheckBoxEducation.displayName = "CheckBoxEducation";
export default CheckBoxEducation;
