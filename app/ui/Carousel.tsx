// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../utils/firebase-fn";
import { toast } from "react-toastify";
import UserProfileBox from "./UserProfileBox";

export default function Carousel() {
  const [listings, setListings] = useState<
    { id: string; data: DocumentData }[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchListings() {
        try {
          const listingRef = collection(db, "featured");
          const q = query(listingRef, limit(5));
          const querySnap = await getDocs(q);
          console.log("querySnap:",querySnap.docs[0].ref);
    
          const listingsData: { id: string; data: DocumentData }[] = [];
    
          for (const docSnap of querySnap.docs) {
            console.log("document:",docSnap);
            const resumeRef = docSnap.data().ref as DocumentReference;
            const resumeSnap = await getDoc(resumeRef);
    
            if (resumeSnap.exists()) {
              listingsData.push({
                id: resumeSnap.id, // or docSnap.id if you want featured ID
                data: resumeSnap.data(),
              });
            }
          }
    
          setListings(listingsData);
          console.log("listings:", listingsData)
        } catch (error) {
          console.error("WHY NO: ",error);
          toast.error("Could not fetch listings");
        } finally {
          setLoading(false);
        }
      }
    fetchListings();
  }, []);
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      className="w-[90%]"
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={1000}
    >
      {listings &&
        listings.map((listing) => (
          <SwiperSlide key={listing.id}>
            <UserProfileBox
              userData={{
                uid: listing.id,
                pic: listing.data.profilePicEle,
                name: `${listing.data.resumeFName} ${listing.data.resumeLName}`,
                occupation: listing.data.compPost,
                salary: listing.data.salary,
              }}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
