"use client"

import { useState, useEffect } from "react"
import { WalletProvider } from "./providers"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import NFTPreview from "@/components/nft-preview"
import PointsSystem from "@/components/points-system"
import Reviews from "@/components/reviews"
import Footer from "@/components/footer"

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const totalScroll = documentHeight - windowHeight
      const progress = totalScroll > 0 ? scrollTop / totalScroll : 0
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <WalletProvider>
      <main className="w-full overflow-x-hidden bg-white">
        <Navbar />
        <Hero />
        <NFTPreview />
        <PointsSystem />
        <Reviews />
        <Footer />
      </main>
    </WalletProvider>
  )
}
