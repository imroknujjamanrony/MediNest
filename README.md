MediNest - Hospital Management System
MediNest is a full-stack web application designed to streamline hospital operations, offering a multi-role digital solution for managing patients, appointments, doctors, and staff. Built with modern technologies, it provides a secure, scalable, and user-friendly platform for healthcare management.
🌐 Project Overview
MediNest is a hospital management system that facilitates seamless interaction between admins, doctors, staff, and patients. The application features a public landing page for general access and role-based dashboards for authenticated users, ensuring efficient hospital operations and enhanced user experience.
📑 Table of Contents

Features
Tech Stack
Navigation & Route Structure
Database Schema
Development Plan
Installation
Usage
Future Features
Contributing
License
Contact

✨ Features
🌐 Landing Page

Navbar: Navigation for public routes (Home, About, Contact, Login).
Hero Banner: Prominent banner with a headline and search input (e.g., "Find doctors by specialty").
Care Categories: Cards showcasing major services (Cardiology, Pediatrics, Surgery, etc.).
Top Doctors: Featured doctors with ratings, specialties, and availability.
Why Book With Us: Highlights system benefits (Secure, Real-time, Easy Booking).
Testimonials: Patient feedback to build trust.
FAQs: Answers to common queries (booking, login, roles).
Blog Section: Health tips, doctor insights, and medical news.
Contact Form: Simple form for email, subject, and message.
Footer: Links to GitHub, contact, terms, and privacy policy.

📊 Role-Based Dashboards

Admin Dashboard:
View system stats (total users, appointments, doctors).
Manage users (add/edit/delete).
Manage all appointments.

Doctor Dashboard:
View today’s appointments and assigned patients.
Manage prescriptions and update schedules.

Staff Dashboard:
Create appointments and manage patient records.
View all scheduled appointments.

Patient Dashboard:
Book appointments and view medical/prescription history.
Access assigned doctor details and submit feedback.

🧑‍💻 Tech Stack

Layer
Technology

Frontend
Next.js, TypeScript, Tailwind CSS

State Management
Redux Toolkit (appointments, auth, roles)

Backend
Next.js API Routes (/app/api)

Authentication
NextAuth.js (credentials/email provider)

Database
MongoDB (via Mongoose models)

File Upload
Cloudinary (for prescriptions, reports)

Deployment
Vercel (frontend/backend), MongoDB Atlas

🧭 Navigation & Route Structure
🔓 Public Routes

Path
Purpose

/
Landing Page

/login
Login Page (role selector)

/register
Patient Sign-Up (optional)

/about
About System/Developer

/contact
Contact Form

🔐 Protected Routes

Role
Dashboard Routes

Admin
/dashboard/admin, /admin/users, /admin/appointments, /admin/reports

Doctor
/dashboard/doctor, /doctor/patients, /doctor/schedule, /doctor/prescriptions

Staff
/dashboard/staff, /staff/appointments, /staff/add-patient

Patient
/dashboard/patient, /patient/my-appointments, /patient/prescriptions

🗃️ Database Schema (Simplified for MVP)
👤 User Model
{
name: string;
email: string;
password: string;
role: 'admin' | 'doctor' | 'staff' | 'patient';
createdAt: Date;
}

🧍 Patient Model
{
userId: ObjectId;
age: number;
gender: string;
medicalHistory: string[];
assignedDoctor: ObjectId;
}

📅 Appointment Model
{
patientId: ObjectId;
doctorId: ObjectId;
date: Date;
time: string;
status: 'pending' | 'approved' | 'completed' | 'cancelled';
}

💊 Prescription Model
{
doctorId: ObjectId;
patientId: ObjectId;
appointmentId: ObjectId;
medications: string[];
notes: string;
createdAt: Date;
}

🧱 Development Plan (10-Day MVP Sprint)

Day
Task

1-2
Configure NextAuth with role-based redirects

3
Create Mongoose models and MongoDB connection

4
Build Admin dashboard and manage users

5
Build Staff panel: add patient, manage appointments

6
Build Doctor dashboard: patients & prescriptions

7
Build Patient dashboard: book/view appointments

8
Complete landing page with all public sections

9
Perform testing and resolve UI/logic bugs

10
Final polish, documentation, and GitHub push

🚀 Installation

Clone the repository:git clone https://github.com/your-username/medinest.git

Navigate to the project directory:cd medinest

Install dependencies:npm install

Set up environment variables:
Create a .env.local file.
Add MongoDB URI, NextAuth secrets, and Cloudinary credentials.

Run the development server:npm run dev

🖱️ Usage

Public Access: Visit the landing page to explore services, book appointments, or contact support.
Authenticated Access: Log in with credentials to access role-specific dashboards.
Admin: Manage users, appointments, and view system stats.
Doctor: Manage patients, prescriptions, and schedules.
Staff: Create appointments and update patient records.
Patient: Book appointments and view medical history.

🔮 Future Features

💳 Payment gateway for online appointment payments.
📎 Medical report upload/download as PDF.
📈 Data analytics for admin (charts, graphs).
📱 Mobile responsive version or PWA.
🔔 Real-time notifications (Socket.io or polling).
🌙 Dark/Light theme toggle.

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
📬 Contact

Email: support@medinest.com
GitHub: MediNest Repository
Website: MediNest
