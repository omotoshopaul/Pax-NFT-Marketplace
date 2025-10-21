"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useWallet } from "@/app/providers"

interface PointsCard {
  id: number
  title: string
  description: string
}

const pointsCards: PointsCard[] = [
  {
    id: 1,
    title: "Points Mechanism",
    description:
      "Earn Pax OG Points by buying NFTs on our marketplace. Accumulate points with every purchase and become eligible for exclusive airdrops and rewards.",
  },
  {
    id: 2,
    title: "User Dashboard",
    description:
      "Track your NFT collection, monitor your total points balance, and check your rank among all Pax OG users. Get real-time insights into your portfolio.",
  },
  {
    id: 3,
    title: "Leaderboard",
    description:
      "Compete with other collectors and see where you stand. The top 50 Pax OG users with the highest points are featured on our exclusive leaderboard.",
  },
]

export default function PointsSystem() {
  const { isConnected, connectWallet } = useWallet()
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isConnected && !isUnlocked) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsUnlocked(true)
        setIsAnimating(false)
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [isConnected, isUnlocked])

  const handleConnect = () => {
    connectWallet()
  }

  return (
    <section id="points" className="w-full py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Pax OG Points System</h2>
          <p className="text-gray-600 text-lg">Earn rewards and climb the ranks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pointsCards.map((card) => (
            <div
              key={card.id}
              className={`relative rounded-lg overflow-hidden transition-all duration-700 ${
                isAnimating ? "blur-sm" : isUnlocked ? "blur-0" : "blur-md"
              }`}
            >
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 h-full flex flex-col justify-between">
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔒</div>
                      <p className="text-black font-semibold">Connect Wallet to view details</p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-black mb-4">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                </div>

                {isUnlocked && (
                  <Link
                    href="/marketplace"
                    className="mt-6 inline-block px-6 py-2 bg-[#f85522] text-white rounded-full font-semibold hover:bg-[#e64a1a] transition-all duration-300"
                  >
                    Learn More
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {!isUnlocked && (
          <div className="text-center mt-12">
            <button
              onClick={handleConnect}
              className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-[#f85522] transition-all duration-300 transform hover:scale-105"
            >
              Connect Wallet to Unlock
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
