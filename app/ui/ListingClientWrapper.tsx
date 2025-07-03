"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { resumeListings, lastListing } from "../utils/globalStates";
import ResumeList from "./ResumeList";
import LoadMore from "./LoadMore";

export default function ListingClientWrapper({ initialListings, lastVisible }: any) {
  const setListings = useSetAtom(resumeListings);
  const setLastListing = useSetAtom(lastListing);

  useEffect(() => {
    setListings(initialListings);
    setLastListing(lastVisible);
  }, [initialListings, lastVisible]);

  return (
    <>
      <ResumeList />
      <LoadMore />
    </>
  );
}
