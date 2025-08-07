"use client";

import React from "react";
import {
  FaHeartbeat,
  FaBone,
  FaBrain,
  FaChild,
  FaUserMd,
  FaVial,
  FaLungs,
  FaToilet,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const specialties = [
  {
    name: "Cardiology",
    doctors: 254,
    icon: <FaHeartbeat />,
    image:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Orthopedics",
    doctors: 151,
    icon: <FaBone />,
    image:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Neurology",
    doctors: 176,
    icon: <FaBrain />,
    image:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Pediatrics",
    doctors: 124,
    icon: <FaChild />,
    image:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Psychiatry",
    doctors: 112,
    icon: <FaUserMd />,
    image:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Endocrinology",
    doctors: 104,
    icon: <FaVial />,
    image:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Pulmonology",
    doctors: 41,
    icon: <FaLungs />,
    image:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Urology",
    doctors: 39,
    icon: <FaToilet />,
    image:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
];

const TopSpecialist = () => {
  return (
    <section className="py-12 mt-10 px-4 sm:px-6 lg:px-12 bg-white text-gray-800">
      <div className="text-center mb-10">
        <h3 className="text-lg text-blue-600 font-semibold uppercase tracking-wide">
          Top Specialties
        </h3>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2">
          Highlighting the Care & Support
        </h2>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="!pb-10"
      >
        {specialties.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300 flex items-center justify-center">
                <div className="text-white text-4xl group-hover:scale-110 transform transition duration-300">
                  {item.icon}
                </div>
              </div>
              <div className="absolute bottom-0 w-full bg-white/90 text-center py-3 px-2">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.doctors} Doctors</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopSpecialist;
