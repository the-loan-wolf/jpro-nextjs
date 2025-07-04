import { db } from "../utils/firebase-fn";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import Carousel from "../ui/Carousel";
import ListingClientWrapper from "../ui/ListingClientWrapper";

export default async function App() {
  const listingRef = collection(db, "resumes");
  const q = query(listingRef, orderBy("timestamp", "desc"), limit(10));
  const querySnap = await getDocs(q);

  const listings: { id: string; data: DocumentData }[] = [];
  querySnap.forEach((doc) => {
    const raw = doc.data();
    const cleanData = {
      ...raw,
      timestamp: raw.timestamp?.toDate().toISOString() ?? null, // convert Firestore Timestamp
    };
    listings.push({
      id: doc.id,
      data: cleanData,
    });
  });

  const lastVisible = querySnap.docs[querySnap.docs.length - 1];
  // below line is done to serialize the timestamp data
  // so we can use it in client side to fetch new batch of data
  // on client we will have to deserialize this data back from number to firestore timestamp
  const lastVisibleMarker: number = lastVisible.data().timestamp.toMillis();

  return (
    <main>
      <div className="w-[95%] lg:w-[80%] mx-auto">
        <Carousel />
      </div>
      <div className="mt-5 max-w-6xl mx-auto px-3">
        <ListingClientWrapper
          initialListings={listings}
          lastVisible={lastVisibleMarker}
        />
      </div>
    </main>
  );
}
