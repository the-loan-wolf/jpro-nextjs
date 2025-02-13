import { memo } from "react";

const SubmitBtn = memo(() => {
  return (
    <button
      className="p-3 bg-amber-200 mt-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-amber-300 transition ease-in-out"
      id="submitResumeBtn"
      type="submit"
    >
      Save Data
    </button>
  );
});

SubmitBtn.displayName = "SubmitBtn";
export default SubmitBtn;
