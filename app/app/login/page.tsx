'use client';

import { useState } from "react";
import clsx from "clsx";
import {signInToApp} from "@/app/utils/firebase-fn";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formStatus, setFormStatus] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);  // Loading state

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (loggedInUserId) {
      router.push("/app");  // Redirect if not logged in
    } else {
      setIsLoading(false);  // Set loading to false once user is authenticated
    }
  }, [router]);

  // Show loading or nothing until the authentication check is complete
  if (isLoading) {
    return <div>Loading...</div>;  // Or just return null to render nothing
  }

  const toggleRegister = ()=> {
    setFormStatus("signUp");
  }
  const toggleSignIn = ()=> {
    setFormStatus("signIn");
  }
  const toggleRecovery = ()=> {
    setFormStatus("recovery");
  }
  const signInBtn = async ()=> {
    try{
      const uid = await signInToApp(email, password);
    localStorage.setItem("loggedInUserId", uid);
    // console.log(uid);
    router.push("/app");
    }catch{
      console.log("error while signing in");
    }
  }

  const handleSignIN = (e: React.FormEvent)=> {
    e.preventDefault();
    signInBtn();
  }
  return (
    <>
      <div
        className={clsx({'block': formStatus === "signUp", 'hidden': formStatus === "signIn" || formStatus === "recovery"},"bg-white md:w-[450px] p-6 my-12 mx-auto md:rounded-xl md:shadow-custom")}
        id="signup"
      >
        <h1 className="text-2xl text-slate-900 font-bold text-center p-5 mb-2">Register</h1>
        <form method="post" action="" className="my-0 mx-8">
          <div id="signUpMessage" className="messageDiv hidden"></div>
          <div className="relative py-5 px-0">
            <i className="fas fa-user fas fa-envelope absolute text-black"></i>
            <input
              type="text"
              id="fName"
              placeholder="First Name"
              required
              className="peer/signUpFname text-inherit w-full bg-transparent border-b-2 border-slate-400 pl-6 text-sm focus:bg-transparent focus:outline-transparent focus:border-b-2 focus:border-red-950 placeholder:text-transparent outline-none"
              onChange={(e)=>{setFname(e.target.value)}}
            />
            <label
              htmlFor="fname"
              className="absolute text-sm left-6 top-1 text-gray-500 transition-all duration-300 transform -translate-y-1/2 peer-placeholder-shown/signUpFname:top-7 peer-placeholder-shown/signUpFname:left-6 peer-placeholder-shown/signUpFname:text-base peer-placeholder-shown/signUpFname:text-gray-400 peer-focus/signUpFname:top-1 peer-focus/signUpFname:left-6 peer-focus/signUpFname:text-sm peer-focus/signUpFname:text-red-950"
            >
              First Name
            </label>
          </div>
          <div className="relative py-5 px-0">
            <i className="fas fa-user fas fa-envelope absolute text-black"></i>
            <input
              type="text"
              id="lName"
              placeholder="Last Name"
              required
              className="peer/signUpLname text-inherit w-full bg-transparent border-b-2 border-slate-400 pl-6 text-sm focus:bg-transparent focus:outline-transparent focus:border-b-2 focus:border-red-950 placeholder:text-transparent outline-none"
              onChange={(e)=>{setLname(e.target.value)}}
            />
            <label
              htmlFor="lName"
              className="absolute text-sm left-6 top-1 text-gray-500 transition-all duration-300 transform -translate-y-1/2 peer-placeholder-shown/signUpLname:top-7 peer-placeholder-shown/signUpLname:left-6 peer-placeholder-shown/signUpLname:text-base peer-placeholder-shown/signUpLname:text-gray-400 peer-focus/signUpLname:top-1 peer-focus/signUpLname:left-6 peer-focus/signUpLname:text-sm peer-focus/signUpLname:text-red-950"
            >
              Last Name
            </label>
          </div>
          <div className="relative py-5 px-0">
            <i className="fas fa-envelope fas fa-envelope absolute text-black"></i>
            <input
              type="email"
              id="rEmail"
              placeholder="Email"
              required
              className="peer/signUpEmail text-inherit w-full bg-transparent border-b-2 border-slate-400 pl-6 text-sm focus:bg-transparent focus:outline-transparent focus:border-b-2 focus:border-red-950 placeholder:text-transparent outline-none"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <label
              htmlFor="rEmail"
              className="absolute text-sm left-6 top-1 text-gray-500 transition-all duration-300 transform -translate-y-1/2 peer-placeholder-shown/signUpEmail:top-7 peer-placeholder-shown/signUpEmail:left-6 peer-placeholder-shown/signUpEmail:text-base peer-placeholder-shown/signUpEmail:text-gray-400 peer-focus/signUpEmail:top-1 peer-focus/signUpEmail:left-6 peer-focus/signUpEmail:text-sm peer-focus/signUpEmail:text-red-950"
            >
              Email
            </label>
          </div>
          <div className="relative py-5 px-0">
            <i className="fas fa-lock fas fa-envelope absolute text-black"></i>
            <input
              type="password"
              id="rPassword"
              placeholder="Password"
              required
              className="peer/signUpPass text-inherit w-full bg-transparent border-b-2 border-slate-400 pl-6 text-sm focus:bg-transparent focus:outline-transparent focus:border-b-2 focus:border-red-950 placeholder:text-transparent outline-none"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <label
              htmlFor="rPassword"
              className="absolute text-sm left-6 top-1 text-gray-500 transition-all duration-300 transform -translate-y-1/2 peer-placeholder-shown/signUpPass:top-7 peer-placeholder-shown/signUpPass:left-6 peer-placeholder-shown/signUpPass:text-base peer-placeholder-shown/signUpPass:text-gray-400 peer-focus/signUpPass:top-1 peer-focus/signUpPass:left-6 peer-focus/signUpPass:text-sm peer-focus/signUpPass:text-red-950"
            >
              Password
            </label>
          </div>
          <button className="btn text-xl py-2 px-0 rounded bg-blue-500 text-slate-100 w-full cursor-pointer transition-all duration-700 hover:bg-blue-900" id="submitSignUp">
            Sign Up
          </button>
        </form>
        <p className="or text-xl mt-2 text-center">----------or----------</p>
        <div className="icons text-center ">
          <i className="fab fa-google text-blue-500 py-3 px-6 rounded-lg my-0 mx-4 border-2 transition-all duration-500 hover:bg-blue-900 hover:border-blue-500"></i>
        </div>
        <div className="links flex justify-around py-0 px-16 font-bold">
          <p>Already Have Account ?</p>
          <button id="signInButton" className="text-blue-500 border-none bg-transparent hover:underline hover:text-blue-900" onClick={toggleSignIn}>Sign In</button>
        </div>
      </div>

      <div
        className={clsx({'block': formStatus === "signIn", 'hidden': formStatus === "signUp" || formStatus === "recovery"},"bg-white md:w-[450px] p-6 my-12 mx-auto md:rounded-xl md:shadow-custom")}
        id="signIn"
      >
        <h1 className="text-2xl text-slate-900 font-bold text-center p-5 mb-2">Sign In</h1>
        <form method="post" action="" className="my-0 mx-8">
          <div id="signInMessage" className="messageDiv hidden"></div>

          <div className="relative py-5 px-0">
            <i className="fas fa-envelope absolute text-black"></i>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="peer/signInEmail text-inherit w-full bg-transparent border-b-2 border-slate-400 pl-6 text-sm focus:bg-transparent focus:outline-transparent focus:border-b-2 focus:border-red-950 placeholder:text-transparent outline-none"
              onChange={(e)=>{setEmail(e.target.value)}}
              value={email}
            />
            <label
              htmlFor="email"
              className="absolute text-sm left-6 top-1 text-gray-500 transition-all duration-300 transform -translate-y-1/2 peer-placeholder-shown/signInEmail:top-7 peer-placeholder-shown/signInEmail:left-6 peer-placeholder-shown/signInEmail:text-base peer-placeholder-shown/signInEmail:text-gray-400 peer-focus/signInEmail:top-1 peer-focus/signInEmail:left-6 peer-focus/signInEmail:text-sm peer-focus/signInEmail:text-red-950"
            >
              Email
            </label>
          </div>
          <div className="relative py-5 px-0">
            <i className="fas fa-lock fas fa-envelope absolute text-black"></i>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              className="peer/signInPass text-inherit w-full bg-transparent border-b-2 border-slate-400 pl-6 text-sm focus:bg-transparent focus:outline-transparent focus:border-b-2 focus:border-red-950 placeholder:text-transparent outline-none"
              onChange={(e)=>{setPassword(e.target.value)}}
              value={password}
            />
            <label
              htmlFor="password"
              className="absolute text-sm left-6 top-1 text-gray-500 transition-all duration-300 transform -translate-y-1/2 peer-placeholder-shown/signInPass:top-7 peer-placeholder-shown/signInPass:left-6 peer-placeholder-shown/signInPass:text-base peer-placeholder-shown/signInPass:text-gray-400 peer-focus/signInPass:top-1 peer-focus/signInPass:left-6 peer-focus/signInPass:text-sm peer-focus/signInPass:text-red-950"
            >
              Password
            </label>
          </div>
          <div className="recover text-right text-xs mb-4 " id="passwordReset">
            <button className="hover:text-blue-900 hover:underline" onClick={toggleRecovery}>Recover Password</button>
          </div>
          <button className="btn text-xl py-2 px-0 rounded bg-blue-500 text-slate-100 w-full cursor-pointer transition-all duration-700 hover:bg-blue-900" id="submitSignIn" onClick={handleSignIN}>
            Sign In
          </button>
        </form>
        <p className="or text-xl mt-2 text-center">----------or----------</p>
        <div className="icons text-center ">
          <i className="fab fa-google text-blue-500 py-3 px-6 rounded-lg my-0 mx-4 border-2 transition-all duration-500 hover:bg-blue-900 hover:border-blue-500"></i>
        </div>
        <div className="links flex justify-around py-0 px-16 font-bold">
          <p>Don&apos;t have account yet?</p>
          <button id="signUpButton" className="text-blue-500 border-none bg-transparent hover:underline hover:text-blue-900" onClick={toggleRegister}>Sign Up</button>
        </div>
      </div>
      {/** recovery  form */}
      <div
        className={clsx({'block': formStatus === "recovery", 'hidden': formStatus === "signUp"  || formStatus === "signIn"},"bg-white md:w-[450px] p-6 my-12 mx-auto md:rounded-xl md:shadow-custom")}
        id="signIn"
      >
        <h1 className="text-2xl text-slate-900 font-bold text-center p-5 mb-2">Account Recover</h1>
        <form method="post" action="" className="my-0 mx-8">
          <div id="recoveryMessage" className="messageDiv hidden"></div>

          <div className="relative py-5 px-0">
            <i className="fas fa-envelope absolute text-black"></i>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="peer/recovery text-inherit w-full bg-transparent border-b-2 border-slate-400 pl-6 text-sm focus:bg-transparent focus:outline-transparent focus:border-b-2 focus:border-red-950 placeholder:text-transparent outline-none"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <label
              htmlFor="email"
              className="absolute text-sm left-6 top-1 text-gray-500 transition-all duration-300 transform -translate-y-1/2 peer-placeholder-shown/recovery:top-7 peer-placeholder-shown/recovery:left-6 peer-placeholder-shown/recovery:text-base peer-placeholder-shown/recovery:text-gray-400 peer-focus/recovery:top-1 peer-focus/recovery:left-6 peer-focus/recovery:text-sm peer-focus/recovery:text-red-950"
            >
              Email
            </label>
          </div>
          <button className="btn text-xl py-2 px-0 rounded bg-blue-500 text-slate-100 w-full cursor-pointer transition-all duration-700 hover:bg-blue-900" id="submitSignIn">
            Send recovery Email
          </button>
        </form>
        <p className="or text-xl mt-2 text-center">----------or----------</p>
        <div className="icons text-center ">
          <i className="fab fa-google text-blue-500 py-3 px-6 rounded-lg my-0 mx-4 border-2 transition-all duration-500 hover:bg-blue-900 hover:border-blue-500"></i>
        </div>
        <div className="links flex justify-around py-0 px-16 font-bold">
          <p>Don&apos;t have account yet?</p>
          <button id="signInButton" className="text-blue-500 border-none bg-transparent hover:underline hover:text-blue-900" onClick={toggleSignIn}>Sign In</button>
        </div>
      </div>
    </>
  );
}
