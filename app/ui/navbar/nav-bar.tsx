"use client";

import React, { useState } from "react";
import FloatingProfileBox from "./FloatingProfileBox";
import MobileMenuBar from "./MobileMenuBar";
import SearchBtnDesktop from "./SearchBtnDesktop";
import SearchBox from "./SearchBox";
import MobileWidgets from "./MobileWidgets";
import SiteLogo from "./SiteLogo";

export default function NavBar() {
  const [isSearchMidVisible, setIsSearchMidVisible] = useState(false);
  const [isSearchMobileVisible, setIsSearchMobileVisible] = useState(false);
  const [menuState, setMenuState] = useState(false);

  const searchMidHandler = () => {
    setIsSearchMidVisible((previousState) => (previousState ? false : true));
  };

  const searchMobileHandler = () => {
    setIsSearchMobileVisible((previousState) => (previousState ? false : true));
  };

  const menuHandler = () => {
    setMenuState((previousState) => (previousState ? false : true));
  };

  return (
    <>
      <MobileMenuBar menuToggle={menuHandler} menuState={menuState} />
      {/* Header bar */}
      <header className="flex justify-between p-2 sticky top-0 z-40 w-full backdrop-blur transition-colors duration-500 lg:z-50 border-b border-slate-50/[0.06] supports-backdrop-blur:bg-white/60 bg-transparent">
        <SiteLogo isSearchMobileVisible={isSearchMobileVisible} />
        <MobileWidgets
          searchBoxToggle={searchMobileHandler}
          isSearchMobileVisible={isSearchMobileVisible}
          menuToggle={menuHandler}
        />
        {/* nav bar for larger screen */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 font-inter font-medium text-white">
          <SearchBtnDesktop searchBoxToggle={searchMidHandler} />
          <FloatingProfileBox />
        </nav>
      </header>
      <SearchBox
        searchBoxToggle={searchMidHandler}
        isSearchMidVisible={isSearchMidVisible}
      />
    </>
  );
}
