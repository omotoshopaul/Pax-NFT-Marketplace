"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useWallet } from "@/app/providers"
import { LogOut } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showWalletMenu, setShowWalletMenu] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isConnected, connectWallet, disconnectWallet, walletAddress } = useWallet()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleWalletClick = () => {
    if (!isConnected) {
      connectWallet()
      setShowWalletMenu(false)
    } else {
      setShowWalletMenu(!showWalletMenu)
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-white/85 shadow-lg" : "backdrop-blur-md bg-white/50"
      } border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full border-2 border-[#f85522] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#f85522]" />
            </div>
            <span className="text-xl font-bold text-black">Pax</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#explore" className="text-black hover:text-[#f85522] transition-colors">
              Explore
            </a>
            <a href="/#points" className="text-black hover:text-[#f85522] transition-colors">
              Points
            </a>
            <a href="/#about" className="text-black hover:text-[#f85522] transition-colors">
              About
            </a>
            <a href="/#contact" className="text-black hover:text-[#f85522] transition-colors">
              Contact
            </a>
            <Link href="/marketplace" className="text-black hover:text-[#f85522] transition-colors">
              Marketplace
            </Link>
            <Link href="/swap" className="text-black hover:text-[#f85522] transition-colors">
              Swap
            </Link>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:block relative">
            <button
              onClick={handleWalletClick}
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-[#f85522] transition-all duration-300 font-medium"
            >
              {isConnected ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}` : "Connect Wallet"}
            </button>

            {/* Wallet Menu */}
            {isConnected && showWalletMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden animate-fade-in">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm text-gray-600">Connected Wallet</p>
                  <p className="font-semibold text-black truncate">{walletAddress}</p>
                </div>
                <button
                  onClick={() => {
                    disconnectWallet()
                    setShowWalletMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-black hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </button>
              </div>
            )}
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
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            <a href="/#explore" className="block px-4 py-2 text-black hover:text-[#f85522]">
              Explore
            </a>
            <a href="/#points" className="block px-4 py-2 text-black hover:text-[#f85522]">
              Points
            </a>
            <a href="/#about" className="block px-4 py-2 text-black hover:text-[#f85522]">
              About
            </a>
            <a href="/#contact" className="block px-4 py-2 text-black hover:text-[#f85522]">
              Contact
            </a>
            <Link href="/marketplace" className="block px-4 py-2 text-black hover:text-[#f85522]">
              Marketplace
            </Link>
            <Link href="/swap" className="block px-4 py-2 text-black hover:text-[#f85522]">
              Swap
            </Link>
            <button
              onClick={handleWalletClick}
              className="w-full mt-2 px-6 py-2 bg-black text-white rounded-full hover:bg-[#f85522] transition-all font-medium"
            >
              {isConnected ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}` : "Connect Wallet"}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
