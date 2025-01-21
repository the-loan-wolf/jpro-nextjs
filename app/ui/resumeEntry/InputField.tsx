type Props = {
    id: string;
    labelName: string;
};
const InputField = ({id, labelName}: Props) => {
    const nameList = ["resumeFName", "resumeMName", "resumeLName"]
    let padding
    // if (nameList.includes(id)){
    //     padding = "py-1"
    // }else padding
    nameList.includes(id)? padding = "py-1" : padding = "py-3"
  return (
    <div className={`${padding} flex justify-between`}>
      <label htmlFor={id}>{labelName}</label>
      <input
        type="text"
        id={id}
        name={id}
        className="border rounded px-2 focus:outline-none"
      />
    </div>
  );
};
export default InputField;
