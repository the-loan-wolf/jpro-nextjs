export default function QualificationExtraField({id}:{id: number}) {
  return (
    <div className="qualification-block">
      <div className="py-3 flex justify-between">
        <label htmlFor={`degName${id}`}>Qualification Type</label>
        <input
          type="text"
          id={`degName${id}`}
          name={`degName${id}`}
          className="border rounded px-2 focus:outline-none"
        />
      </div>
      <div className="py-3 flex justify-between">
        <label htmlFor={`instName${id}`}>Institute Name</label>
        <input
          type="text"
          id={`instName${id}`}
          name={`instName${id}`}
          className="border rounded px-2 focus:outline-none"
        />
      </div>
      <div className="py-3 flex justify-between">
        <label htmlFor={`instBoard${id}`}>Board</label>
        <input
          type="text"
          id={`instBoard${id}`}
          name={`instBoard${id}`}
          className="border rounded px-2 focus:outline-none"
        />
      </div>
      <div className="py-3 flex justify-between">
        <label htmlFor={`instMarks${id}`}>Marks / Percentage Obtained</label>
        <input
          type="text"
          id={`instMarks${id}`}
          name={`instMarks${id}`}
          className="border rounded px-2 focus:outline-none"
        />
      </div>
    </div>
  );
}
