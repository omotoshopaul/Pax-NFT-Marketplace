"use client"

import { useState } from "react"
import { WalletProvider } from "../providers"
import Navbar from "@/components/navbar"
import MarketplaceHeader from "@/components/marketplace-header"
import NFTMarketGrid from "@/components/nft-market-grid"
import Footer from "@/components/footer"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  return (
    <WalletProvider>
      <main className="w-full overflow-x-hidden bg-white">
        <Navbar />
        <MarketplaceHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <NFTMarketGrid searchQuery={searchQuery} priceRange={priceRange} category={category} sortBy={sortBy} />
        <Footer />
      </main>
    </WalletProvider>
  )
}
