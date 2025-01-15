export default function SubmitBtn({
  whichSubmitBtn,
  clickHandler,
}: {
  whichSubmitBtn: string;
  clickHandler?: (e: React.FormEvent) => void;
}) {
  return (
    <button
      onClick={clickHandler}
      className="btn text-xl py-2 px-0 rounded bg-blue-500 text-slate-100 w-full cursor-pointer transition-all duration-700 hover:bg-blue-900"
    >
      {whichSubmitBtn}
    </button>
  );
}
