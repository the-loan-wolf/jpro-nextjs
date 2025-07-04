"use client";

import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { resumeListings, lastListing } from "../utils/globalStates";
import ResumeList from "./ResumeList";
import LoadMore from "./LoadMore";
import { DocumentData } from "firebase/firestore";

export default function ListingClientWrapper({
  initialListings,
  lastVisible,
}: {
  initialListings: { id: string; data: DocumentData }[];
  lastVisible: number;
}) {
  const [listings, setListings] = useAtom(resumeListings);
  const [lastFetchedListing, setLastFetchedListing] = useAtom(lastListing);

  useEffect(() => {
    const saved = sessionStorage.getItem("listings");
    const lastVisibleListings = sessionStorage.getItem("lastVisible");

    if (saved && lastVisibleListings) {
      setListings(JSON.parse(saved));
      setLastFetchedListing(JSON.parse(lastVisibleListings));
    } else {
      setListings(initialListings);
      setLastFetchedListing(lastVisible);
    }
  }, []);

  // Save listings before unmount
  useEffect(() => {
    return () => {
      if (listings) {
        sessionStorage.setItem("listings", JSON.stringify(listings));
        sessionStorage.setItem(
          "lastVisible",
          JSON.stringify(lastFetchedListing)
        );
      }
    };
  }, [listings, lastFetchedListing]);

  return (
    <>
      <ResumeList />
      {lastFetchedListing && <LoadMore />}
    </>
  );
}
