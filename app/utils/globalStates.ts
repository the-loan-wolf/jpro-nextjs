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
  enableMatric?: boolean;
  enableInter?: boolean;
  enableUG?: boolean;
  enablePG?: boolean;
  enablePHD?: boolean;
  matricInstName?: string;
  matricBoard?: string;
  matricMarks?: string;
  interInstName?: string;
  interBoard?: string;
  interMarks?: string;
  ugInstName?: string;
  ugBoard?: string;
  ugMarks?: string;
  pgInstName?: string;
  pgBoard?: string;
  pgMarks?: string;
  phdInstName?: string;
  phdBoard?: string;
  phdMarks?: string;
}

const workField = atom(1);
const skillField = atom(1);
const qualificationField = atom(0);
const profilePicUrl = atom("");
const serverData = atom<ServerDataShape>({});

export { checkBoxToggleState, workField, skillField, qualificationField, profilePicUrl, serverData };
