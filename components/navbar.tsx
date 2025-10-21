"use client"

import { useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#f85522] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#f85522]" />
            </div>
            <span className="text-xl font-bold text-black">Pax</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#explore" className="text-black hover:text-[#f85522] transition-colors">
              Explore
            </a>
            <a href="#about" className="text-black hover:text-[#f85522] transition-colors">
              About
            </a>
            <a href="#contact" className="text-black hover:text-[#f85522] transition-colors">
              Contact
            </a>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <button className="px-6 py-2 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300">
              Connect Wallet
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#explore" className="block px-4 py-2 text-black hover:text-[#f85522]">
              Explore
            </a>
            <a href="#about" className="block px-4 py-2 text-black hover:text-[#f85522]">
              About
            </a>
            <a href="#contact" className="block px-4 py-2 text-black hover:text-[#f85522]">
              Contact
            </a>
            <button className="w-full mt-2 px-6 py-2 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all">
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
