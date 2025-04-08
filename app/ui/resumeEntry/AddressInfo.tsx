import CheckBox from "../CheckBox";
import { useEffect, useState } from "react";
import InputFieldAddress from "./InputFieldAddress";
import { useAtom } from "jotai";
import { serverData, ServerDataShape } from "@/app/utils/globalStates";

export default function AddressInfo() {
  const [state, setState] = useState({
    currentAddress: [
      { resumeCountry: "Country", value: "" },
      { resumeState: "State", value: "" },
      { resumeDistrict: "District", value: "" },
      { resumePlace: "City/Village", value: "" },
      { resumePin: "Pin Code", value: "" },
      { resumeAddr: "Remaining Address", value: "" },
    ],
    parmanentAddress: [
      { resumePCountry: "Country", value: "" },
      { resumePState: "State", value: "" },
      { resumePDistrict: "District", value: "" },
      { resumePPlace: "City/Village", value: "" },
      { resumePPin: "Pin Code", value: "" },
      { resumePAddr: "Remaining Address", value: "" },
    ],
  });

  const [disable, setDisable] = useState(false);
  const [serverDataState, setServerDataState] = useAtom(serverData);

  type AddressField = {
    [key: string]: string; // e.g., { resumeCountry: "Country", value: "India" }
    value: string;
  };

  useEffect(() => {
    if (!serverDataState) return;

    const updateSection = (section: any) => {
      return section.map((item: any) => {
        const key = Object.keys(item)[0]; // e.g., 'resumeCountry'
        return {
          [key]: item[key],
          value: serverDataState[key as keyof ServerDataShape] || "", // fallback to empty string
        };
      });
    };

    setState((prev) => ({
      ...prev,
      currentAddress: updateSection(prev.currentAddress),
      parmanentAddress: updateSection(prev.parmanentAddress),
    }));

    if(serverDataState.sameAddress === "on") setDisable(true);
  }, [serverDataState]);

  function updateAddressValue(
    states: typeof state,
    key: string,
    newValue: string,
    addressType: "currentAddress" | "parmanentAddress"
  ) {
    return {
      ...state,
      [addressType]: states[addressType].map((obj) =>
        Object.keys(obj).includes(key) ? { ...obj, value: newValue } : obj
      ),
    };
  }

  const toggleHandler = () => {
    setDisable((pre) => !pre);
    setState((prevState) => ({
      ...prevState,
      parmanentAddress: prevState.parmanentAddress.map((item, index) => ({
        ...item,
        value: prevState.currentAddress[index].value, // Copy value from currentAddress
      })),
    }));
  };

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string,
    addressType: "currentAddress" | "parmanentAddress"
  ) => {
    setState(updateAddressValue(state, key, event.target.value, addressType));
  };

  return (
    <div id="addressInfo" className="border-b-2 p-3">
      {/* Current Address fields Heading */}
      <div id="currentAddressPara">
        <p>Current Address</p>
      </div>

      <div id="currentAddress" className="py-3 border-b-2">
        {state.currentAddress.map((obj, index) => {
          // console.log(Object.keys(obj)[0])
          const key = Object.keys(obj)[0];
          const val = Object.values(obj)[0];
          // console.log(obj);
          return (
            <InputFieldAddress
              key={index}
              id={key}
              labelName={val}
              value={obj.value}
              inputHandler={(e) => inputHandler(e, key, "currentAddress")}
            />
          );
        })}
      </div>

      {/* Parmanent Address fields Heading ****************************************/}
      <div id="parmanentAddressPara" className="py-3">
        <p>Parmanent Address</p>
      </div>

      {/* CheckBox for toggling Parmanent Address */}
      <CheckBox
        id="sameAddress"
        label="Same as Current Address?"
        checked={disable}
        toggleHandler={toggleHandler}
      />

      <div id="parmanentAddress" className="py-3">
        {state.parmanentAddress.map((obj, index) => {
          // console.log(Object.keys(obj)[0])
          const key = Object.keys(obj)[0];
          const val = Object.values(obj)[0];
          // console.log(obj);
          return (
            <InputFieldAddress
              key={index}
              id={key}
              labelName={val}
              value={obj.value}
              isDisable={disable}
              inputHandler={(e) => inputHandler(e, key, "parmanentAddress")}
            />
          );
        })}
      </div>
    </div>
  );
}
