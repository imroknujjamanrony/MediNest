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
      "https://images.unsplash.com/photo-1588776814546-ec7e4b6f98f5?q=80&w=600",
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
    <section className="top-specialist-container">
      <h3 className="section-subtitle">Top Specialties</h3>
      <h2 className="section-title">Highlighting the Care & Support</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="top-specialist-swiper"
      >
        {specialties.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="specialist-card">
              <img
                src={item.image}
                alt={item.name}
                className="specialist-image"
              />
              <div className="specialist-icon">{item.icon}</div>
              <div className="specialist-info">
                <h4>{item.name}</h4>
                <p>{item.doctors} Doctors</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopSpecialist;
