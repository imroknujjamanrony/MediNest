/* eslint-disable @next/next/no-img-element */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  FaStar,
  FaMapMarkerAlt,
  FaRegHeart,
  FaHeart,
  FaCalendarAlt,
} from "react-icons/fa";

const doctors = [
  {
    id: 1,
    name: "Dr. Harold Bryant",
    specialty: "Neurologist",
    rating: 4.8,
    location: "Winona, MS",
    time: "30 Min",
    fees: 500,
    image:
      "https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Sandra Jones",
    specialty: "Cardiologist",
    rating: 4.8,
    location: "Beckley, WV",
    time: "30 Min",
    fees: 550,
    image:
      "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-doctor-standing-hospital_1301-7806.jpg",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Charles Scott",
    specialty: "Neurologist",
    rating: 4.2,
    location: "Hampshire, TX",
    time: "30 Min",
    fees: 600,
    image:
      "https://img.freepik.com/free-photo/portrait-confident-male-doctor-standing-with-arms-crossed_23-2148847623.jpg",
    available: true,
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    specialty: "Psychologist",
    rating: 5.0,
    location: "Minneapolis, MN",
    time: "30 Min",
    fees: 650,
    image:
      "https://img.freepik.com/free-photo/young-male-doctor-mask-with-stethoscope-isolated_1301-8070.jpg",
    available: true,
  },
];

export default function FeaturedDoctor() {
  return (
    <section className="py-14 px-4 md:px-10 bg-[#f8fbff]">
      <div className="text-center mb-10">
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          Featured Doctors
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
          Our Highlighted Doctors
        </h2>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        modules={[Pagination, Navigation]}
        className="pb-12"
      >
        {doctors.map((doc) => (
          <SwiperSlide key={doc.id}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative">
              <div className="relative">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute top-3 left-3 bg-orange-500 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                  <FaStar size={12} />
                  {doc.rating}
                </div>
                <div className="absolute top-3 right-3 text-white bg-white/80 hover:bg-red-100 hover:text-red-500 p-2 rounded-full cursor-pointer transition">
                  <FaRegHeart />
                </div>
              </div>

              <div className="p-4">
                <div className="text-sm text-green-600 font-medium">
                  {doc.specialty}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                  {doc.name}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <FaMapMarkerAlt className="mr-1 text-blue-500" />{" "}
                  {doc.location}
                  <span className="mx-2">•</span> {doc.time}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <div className="text-xs text-gray-400">
                      Consultation Fees
                    </div>
                    <div className="text-lg font-bold text-orange-500">
                      ${doc.fees}
                    </div>
                  </div>
                  <button className="flex items-center gap-2 bg-blue-900 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-800 transition">
                    <FaCalendarAlt /> Book Now
                  </button>
                </div>

                {doc.available && (
                  <div className="absolute bottom-[100px] right-4 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                    • Available
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
