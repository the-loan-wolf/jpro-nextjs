import { atom } from "jotai";

const checkBoxToggleState = atom({
  enableMatric: false,
  enableInter: false,
  enableUG: false,
  enablePG: false,
  enablePHD: false,
});

const workField = atom(1);
const skillField = atom(1);
const qualificationField = atom(0);
const profilePicUrl = atom("");

export { checkBoxToggleState, workField, skillField, qualificationField, profilePicUrl };
