"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"

interface NFT {
  id: number
  name: string
  price: number
  image: string
  category: string
}

// Generate 100 sample NFTs
const generateNFTs = (): NFT[] => {
  const names = [
    "Ethereal Dreams",
    "Quantum Flux",
    "Cosmic Bloom",
    "Digital Horizon",
    "Neon Pulse",
    "Void Echo",
    "Aurora Waves",
    "Stellar Drift",
    "Nebula Dance",
    "Pixel Storm",
  ]
  const categories = ["digital-art", "abstract", "photography", "3d"]
  const images = [
    "/ethereal-digital-art.jpg",
    "/quantum-waves-digital.jpg",
    "/cosmic-abstract-art.jpg",
    "/abstract-digital-landscape.png",
    "/neon-digital-art.jpg",
    "/abstract-void-art.jpg",
  ]

  const nfts: NFT[] = []
  for (let i = 1; i <= 100; i++) {
    nfts.push({
      id: i,
      name: `${names[i % names.length]} #${i}`,
      price: Math.floor(Math.random() * 10000) + 100,
      image: images[i % images.length],
      category: categories[i % categories.length],
    })
  }
  return nfts
}

interface NFTMarketGridProps {
  searchQuery: string
  priceRange: string
  category: string
  sortBy: string
}

export default function NFTMarketGrid({ searchQuery, priceRange, category, sortBy }: NFTMarketGridProps) {
  const [nfts] = useState<NFT[]>(generateNFTs())
  const [visibleCount, setVisibleCount] = useState(12)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const threshold = document.documentElement.scrollHeight - 500
      if (scrollPosition >= threshold && visibleCount < filteredAndSortedNFTs.length) {
        setVisibleCount((prev) => Math.min(prev + 12, filteredAndSortedNFTs.length))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [visibleCount])

  const filteredAndSortedNFTs = useMemo(() => {
    const filtered = nfts.filter((nft) => {
      // Search filter
      if (searchQuery && !nft.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Category filter
      if (category !== "all" && nft.category !== category) {
        return false
      }

      // Price range filter
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map((v) => Number.parseInt(v))
        if (priceRange.includes("+")) {
          if (nft.price < 5000) return false
        } else if (nft.price < min || nft.price > max) {
          return false
        }
      }

      return true
    })

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "trending") {
      filtered.sort(() => Math.random() - 0.5)
    }

    return filtered
  }, [nfts, searchQuery, priceRange, category, sortBy])

  return (
    <section className="w-full py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-600 mb-8">
          Showing {Math.min(visibleCount, filteredAndSortedNFTs.length)} of {filteredAndSortedNFTs.length} NFTs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedNFTs.slice(0, visibleCount).map((nft, index) => (
            <div
              key={nft.id}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${(index % 8) * 50}ms` }}
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-[#f85522]">
                <div className="relative w-full aspect-square">
                  <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-black mb-2 truncate">{nft.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-[#f85522] font-bold">${nft.price}</p>
                  <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-[#f85522] transition-all duration-300 transform hover:scale-105">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedNFTs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No NFTs found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
