"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  walletAddress: string | null
  connectWallet: () => void
  disconnectWallet: () => void
  userPoints: number
  userNFTs: number
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [userPoints, setUserPoints] = useState(0)
  const [userNFTs, setUserNFTs] = useState(0)

  const connectWallet = useCallback(() => {
    // Simulate wallet connection with a delay for better UX
    const newAddress = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase()
    setIsConnected(true)
    setWalletAddress(newAddress)
    // Simulate user data
    setUserPoints(Math.floor(Math.random() * 5000) + 1000)
    setUserNFTs(Math.floor(Math.random() * 50) + 5)
  }, [])

  const disconnectWallet = useCallback(() => {
    setIsConnected(false)
    setWalletAddress(null)
    setUserPoints(0)
    setUserNFTs(0)
  }, [])

  return (
    <WalletContext.Provider
      value={{ isConnected, walletAddress, connectWallet, disconnectWallet, userPoints, userNFTs }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within WalletProvider")
  }
  return context
}
