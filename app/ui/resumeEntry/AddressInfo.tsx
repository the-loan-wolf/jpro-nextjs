import InputField from "@/app/ui/resumeEntry/InputField";

export default function AddressInfo(){
  return (
    <div id="addressInfo" className="border-b-2 p-3">
      <div id="currentAddressPara">
        <p>Current Address</p>
      </div>
      <div id="currentAddress" className="py-3 border-b-2">
        <InputField id="resumeCountry" labelName="Country" />
        <InputField id="resumeState" labelName="State" />
        <InputField id="resumeDistrict" labelName="District" />
        <InputField id="resumePlace" labelName="City/Village" />

        <div className="py-3 flex justify-between">
          <label htmlFor="resumePin">Pin Code</label>
          <input
            type="text"
            id="resumePin"
            name="resumePin"
            pattern="[0-9]{6}"
            title="Example: 123456"
            maxLength={6}
            className="border rounded px-2 focus:outline-none"
          />
        </div>

        <InputField id="resumeAddr" labelName="Remaining Address" />
      </div>
      <div id="parmanentAddressPara" className="py-3">
        <p>Parmanent Address</p>
      </div>
      <div className="py-3">
        <input type="checkbox" id="sameAddress" name="sameAddress" />
        <label htmlFor="sameAddress"> Same as Current Address?</label>
      </div>
      <div id="parmanentAddress" className="py-3">
        <InputField id="resumePCountry" labelName="Country" />
        <InputField id="resumePState" labelName="State" />
        <InputField id="resumePDistrict" labelName="District" />
        <InputField id="resumePPlace" labelName="City/Village" />

        <div className="py-3 flex justify-between">
          <label htmlFor="resumePPin">Pin Code</label>
          <input
            type="text"
            id="resumePPin"
            name="resumePPin"
            pattern="[0-9]{6}"
            title="Example: 123456"
            maxLength={6}
            className="border rounded px-2 focus:outline-none"
          />
        </div>

        <InputField id="resumePAddr" labelName="Remaining Address" />
      </div>
    </div>
  );
};