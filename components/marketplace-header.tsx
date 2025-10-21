"use client"

import { Search, ChevronDown } from "lucide-react"

interface MarketplaceHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  priceRange: string
  setPriceRange: (range: string) => void
  category: string
  setCategory: (category: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
}

export default function MarketplaceHeader({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  sortBy,
  setSortBy,
}: MarketplaceHeaderProps) {
  return (
    <section className="w-full bg-white pt-24 pb-12 px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">Marketplace</h1>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f85522] transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Price Range */}
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f85522] transition-colors appearance-none cursor-pointer bg-white"
              >
                <option value="all">All Prices</option>
                <option value="0-500">$0 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000+">$5,000+</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Category */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f85522] transition-colors appearance-none cursor-pointer bg-white"
              >
                <option value="all">All Categories</option>
                <option value="digital-art">Digital Art</option>
                <option value="abstract">Abstract</option>
                <option value="photography">Photography</option>
                <option value="3d">3D Models</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f85522] transition-colors appearance-none cursor-pointer bg-white"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="trending">Trending</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
