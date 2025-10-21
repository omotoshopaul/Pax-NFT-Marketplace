"use client"

interface Review {
  id: number
  name: string
  rating: number
  text: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Alex Chen",
    rating: 5,
    text: "Pax has completely transformed how I collect digital art. The platform is intuitive and the community is amazing.",
  },
  {
    id: 2,
    name: "Jordan Smith",
    rating: 5,
    text: "Best NFT marketplace I've used. The points system is innovative and rewards loyal collectors like me.",
  },
  {
    id: 3,
    name: "Morgan Lee",
    rating: 5,
    text: "Secure, decentralized, and user-friendly. Pax is leading the future of digital identity and ownership.",
  },
]

export default function Reviews() {
  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Trusted by Collectors</h2>
          <p className="text-gray-600 text-lg">See what our community has to say</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-[#f85522] text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">{review.text}</p>
              <p className="font-semibold text-black">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
