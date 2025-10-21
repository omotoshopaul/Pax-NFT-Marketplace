"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/app/providers"
import NFTCard from "./nft-card"

const nfts = [
  {
    id: 1,
    name: "Ethereal Dreams",
    price: "$1,250",
    image: "/ethereal-digital-art.jpg",
  },
  {
    id: 2,
    name: "Quantum Flux",
    price: "$980",
    image: "/quantum-waves-digital.jpg",
  },
  {
    id: 3,
    name: "Cosmic Bloom",
    price: "$2,100",
    image: "/cosmic-abstract-art.jpg",
  },
  {
    id: 4,
    name: "Digital Horizon",
    price: "$750",
    image: "/abstract-digital-landscape.png",
  },
  {
    id: 5,
    name: "Neon Pulse",
    price: "$1,500",
    image: "/neon-digital-art.jpg",
  },
  {
    id: 6,
    name: "Void Echo",
    price: "$890",
    image: "/abstract-void-art.jpg",
  },
]

export default function NFTPreview() {
  const { isConnected } = useWallet()
  const router = useRouter()
  const [showBlur, setShowBlur] = useState(true)
  const [fadeOutBlur, setFadeOutBlur] = useState(false)
  const [fadeInNFTs, setFadeInNFTs] = useState(false)

  useEffect(() => {
    if (isConnected && showBlur) {
      // Start fade out animation for blur
      setFadeOutBlur(true)

      // After blur fades out, fade in NFTs and redirect
      const blurTimer = setTimeout(() => {
        setShowBlur(false)
        setFadeInNFTs(true)

        // Redirect to marketplace after animations complete
        const redirectTimer = setTimeout(() => {
          router.push("/marketplace")
        }, 800)

        return () => clearTimeout(redirectTimer)
      }, 600)

      return () => clearTimeout(blurTimer)
    }
  }, [isConnected, showBlur, router])

  return (
    <section id="explore" className="w-full py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Featured Masterpieces</h2>
          <p className="text-gray-600 text-lg">Curated digital art from emerging and established creators</p>
        </div>

        <div className="relative">
          {/* NFT Grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-700 ${
              fadeInNFTs ? "opacity-100" : "opacity-0"
            }`}
          >
            {nfts.map((nft) => (
              <NFTCard key={nft.id} {...nft} />
            ))}
          </div>

          {showBlur && (
            <div
              className={`absolute inset-0 bg-white/80 backdrop-blur-md rounded-lg flex items-center justify-center transition-opacity duration-600 ${
                fadeOutBlur ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🔒</div>
                <p className="text-xl font-semibold text-gray-800">Connect Wallet to view NFTs</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
