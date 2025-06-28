import { db } from "@/app/utils/firebase-fn";
import { lastListing, resumeListings } from "@/app/utils/globalStates";
import {
  collection,
  DocumentData,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  const setResults = useSetAtom(resumeListings);
  const setLastFetchListing = useSetAtom(lastListing);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.toLowerCase());
  };

  async function searchUsersByName(namePrefix: string) {
    const usersRef = collection(db, "resumes");
    const q = query(
      usersRef,
      orderBy("resumeFName"),
      startAt(namePrefix),
      endAt(namePrefix + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputValue.length >= 2) {
        searchUsersByName(inputValue).then((users) => setResults(users));
      } else {
        async function fetchListings() {
          try {
            const listingRef = collection(db, "resumes");
            const q = query(
              listingRef,
              orderBy("timestamp", "desc"),
              limit(10)
            );
            const querySnap = await getDocs(q);
            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchListing(lastVisible);
            const listings: { id: string; data: DocumentData }[] = [];
            querySnap.forEach((doc) => {
              return listings.push({
                id: doc.id,
                data: doc.data(),
              });
            });
            setResults(listings);
          } catch (error) {
            toast.error("Could not fetch listing");
          }
        }
        fetchListings();
      }
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

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
          onClick={() => {
            setInputValue("");
            searchBoxToggle();
          }}
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </>
  );
}
