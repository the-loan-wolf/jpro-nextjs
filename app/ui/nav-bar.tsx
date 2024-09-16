"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { userLogOut } from "../utils/firebase-fn";
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const [isSearchMidVisible, setIsSearchMidVisible] = useState(false);
  const [isSearchMobileVisible, setIsSearchMobileVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [menuState, setMenuState] = useState(false);
  const [floatingBoxState, setFloatingBoxState] = useState(false);
  const router = useRouter();
  const searchMidHandler = () => {
    setIsSearchMidVisible(true);
  };
  const searchMidClose = () => {
    setIsSearchMidVisible(false);
    setInputValue(""); // Clear the input field
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const searchMobileHandler = () => {
    setIsSearchMobileVisible(true);
  };
  const searchMobileClose = () => {
    setIsSearchMobileVisible(false);
    setInputValue(""); // Clear the input field
  };
  const openMenu = () => {
    setMenuState(true);
  };
  const closeMenu = () => {
    setMenuState(false);
  };
  const showFloatingBox = () => {
    setFloatingBoxState(true);
  };
  const hideFloatingBox = () => {
    setFloatingBoxState(false);
  };
  const logoutFn = async ()=> {
    const value = await userLogOut();
    if (value === "success"){
      localStorage.removeItem("loggedInUserId");
      router.push("/app/login");
    }
  }

  return (
    <>
      {/*Full screen navigation menu in mobile edition */}
      <div
        id="mobileHamMenu"
        className={`${
          menuState ? "flex" : "hidden"
        } fixed top-0 left-0 w-screen h-screen border-b bg-slate-900/80 backdrop-blur-sm z-50 flex-col gap-9 p-5 px-8`}
      >
        {/* header of mobile nav menu */}
        <div className="flex items-center justify-between gap-4 border-b pb-2">
          {/* logo inside mobile nav menu */}
          <Link href="/app" id="logoMenu" className="px-5" onClick={closeMenu}>
            <h1 className="font-semibold text-2xl">
              <span className="text-blue-500">Free</span>
              <span className="text-blue-600">Job</span>
              <span className="text-blue-700">Search</span>
            </h1>
          </Link>
          {/* mobile hamburger menu close button */}
          <button
            className="inline-block px-5"
            id="menuClose-btn"
            onClick={closeMenu}
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>
        {/* Navigation items inside hamburger menu */}
        <nav className="flex flex-col items-center gap-6 text-2xl font-semibold">
          <Link href="/app/resume" onClick={closeMenu}>
            Add Your Resume
          </Link>
          <Link href="/app/profile">Your Profile</Link>
          <button id="logout" className="rounded-xl bg-red-600 py-2 px-5">
            Log Out?
          </button>
        </nav>
      </div>
      {/* background gradient image overlay on whole site */}
      <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex justify-end">
          <Image
            src="/second.png"
            width={1000}
            height={760}
            alt=""
            className="w-[90rem] flex-none max-w-none"
          />
        </div>
      </div>
      {/* Header bar */}
      <header className="flex justify-between p-2 sticky top-0 z-40 w-full backdrop-blur transition-colors duration-500 lg:z-50 border-b border-slate-50/[0.06] supports-backdrop-blur:bg-white/60 bg-transparent">
        {/* site logo*/}
        <Link
          href="/app"
          id="logo"
          className={`${isSearchMobileVisible ? "hidden" : "flex"} px-2`}
        >
          <h1 id="siteLogo" className="font-semibold text-2xl">
            <span className="text-blue-500">Free</span>
            <span className="text-blue-600">Job</span>
            <span className="text-blue-700">Search</span>
          </h1>
        </Link>
        {/* buttons for mobile screen */}
        <div
          id="mobileWidget"
          className={`${isSearchMobileVisible ? "hidden" : "flex"} flex-row`}
        >
          <button
            className="md:hidden inline-block"
            id="search-mobile-btn"
            onClick={searchMobileHandler}
          >
            <i className="fa-solid fa-magnifying-glass text-2xl"></i>
          </button>
          <button
            className="md:hidden inline-block pr-2 pl-5"
            id="menu-btn"
            onClick={openMenu}
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
        {/* search bar for mobile screen */}
        <div
          id="searchBox"
          className={`${isSearchMobileVisible ? "flex" : "hidden"} w-full`}
        >
          <input
            id="searchTextBoxMobile"
            type="text"
            className="grow py-2 px-5 border rounded focus:outline-none"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="inline-block px-5"
            id="searchClose-btn"
            onClick={searchMobileClose}
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>
        {/* nav bar for larger screen */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* Button to activate search bar on larger screen */}
          <button
            className="hidden md:inline-block"
            id="searchMid-btn"
            onClick={searchMidHandler}
          >
            <i className="fa-solid fa-magnifying-glass text-2xl"></i>
          </button>
          {/** Floating menu */}
          <div
            id="profile"
            className="px-5 w-full h-full"
            onPointerOver={showFloatingBox}
            onPointerOut={hideFloatingBox}
          >
            <p>Profile</p>
            <div
              id="profileDiv"
              className={`${
                floatingBoxState ? "visible" : "invisible"
              } backdrop-blur-sm border border-slate-400 rounded-xl p-2 absolute w-40 right-1  top-10 flex flex-col justify-center items-center`}
            >
              {/* <div className="addResumeBtn">
                <button className="hover:text-red-400">Add Your Resume</button>
              </div> */}
              <Link href="/app/resume" className="hover:text-red-400">
                <p>Add Your Resume</p>
              </Link>
              {/* <div className="showProfileBtn">
                <button className="hover:text-red-400">Your Profile</button>
              </div> */}
              <Link href="/app/profile" className="hover:text-red-400">
                <p>Your Profile</p>
              </Link>
              <div id="LogoutBtn">
                <button className="hover:text-red-400" onClick={logoutFn}>Log Out?</button>
              </div>
              
            </div>
          </div>
        </nav>
      </header>
      {/** Search box for larger screen */}
      <div className="flex justify-center">
        <div
          id="searchBoxMid"
          className={`${
            isSearchMidVisible ? "md:flex" : "hidden"
          } w-[80%] mt-1`}
        >
          <input
            id="searchTextBoxDesktop"
            type="text"
            className="grow py-2 px-5 border rounded focus:outline-none"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="inline-block px-5"
            id="searchCloseMid-btn"
            onClick={searchMidClose}
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>
      </div>
    </>
  );
}
