import { useState, useEffect } from "react";

export default function LoginToggle({
  toggleHandler,
  LoginType,
}: {
  toggleHandler: () => void;
  LoginType: string;
}) {
  const [loginState, setLoginState] = useState("");

  useEffect(() => {
    if (LoginType === "Sign In") {
      setLoginState("Already Have Account?");
    } else if (LoginType === "Sign Up") {
      setLoginState("Don't have account yet?");
    }
  }, [LoginType]);
  return (
    <div className="links flex justify-around py-0 px-16 font-bold">
      <p>{loginState}</p>
      <button
        className="text-blue-500 border-none bg-transparent hover:underline hover:text-blue-900"
        onClick={toggleHandler}
      >
        {LoginType}
      </button>
    </div>
  );
}
