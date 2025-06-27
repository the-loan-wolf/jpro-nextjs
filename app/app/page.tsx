"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserProfileBox from "../ui/UserProfileBox";
import { db } from "../utils/firebase-fn";
import Loading from "./loading";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { useAtom } from "jotai";
import { resumeListings } from "../utils/globalStates";

// Define the document type
interface UserDocument {
  id: string;
  profilePicEle: string;
  resumeFName: string;
  resumeLName: string;
  compPost: string;
  salary: string;
}

export default function App() {
  const [listings, setListings] = useAtom(resumeListings);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "resumes");
        const q = query(listingRef, orderBy("timestamp", "desc"), limit(10));
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
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listing");
      }
    }
    const saved = sessionStorage.getItem("listings");
    if (saved) {
      setListings(JSON.parse(saved));
      setLoading(false);
    } else {
      fetchListings();
    }
  }, []);

  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, "resumes");
      const q = query(
        listingRef,
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
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
      setListings((prevState) => [...(prevState ?? []), ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listing");
    }
  }

  // Save listings before unmount
  useEffect(() => {
    return () => {
      if (listings) {
        sessionStorage.setItem("listings", JSON.stringify(listings));
      }
    };
  }, [listings]);

  return (
    <main>
      <div className="mt-5 max-w-6xl mx-auto px-3">
        {loading ? (
          <Loading />
        ) : listings && listings.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-y-4">
            {listings &&
              listings.map((listing) => (
                <UserProfileBox
                  key={listing.id}
                  userData={{
                    uid: listing.id,
                    pic: listing.data.profilePicEle,
                    name: `${listing.data.resumeFName} ${listing.data.resumeLName}`,
                    occupation: listing.data.compPost,
                    salary: listing.data.salary,
                  }}
                />
              ))}
          </div>
        ) : (
          <p>There are no current offers</p>
        )}
      </div>
      {lastFetchedListing && (
        <div className="flex justify-center items-center">
          <button
            onClick={onFetchMoreListings}
            className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
          >
            Load more
          </button>
        </div>
      )}
    </main>
  );
}
