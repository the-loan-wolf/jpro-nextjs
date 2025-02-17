type Props = {
  id: string;
  label: string | null;
  toggleHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CheckBox = ({ id, label, toggleHandler }: Props) => {
  return (
    <div>
      <input type="checkbox" id={id} name={id} onChange={toggleHandler} />
      <label htmlFor={id}> {label}</label>
    </div>
  );
};

export default CheckBox;
