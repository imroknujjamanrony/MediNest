// WhyUs.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FaUserMd,
  FaFileAlt,
  FaCalendarAlt,
  FaLightbulb,
} from "react-icons/fa";

export default function WhyUs() {
  return (
    <section className="bg-[#031b38] text-white py-14 px-4 md:px-10">
      {/* Top Reason Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <button className="text-xs font-semibold px-4 py-1 bg-blue-100 text-blue-600 rounded-full">
            Why Book With Us
          </button>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-100">
            Compelling Reasons to Choose
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-gray-300 mb-16">
          <div>
            <h4 className="flex items-center justify-center gap-2 font-semibold text-white mb-2">
              <span className="text-orange-500">●</span> Follow-Up Care
            </h4>
            <p>
              We ensure continuity of care through regular follow-ups and
              communication, helping you stay on track with health goals.
            </p>
          </div>
          <div>
            <h4 className="flex items-center justify-center gap-2 font-semibold text-white mb-2">
              <span className="text-purple-500">●</span> Patient-Centered
              Approach
            </h4>
            <p>
              We prioritize your comfort and preferences, tailoring our services
              to meet your individual needs and care from our experts.
            </p>
          </div>
          <div>
            <h4 className="flex items-center justify-center gap-2 font-semibold text-white mb-2">
              <span className="text-blue-400">●</span> Convenient Access
            </h4>
            <p>
              Easily book appointments online or through our dedicated customer
              service team, with flexible hours to fit your schedule.
            </p>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Images */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://img.freepik.com/free-photo/doctor-talking-family-waiting-room_107420-84808.jpg"
              alt="Family Consultation"
              className="rounded-lg object-cover w-full h-48 sm:h-56"
            />
            <img
              src="https://img.freepik.com/free-photo/happy-doctor-with-kid_1098-21115.jpg"
              alt="Doctor with Child"
              className="rounded-lg object-cover w-full h-48 sm:h-56"
            />
            <img
              src="https://img.freepik.com/free-photo/close-up-lab-tools-test-tubes_23-2148767903.jpg"
              alt="Lab Work"
              className="rounded-lg object-cover w-full h-48 sm:h-56 col-span-2"
            />
          </div>

          {/* Right Text & Accordion */}
          <div>
            <button className="text-xs font-semibold px-4 py-1 bg-blue-100 text-blue-600 rounded-full">
              Why Book With Us
            </button>
            <h3 className="text-3xl font-bold mt-4 mb-4 leading-tight">
              We are committed to understanding your <br />
              <span className="text-cyan-400">
                unique needs and delivering care.
              </span>
            </h3>
            <p className="text-gray-300 mb-6">
              As a trusted healthcare provider in our community, we are
              passionate about promoting health and wellness beyond the clinic.
              We actively engage in community outreach programs, health fairs,
              and educational workshops.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="vision">
                <AccordionTrigger className="text-white">
                  01. Our Vision
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  To create a healthier future for individuals and communities
                  through compassionate, high-quality care and innovation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="mission">
                <AccordionTrigger className="text-white">
                  02. Our Mission
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  To deliver exceptional healthcare experiences by prioritizing
                  our patients' unique needs and fostering trust through every
                  interaction.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Bottom Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          <div>
            <div className="flex items-center justify-center text-3xl mb-2 text-blue-400">
              <FaUserMd />
            </div>
            <h4 className="text-white font-semibold mb-1">
              Search For Doctors
            </h4>
            <p className="text-gray-400 text-sm">
              Search for a doctor based on specialization, location, or
              availability for your treatments.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-center text-3xl mb-2 text-orange-400">
              <FaFileAlt />
            </div>
            <h4 className="text-white font-semibold mb-1">
              Check Doctor Profile
            </h4>
            <p className="text-gray-400 text-sm">
              Explore detailed doctor profiles on our platform to make informed
              healthcare decisions.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-center text-3xl mb-2 text-cyan-400">
              <FaCalendarAlt />
            </div>
            <h4 className="text-white font-semibold mb-1">
              Schedule Appointment
            </h4>
            <p className="text-gray-400 text-sm">
              After choosing your preferred doctor, select a convenient time
              slot and confirm your appointment.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-center text-3xl mb-2 text-purple-500">
              <FaLightbulb />
            </div>
            <h4 className="text-white font-semibold mb-1">Get Your Solution</h4>
            <p className="text-gray-400 text-sm">
              Discuss your health concerns with the doctor and receive
              personalized advice and solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
