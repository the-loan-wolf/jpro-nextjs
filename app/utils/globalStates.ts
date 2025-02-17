import { atom } from "jotai";

const checkBoxToggleState = atom({
  enableMatric: false,
  enableInter: false,
  enableUG: false,
  enablePG: false,
  enablePHD: false,
});

export { checkBoxToggleState };
