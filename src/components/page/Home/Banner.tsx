import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { GiDoctorFace } from "react-icons/gi";
import {
  FaCalendarAlt,
  FaCapsules,
  FaHeartbeat,
  FaHome,
  FaHospital,
  FaMapMarkerAlt,
  FaSearch,
  FaUserMd,
  FaVials,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";

import doctorImg from "../../../../public/Banner.jpg";
import doctor1 from "../../../../public/doctor1.jpg";
import doctor2 from "../../../../public/doctor2.avif";
import doctor3 from "../../../../public/doctor3.jpeg";

export default function Banner() {
  const categories = [
    {
      label: "Book Appointment",
      icon: <FaCalendarAlt />,
      color: "bg-purple-600",
    },
    { label: "Talk to Doctors", icon: <FaUserMd />, color: "bg-blue-500" },
    {
      label: "Hospitals & Clinics",
      icon: <FaHospital />,
      color: "bg-pink-500",
    },
    { label: "Healthcare", icon: <FaHeartbeat />, color: "bg-cyan-500" },
    {
      label: "Medicine & Supplies",
      icon: <FaCapsules />,
      color: "bg-violet-600",
    },
    { label: "Lab Testing", icon: <FaVials />, color: "bg-orange-500" },
    { label: "Home Care", icon: <FaHome />, color: "bg-teal-600" },
  ];

  return (
    <section className="relative w-full h-[100vh] flex flex-col justify-center items-center text-center text-white ">
      {/* Background Image */}
      <Image
        src={doctorImg}
        alt="Banner"
        layout="fill"
        objectFit="cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="flex  flex-col  justify-center items-center relative z-10 w-full px-4 space-y-6">
        {/* Top: Appointments and Ratings */}
        <div className="max-w-[350px] text-center flex items-center justify-center gap-4 bg-white/90 text-black px-4 py-2 rounded-full">
          {/* Doctor Avatars */}
          <div className="w-[100px] flex justify-start -space-x-2">
            {[doctor1, doctor2, doctor3].map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`doctor-${idx}`}
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
            ))}
          </div>
          {/* Text */}
          <div className="flex flex-col text-xs sm:text-sm">
            <span>5K+ Appointments</span>
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <IoMdStar key={i} />
              ))}
              <span className="ml-1 text-black">5.0 Ratings</span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
          Discover Health: Find Your Trusted <br />
          <GiDoctorFace className="inline text-blue-400" />
          <span className="text-blue-400">Doctors</span> Today
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center text-black max-w-2xl w-full bg-white rounded-lg md:rounded-full shadow overflow-hidden mx-auto p-2 gap-2 md:gap-0">
          {/* Search */}
          <div className="flex items-center flex-1 px-4 py-2 bg-white rounded-md md:rounded-none">
            <FaSearch className="text-blue-600 mr-2" />
            <input
              type="text"
              placeholder="Search doctors, clinics, hospitals"
              className="w-full outline-none placeholder-gray-500 text-sm"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-gray-300" />

          {/* Location */}
          <div className="flex items-center px-4 py-2 bg-white rounded-md md:rounded-none">
            <FaMapMarkerAlt className="text-blue-600 mr-2" />
            <input
              type="text"
              placeholder="Location"
              className="w-full md:w-48 outline-none placeholder-gray-500 text-sm"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-gray-300" />

          {/* Date */}
          <div className="flex items-center px-4 py-2 bg-white rounded-md md:rounded-none">
            <FaCalendarAlt className="text-blue-600 mr-2" />
            <input
              type="date"
              className="w-full md:w-36 outline-none text-sm"
            />
          </div>

          {/* Button */}
          <Button className="w-full md:w-auto rounded-md md:rounded-none md:rounded-r-full px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-semibold">
            Search
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="relative z-10 w-full flex justify-center px-4 mt-8 -bottom-50">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4 bg-white rounded-xl shadow">
          {categories.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center space-y-2 hover:scale-105 transition"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${item.color} text-white text-xl`}
              >
                {item.icon}
              </div>
              <p className="text-sm font-medium text-gray-800">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
