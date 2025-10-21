"use client"

import { useState } from "react"
import Image from "next/image"

interface NFTCardProps {
  id: number
  name: string
  price: string
  image: string
}

export default function NFTCard({ name, price, image }: NFTCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ${
          isHovered ? "scale-105 shadow-2xl" : "shadow-lg"
        } ${isHovered ? "animate-glow" : ""}`}
      >
        <div className="relative w-full aspect-square">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-black mb-2">{name}</h3>
        <p className="text-[#f85522] font-bold text-lg">{price}</p>
      </div>
    </div>
  )
}
