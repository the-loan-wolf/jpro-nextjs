"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import UserProfileBox from "./UserProfileBox";
import { DocumentData } from "firebase/firestore";

export default function ClientCarousel({
  listings,
}: {
  listings: {
    id: string;
    data: DocumentData;
  }[];
}) {
  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, Autoplay]}
      spaceBetween={10}
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
      {listings.map((listing) => (
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
