type ResumeTextDetailProps = {
  keyName: string;
  value: string;
};

export default function ResumeTextDetail({
  keyName,
  value,
}: ResumeTextDetailProps) {
  return (
    <div className="flex justify-between flex-wrap px-2 md:px-10">
      <p className="text-slate-50">{keyName}</p>
      <p>{value}</p>
    </div>
  );
}
