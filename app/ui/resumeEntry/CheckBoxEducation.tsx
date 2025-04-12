import { memo, useEffect } from "react";
import { checkBoxToggleState, serverData } from "@/app/utils/globalStates";
import { useAtom, useSetAtom } from "jotai";
import CheckBox from "../CheckBox";

type Props = {
  id: "enableMatric" | "enableInter" | "enableUG" | "enablePG" | "enablePHD";
};

const CheckBoxEducation = memo(({ id }: Props) => {
  const [checkboxState, setCheckboxState] = useAtom(checkBoxToggleState);
  const [serverDataState, setServerDataState] = useAtom(serverData);

  let label = null;
  let checkboxValue = false;

  if (id === "enableMatric") {
    label = "Add Matric / 10th Details";
    checkboxValue = checkboxState.enableMatric
  } else if (id === "enableInter") {
    label = "Add Inter / 12th Details";
    checkboxValue = checkboxState.enableInter
  } else if (id === "enableUG") {
    label = "Add Undergraduate Details";
    checkboxValue = checkboxState.enableUG
  } else if (id === "enablePG") {
    label = "Add Postgraduate Details";
    checkboxValue = checkboxState.enablePG
  } else if (id === "enablePHD") {
    label = "Add PhD Details";
    checkboxValue = checkboxState.enablePHD
  }

  const toggleHandler = () => {
    setCheckboxState((prevState) => {
      return { ...prevState, [id]: !prevState[id] };
    });
  };

  useEffect(()=>{
    setCheckboxState({
      enableMatric: serverDataState.enableMatric ?? false,
      enableInter: serverDataState.enableInter ?? false,
      enableUG: serverDataState.enableUG ?? false,
      enablePG: serverDataState.enablePG ?? false,
      enablePHD: serverDataState.enablePHD ?? false,
    })
  },[serverDataState]);

  return <CheckBox id={id} label={label} checked={checkboxValue} toggleHandler={toggleHandler} />;
});

CheckBoxEducation.displayName = "CheckBoxEducation";
export default CheckBoxEducation;
