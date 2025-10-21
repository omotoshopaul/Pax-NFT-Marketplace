"use client"
import { WalletProvider } from "../providers"
import Navbar from "@/components/navbar"
import SwapInterface from "@/components/swap-interface"
import Footer from "@/components/footer"

export default function SwapPage() {
  return (
    <WalletProvider>
      <main className="w-full overflow-x-hidden bg-white">
        <Navbar />
        <SwapInterface />
        <Footer />
      </main>
    </WalletProvider>
  )
}
