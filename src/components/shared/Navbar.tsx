"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/doctor", label: "Doctor" },
    { path: "/contact", label: "Contact" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="w-full bg-white text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 h-auto"
            variant="ghost"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={40} height={40} />
            <span className="text-2xl font-bold text-blue-600">MediNest</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.path}
              className="relative text-sm font-medium transition-colors duration-200 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: User Info + Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {session?.user && (
            <div className="flex items-center gap-2">
              <Image
                src={session?.user?.image || "/default-avatar.png"}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full object-cover border border-gray-200"
              />
              <span className="text-sm font-medium">{session?.user?.name}</span>
            </div>
          )}

          {session?.user ? (
            <Button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link href="/register">
                <Button variant="outline">Register</Button>
              </Link>
              <Link href="/login">
                <Button variant="default">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Slide In */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-100 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <span className="text-lg font-bold text-blue-600">Menu</span>
          <Button
            variant="ghost"
            className="p-2 h-auto"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile User Info */}
        {session?.user && (
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <Image
              src={session?.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              width={20}
              height={8}
              className="rounded-full object-cover border border-gray-200"
            />
            <span className="text-sm font-medium">{session?.user?.name}</span>
          </div>
        )}

        {/* Links */}
        <nav className="flex flex-col p-4 gap-3">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.path}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Buttons */}
        <div className="p-4 flex flex-col gap-2">
          {session?.user ? (
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link href="/register">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="default" onClick={() => setIsOpen(false)}>
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
