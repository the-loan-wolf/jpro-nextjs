import { useState } from "react";

export default function SearchBox({searchBoxToggle, isSearchMidVisible}: {searchBoxToggle: ()=> void, isSearchMidVisible: boolean}) {
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    /** Search box for larger screen */
    <div className="flex justify-center">
      <div
        id="searchBoxMid"
        className={`${isSearchMidVisible ? "md:flex" : "hidden"} w-[80%] mt-1`}
      >
        <input
          id="searchTextBoxDesktop"
          type="text"
          className="grow py-2 px-5 border rounded focus:outline-none text-black"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="inline-block px-5"
          id="searchCloseMid-btn"
          onClick={()=>{setInputValue("");searchBoxToggle()}}
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </div>
  );
}
