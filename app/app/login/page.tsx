"use client";

import { useState } from "react";
import clsx from "clsx";
import { signInToApp, signUp } from "@/app/utils/firebase-fn";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/ui/login/Header";
import GoogleLogin from "@/app/ui/login/GoogleLogin";
import LoginToggle from "@/app/ui/login/LoginToggle";
import FormContainer from "@/app/ui/login/FormContainer";
import EmailField from "@/app/ui/login/EmailField";
import PasswordField from "@/app/ui/login/PasswordField";
import SubmitBtn from "@/app/ui/login/SubmitBtn";
import RecoverBtn from "@/app/ui/login/RecoveryBtn";
import NameField from "@/app/ui/login/NameField";
import { isLoggedIn } from "@/app/utils/Utils";
import MessageBox from "@/app/ui/MessageBox";

export default function Login() {
  const [formStatus, setFormStatus] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const loggedInUserId = isLoggedIn();
    if (loggedInUserId) {
      router.push("/app"); // Redirect if not logged in
    } else {
      setIsLoading(false); // Set loading to false once user is authenticated
    }
  }, [router]);

  // Show loading or nothing until the authentication check is complete
  if (isLoading) {
    return <div>Loading...</div>; // Or just return null to render nothing
  }

  const toggleRegister = () => {
    setFormStatus("signUp");
  };
  const toggleSignIn = () => {
    setFormStatus("signIn");
  };
  const toggleRecovery = () => {
    setFormStatus("recovery");
  };
  const signInBtn = async () => {
    try {
      const uid = await signInToApp(email, password);
      localStorage.setItem("loggedInUserId", uid);
      // console.log(uid);
      router.push("/app");
    } catch {
      console.log("error while signing in");
    }
  };

  const handleSignIN = (e: React.FormEvent) => {
    e.preventDefault();
    signInBtn();
  };

  function handleSignUp(e: React.FormEvent){
    e.preventDefault();
    signUpBtn(fname,lname, email, password);
  }

  async function signUpBtn(firstName: string, lastName: string, email: string, password: string){
    try{
      await signUp(firstName, lastName, email, password);
      setMessage("Sign Up successfull! ✔️ kindly login again.")
      setTimeout(()=> setMessage(""), 5000)
    } catch(e) {
      console.error(e);
      setMessage("Sign Up Unsuccessfull! ❌.")

    }
  }
  return (
    <>
      {/* Sign Up form */}

      <FormContainer formStatus={formStatus} targetStatus="signUp" id="signup">
        <Header heading="Register" />
        <form method="post" action="" className="my-0 mx-8">
          <MessageBox message={message} />
          <NameField setName={setFname} value={fname} name="First Name" />
          <NameField setName={setLname} value={lname} name="Last Name" />
          <EmailField setEmail={setEmail} email={email} />
          <PasswordField setPassword={setPassword} password={password} />
          <RecoverBtn toggleBtn={toggleRecovery} />
          <SubmitBtn whichSubmitBtn="Sign Up" clickHandler={handleSignUp} />
        </form>
        <GoogleLogin />
        <LoginToggle toggleHandler={toggleSignIn} LoginType="Sign In" />
      </FormContainer>

      {/* Sign In form */}

      <FormContainer formStatus={formStatus} targetStatus="signIn" id="signIn">
        <Header heading="Sign In" />
        <form method="post" action="" className="my-0 mx-8">
          <div id="signInMessage" className="messageDiv hidden"></div>
          <EmailField setEmail={setEmail} email={email} />
          <PasswordField setPassword={setPassword} password={password} />
          <RecoverBtn toggleBtn={toggleRecovery} />
          <SubmitBtn whichSubmitBtn="Sign In" clickHandler={handleSignIN} />
        </form>
        <GoogleLogin />
        <LoginToggle toggleHandler={toggleRegister} LoginType="Sign Up" />
      </FormContainer>

      {/** recovery  form */}

      <FormContainer
        formStatus={formStatus}
        targetStatus="recovery"
        id="recovery"
      >
        <Header heading="Account Recover" />
        <form method="post" action="" className="my-0 mx-8">
          <div id="recoveryMessage" className="messageDiv hidden"></div>
          <EmailField setEmail={setEmail} email={email} />
          <SubmitBtn whichSubmitBtn="Send recovery Email" />
        </form>
        <GoogleLogin />
        <LoginToggle toggleHandler={toggleSignIn} LoginType="Sign In" />
      </FormContainer>
    </>
  );
}
