export default function DateField({date}: {date: string}){
  return (
    <div className="py-3 flex justify-between">
      <label htmlFor={date}>Joining Date</label>
      <input
        type="date"
        id={date}
        name={date}
        className="border rounded px-2 focus:outline-none border-[#0f172A]"
      />
    </div>
  );
};