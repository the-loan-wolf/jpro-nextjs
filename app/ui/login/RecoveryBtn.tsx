export default function RecoverBtn({toggleBtn}:{toggleBtn: ()=> void}) {
  return (
    <div className="recover text-right text-xs mb-4 " id="passwordReset">
      <button
        className="hover:text-blue-900 hover:underline"
        onClick={toggleBtn}
      >
        Recover Password
      </button>
    </div>
  );
}
