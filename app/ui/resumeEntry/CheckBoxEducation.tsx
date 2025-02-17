import { memo } from "react";
import { checkBoxToggleState } from "@/app/utils/globalStates";
import { useSetAtom } from "jotai";

type Props = {
  id: "enableMatric" | "enableInter" | "enableUG" | "enablePG" | "enablePHD";
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

  const setState = useSetAtom(checkBoxToggleState);

  const toggleHandler = () => {
    setState((prevState) => {
      return { ...prevState, [id]: !prevState[id] };
    });
  };

  return (
    <div>
      <input type="checkbox" id={id} name={id} onChange={toggleHandler} />
      <label htmlFor={id}> {label}</label>
    </div>
  );
});

CheckBoxEducation.displayName = "CheckBoxEducation";
export default CheckBoxEducation;
