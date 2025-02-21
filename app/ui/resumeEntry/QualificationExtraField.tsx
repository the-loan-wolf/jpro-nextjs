import InputField from "./InputField";

export default function QualificationExtraField({ id }: { id: number }) {
  return (
    <div className="border-t-2">
      <InputField id={`degName${id}`} labelName="Qualification Type" />
      <InputField id={`instName${id}`} labelName="Institute Name" />
      <InputField id={`instBoard${id}`} labelName="Board" />
      <InputField
        id={`instMarks${id}`}
        labelName="Marks / Percentage Obtained"
      />
    </div>
  );
}
