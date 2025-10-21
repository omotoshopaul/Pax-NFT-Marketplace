"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import NFTGallery from "@/components/nft-gallery"
import About from "@/components/about"
import Contact from "@/components/contact"
import FadeOutFooter from "@/components/fade-out-footer"

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
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <NFTGallery />
      <About />
      <Contact />
      <FadeOutFooter scrollProgress={scrollProgress} />
    </main>
  )
}
