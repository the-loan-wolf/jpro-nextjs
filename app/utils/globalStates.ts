import { atom } from "jotai";

const checkBoxToggleState = atom({
  enableMatric: false,
  enableInter: false,
  enableUG: false,
  enablePG: false,
  enablePHD: false,
});

export interface ServerDataShape {
  resumeFName?: string;
  resumeMName?: string;
  resumeLName?: string;
  resumeDOB?: string;
  resumePhoneNo?: string;
  resumeFatherName?: string;
  resumeMotherName?: string;
  salary?: string;
  sameAddress?: string;
}

const workField = atom(1);
const skillField = atom(1);
const qualificationField = atom(0);
const profilePicUrl = atom("");
const serverData = atom<ServerDataShape>({});

export { checkBoxToggleState, workField, skillField, qualificationField, profilePicUrl, serverData };
