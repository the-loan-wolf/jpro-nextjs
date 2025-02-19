type Props = {
  id: string;
  labelName: string;
  value: string;
  isDisable?: boolean;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function InputFieldAddress({
  id,
  labelName,
  value,
  inputHandler,
  isDisable = false
}: Props) {
  const nameList = ["resumeFName", "resumeMName", "resumeLName"];
  let padding;
  nameList.includes(id) ? (padding = "py-1") : (padding = "py-3");
  return (
    <div className={`${padding} flex justify-between`}>
      <label htmlFor={id}>{labelName}</label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        disabled={isDisable}
        onChange={inputHandler}
        className="border rounded px-2 focus:outline-none"
      />
    </div>
  );
}
