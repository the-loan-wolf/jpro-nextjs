type Props = {
  id: string;
  label: string | null;
  checked?: boolean;
  toggleHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CheckBox = ({ id, label, toggleHandler, checked = false }: Props) => {
  return (
    <div>
      <input type="checkbox" id={id} name={id} onChange={toggleHandler} checked={checked} />
      <label htmlFor={id}> {label}</label>
    </div>
  );
};

export default CheckBox;
