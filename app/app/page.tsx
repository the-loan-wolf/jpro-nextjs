"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserProfileBox from "../ui/UserProfileBox";
import { db, getDocument } from "../utils/firebase-fn";
import { headers } from "next/headers";
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
  const [listings, setListings] = useState<
    { id: string; data: DocumentData }[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "resumes");
        const q = query(listingRef, limit(10));
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

    fetchListings();
  }, []);

  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, "resumes");
      const q = query(listingRef, startAfter(lastFetchedListing), limit(10));
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

  return (
    <main>
      <div className="mt-5 flex justify-center">
        <div className="flex justify-start flex-wrap gap-4 max-w-5xl lg:max-w-4xl">
          {loading ? (
            <p>loading...</p>
          ) : listings && listings.length > 0 ? (
            <>
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
            </>
          ) : (
            <p>There are no current offers</p>
          )}
        </div>
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
