"use client";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position and apply blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 transition-all duration-300 z-50 ${
        isScrolled
          ? "bg-white bg-opacity-70 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Logo</div>
          <div className="space-x-6">
            <a href="#home" className="text-gray-800 hover:text-gray-600">
              Home
            </a>
            <a href="#about" className="text-gray-800 hover:text-gray-600">
              About
            </a>
            <a href="#services" className="text-gray-800 hover:text-gray-600">
              Services
            </a>
            <a href="#contact" className="text-gray-800 hover:text-gray-600">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
