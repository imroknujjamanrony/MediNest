"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // ⚠️ This should eventually come from your auth context or hook
  const user = true; // or null / false if not logged in

  const links = [
    { path: "/", label: "Home" },
    { path: "/doctor", label: "Doctor" },
    { path: "/contact", label: "Contact" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="w-full  text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="text-red-500">{session?.user.name}</div>
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
              className="hover:text-blue-600 transition-colors text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons - CONDITIONAL */}
        <div className="hidden md:flex gap-2">
          {user ? (
            <Button variant="ghost">Logout</Button>
          ) : (
            <>
              <Button variant="outline">Register</Button>
              <Button variant="default">Login</Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-3 bg-white border-t border-gray-100 text-left">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.path}
              className="block text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Buttons - CONDITIONAL */}
          <div className="pt-2 flex flex-col gap-2">
            {user ? (
              <Button variant="ghost">Logout</Button>
            ) : (
              <>
                <Button variant="outline">Register</Button>
                <Button variant="default">Login</Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
