"use client"
import NFTCard from "./nft-card"

const nfts = [
  {
    id: 1,
    name: "Ethereal Dreams",
    price: "$1,250",
    image: "/abstract-digital-art-neon.jpg",
  },
  {
    id: 2,
    name: "Quantum Flux",
    price: "$980",
    image: "/digital-art-quantum-waves.jpg",
  },
  {
    id: 3,
    name: "Cosmic Bloom",
    price: "$2,100",
    image: "/abstract-cosmic-art.jpg",
  },
  {
    id: 4,
    name: "Digital Horizon",
    price: "$750",
    image: "/digital-landscape.png",
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

export default function NFTGallery() {
  return (
    <section id="explore" className="w-full py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Featured Masterpieces</h2>
          <p className="text-gray-600 text-lg">Curated digital art from emerging and established creators</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} {...nft} />
          ))}
        </div>
      </div>
    </section>
  )
}
