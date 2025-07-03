import UserProfileBox from "../ui/UserProfileBox";
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
import LoadMore from "../ui/LoadMore";

export default async function App() {
  const listingRef = collection(db, "resumes");
  const q = query(listingRef, orderBy("timestamp", "desc"), limit(10));
  const querySnap = await getDocs(q);
  const listings: { id: string; data: DocumentData }[] = [];
  querySnap.forEach((doc) => {
    return listings.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  return (
    <main>
      <div className="w-[95%] lg:w-[80%] mx-auto">
        <Carousel />
      </div>
      <div className="mt-5 max-w-6xl mx-auto px-3">
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
      </div>
      <LoadMore />
    </main>
  );
}
