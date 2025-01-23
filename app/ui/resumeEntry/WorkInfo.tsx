import InputField from "./InputField";

const WorkInfo = () => {
  return (
    <div id="workInfo" className="py-3 border-b-2">
      <div id="workInfoChild">
        <InputField id="companyName" labelName="Company Name" />
        <InputField id="companyPost" labelName="Post" />
        <div className="py-3 flex justify-between">
          <label htmlFor="joinDate">Joining Date</label>
          <input
            type="date"
            id="joinDate"
            name="joinDate"
            className="border rounded px-2 focus:outline-none"
          />
        </div>
        <div className="py-3 flex justify-between">
          <label htmlFor="lastDate">Worked Till</label>
          <input
            type="date"
            id="lastDate"
            name="lastDate"
            className="border rounded px-2 focus:outline-none"
          />
        </div>
        <div className="py-3 flex justify-between">
          <label htmlFor="workEx">Want to describe your work there?</label>
          <textarea
            // type="text"
            id="workEx"
            name="workEx"
            className="border rounded px-2 focus:outline-none"
          ></textarea>
        </div>
      </div>

      <button
        id="workBtn"
        type="button"
        className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
      >
        Add more company detail
      </button>
    </div>
  );
};
export default WorkInfo;
