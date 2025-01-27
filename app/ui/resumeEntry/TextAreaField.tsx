export default function TextAreaField(){
  return (
    <div className="py-3 flex justify-between">
      <label htmlFor="workEx">Want to describe your work there?</label>
      <textarea
        // type="text"
        id="workEx"
        name="workEx"
        className="border rounded px-2 focus:outline-none"
      ></textarea>
    </div>
  );
};