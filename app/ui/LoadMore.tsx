"use client";

import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase-fn";
import { toast } from "react-toastify";
import { useAtom, useSetAtom } from "jotai";
import { lastListing, resumeListings } from "../utils/globalStates";
import { useState } from "react";

export default function LoadMore() {
  const setListings = useSetAtom(resumeListings);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing] = useAtom(lastListing);
  let startAfterTimestamp: Timestamp | null = null;
  if (lastFetchedListing) {
    startAfterTimestamp = Timestamp.fromMillis(lastFetchedListing);
  }

  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, "resumes");
      const q = query(
        listingRef,
        orderBy("timestamp", "desc"),
        startAfter(startAfterTimestamp),
        limit(10)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      if (lastVisible) {
        const lastVisibleMarker: number = lastVisible
          .data()
          .timestamp.toMillis();
        setLastFetchListing(lastVisibleMarker);
      } else {
        setLastFetchListing(null);
      }
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

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onFetchMoreListings}
        className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
      >
        Load more
      </button>
    </div>
  );
}
