type Props = {
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id: string;
};
export default function ButtonAddField({ clickHandler, id }: Props) {
  let buttonText = null;
  if (id === "skillBtn") {
    buttonText = "Add more Skill";
  } else if (id === "workBtn") {
    buttonText = "Add more company detail";
  } else {
    buttonText = "Add any other Qualification";
  }
  return (
    <button
      id={id}
      type="button"
      className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
      onClick={clickHandler}
    >
      {buttonText}
    </button>
  );
}
