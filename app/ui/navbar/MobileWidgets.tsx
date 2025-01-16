import { useState } from "react";

export default function MobileWidgets({
  searchBoxToggle,
  isSearchMobileVisible,
  menuToggle,
}: {
  searchBoxToggle: () => void;
  isSearchMobileVisible: boolean;
  menuToggle: () => void;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <>
      <div
        id="mobileWidget"
        className={`${isSearchMobileVisible ? "hidden" : "flex"} flex-row`}
      >
        <button
          className="md:hidden inline-block"
          id="search-mobile-btn"
          onClick={searchBoxToggle}
        >
          <i className="fa-solid fa-magnifying-glass text-2xl"></i>
        </button>
        <button
          className="md:hidden inline-block pr-2 pl-5"
          id="menu-btn"
          onClick={menuToggle}
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
          className="grow py-2 px-5 border rounded focus:outline-none text-black"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="inline-block px-5"
          id="searchClose-btn"
          onClick={()=>{setInputValue("");searchBoxToggle()}}
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </>
  );
}
