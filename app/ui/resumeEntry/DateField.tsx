const DateField = ({date}: {date: string}) => {
  return (
    <div className="py-3 flex justify-between">
      <label htmlFor={date}>Joining Date</label>
      <input
        type="date"
        id={date}
        name={date}
        className="border rounded px-2 focus:outline-none"
      />
    </div>
  );
};
export default DateField;
