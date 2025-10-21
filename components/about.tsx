"use client"

import { useEffect, useRef } from "react"

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createFloatingShape = () => {
      const shape = document.createElement("div")
      const size = Math.random() * 100 + 50
      const duration = Math.random() * 20 + 20

      shape.className = "absolute rounded-full opacity-10"
      shape.style.width = `${size}px`
      shape.style.height = `${size}px`
      shape.style.left = `${Math.random() * 100}%`
      shape.style.top = `${Math.random() * 100}%`
      shape.style.background = "#f85522"
      shape.style.animation = `float ${duration}s ease-in-out infinite`
      shape.style.pointerEvents = "none"

      container.appendChild(shape)

      setTimeout(() => shape.remove(), duration * 1000)
    }

    const interval = setInterval(createFloatingShape, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="relative w-full py-20 px-4 bg-white overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">About Pax</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Pax empowers artists and collectors through an open digital economy where creativity meets innovation. We
            believe in democratizing access to digital art, enabling creators to reach global audiences and collectors
            to discover unique masterpieces. Our platform combines cutting-edge technology with a community-first
            approach, fostering a vibrant ecosystem where art thrives.
          </p>
        </div>
      </div>
    </section>
  )
}
