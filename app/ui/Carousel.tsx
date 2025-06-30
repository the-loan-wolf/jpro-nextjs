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

        const listingsData: { id: string; data: DocumentData }[] = [];

        for (const docSnap of querySnap.docs) {
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
      } catch (error) {
        toast.error("Could not fetch listings");
      } finally {
        setLoading(false);
      }
    }

    const saved = sessionStorage.getItem("featuredListings");
    if (saved) {
      setListings(JSON.parse(saved));
      setLoading(false);
    } else {
      fetchListings();
      console.log("need to go to server");
    }
  }, []);

  // Save listings before unmount
  useEffect(() => {
    return () => {
      if (listings) {
        sessionStorage.setItem("featuredListings", JSON.stringify(listings));
      }
    };
  }, [listings]);

  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, Autoplay]}
      spaceBetween={5}
      breakpoints={{
        // When window width is >= 640px
        350: {
          slidesPerView: 2,
        },
        // When window width is >= 1024px
        1024: {
          slidesPerView: 4,
        },
      }}
      // slidesPerView={2}
      pagination={{ clickable: true }}
      className="lg:w-[80%] min-h-[300px] !pt-5 lg:!px-5"
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        stopOnLastSlide: false,
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
