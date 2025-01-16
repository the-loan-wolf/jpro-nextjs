import { useState } from "react";

export default function SearchBtnDesktop({searchBoxToggle}: {searchBoxToggle: ()=> void}) {
  return (
    <button
      className="hidden md:inline-block"
      id="searchMid-btn"
      onClick={searchBoxToggle}
    >
      <i className="fa-solid fa-magnifying-glass text-2xl"></i>
    </button>
  );
}
