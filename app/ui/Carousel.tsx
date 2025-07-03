import ClientCarousel from "@/app/ui/ClientCarousel";
import {
  collection,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { db } from "../utils/firebase-fn";

export default async function Carousel() {
  const listingRef = collection(db, "featured");
  const q = query(listingRef, limit(5));
  const querySnap = await getDocs(q);

  const listingsData: { id: string; data: DocumentData }[] = [];

  for (const docSnap of querySnap.docs) {
    const resumeRef = docSnap.data().ref as DocumentReference;
    const resumeSnap = await getDoc(resumeRef);

    if (resumeSnap.exists()) {
      listingsData.push({
        id: resumeSnap.id, // or docSnap.id if you want featured ID
        data: JSON.parse(JSON.stringify(resumeSnap.data())),
      });
    }
  }

  return (
    <>
      <ClientCarousel listings={listingsData} />
    </>
  );
}
