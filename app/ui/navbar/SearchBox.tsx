import { useSetAtom } from "jotai";
import { lastListing, resumeListings } from "@/app/utils/globalStates";
import { useEffect, useState } from "react";
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
import { db } from "@/app/utils/firebase-fn";
import { toast } from "react-toastify";

export default function SearchBox({
  searchBoxToggle,
  isSearchMidVisible,
}: {
  searchBoxToggle: () => void;
  isSearchMidVisible: boolean;
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
          placeholder="Search By Name"
        />
        <button
          className="inline-block px-5"
          id="searchCloseMid-btn"
          onClick={() => {
            setInputValue("");
            searchBoxToggle();
          }}
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </div>
  );
}
