"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowDownUp, CheckCircle } from "lucide-react"

interface SwapState {
  fromToken: string
  toToken: string
  fromAmount: string
  toAmount: string
  isSwapping: boolean
  isSuccess: boolean
}

const exchangeRates: Record<string, Record<string, number>> = {
  PAX: { SOL: 0.5, BTC: 0.00001, ETH: 0.0003, USD: 2.5 },
  SOL: { PAX: 2, BTC: 0.00002, ETH: 0.0006, USD: 5 },
  BTC: { PAX: 100000, SOL: 50000, ETH: 30, USD: 250000 },
  ETH: { PAX: 3333, SOL: 1667, BTC: 0.033, USD: 8333 },
  USD: { PAX: 0.4, SOL: 0.2, BTC: 0.000004, ETH: 0.00012 },
}

export default function SwapInterface() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [swap, setSwap] = useState<SwapState>({
    fromToken: "PAX",
    toToken: "SOL",
    fromAmount: "1",
    toAmount: "0.5",
    isSwapping: false,
    isSuccess: false,
  })

  // Animated background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.01)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.fillStyle = `rgba(248, 85, 34, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value
    setSwap((prev) => ({
      ...prev,
      fromAmount: amount,
      toAmount: amount ? (Number.parseFloat(amount) * exchangeRates[prev.fromToken][prev.toToken]).toFixed(6) : "",
    }))
  }

  const handleSwapTokens = () => {
    setSwap((prev) => ({
      ...prev,
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount,
    }))
  }

  const handleSwap = async () => {
    setSwap((prev) => ({ ...prev, isSwapping: true }))
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSwap((prev) => ({ ...prev, isSwapping: false, isSuccess: true }))
    setTimeout(() => {
      setSwap((prev) => ({ ...prev, isSuccess: false }))
    }, 3000)
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24 pb-8 md:pb-12 px-3 md:px-4">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white/90" />

      <div className="relative z-10 w-full max-w-sm md:max-w-md">
        <div className="text-center mb-8 md:mb-12 px-2">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-2 md:mb-4">Swap Tokens</h1>
          <p className="text-sm md:text-base text-gray-600">Convert $PAX to other tokens instantly</p>
        </div>

        <div className="backdrop-blur-xl bg-white/80 border-2 border-white/50 rounded-2xl p-5 md:p-8 shadow-2xl hover:border-[#f85522]/30 transition-all duration-300">
          {/* From Token */}
          <div className="mb-5 md:mb-6">
            <label className="block text-xs md:text-sm font-semibold text-black mb-2 md:mb-3">From</label>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <select
                value={swap.fromToken}
                onChange={(e) =>
                  setSwap((prev) => ({
                    ...prev,
                    fromToken: e.target.value,
                    toAmount: prev.fromAmount
                      ? (Number.parseFloat(prev.fromAmount) * exchangeRates[e.target.value][prev.toToken]).toFixed(6)
                      : "",
                  }))
                }
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f85522] transition-colors bg-white text-sm md:text-base"
              >
                {Object.keys(exchangeRates).map((token) => (
                  <option key={token} value={token}>
                    ${token}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={swap.fromAmount}
                onChange={handleFromAmountChange}
                placeholder="0.00"
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f85522] transition-colors text-sm md:text-base"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center mb-5 md:mb-6">
            <button
              onClick={handleSwapTokens}
              className="p-2 md:p-3 bg-[#f85522] text-white rounded-full hover:bg-[#e64a1a] transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <ArrowDownUp className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* To Token */}
          <div className="mb-5 md:mb-6">
            <label className="block text-xs md:text-sm font-semibold text-black mb-2 md:mb-3">To</label>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <select
                value={swap.toToken}
                onChange={(e) =>
                  setSwap((prev) => ({
                    ...prev,
                    toToken: e.target.value,
                    toAmount: prev.fromAmount
                      ? (Number.parseFloat(prev.fromAmount) * exchangeRates[prev.fromToken][e.target.value]).toFixed(6)
                      : "",
                  }))
                }
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f85522] transition-colors bg-white text-sm md:text-base"
              >
                {Object.keys(exchangeRates).map((token) => (
                  <option key={token} value={token}>
                    ${token}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={swap.toAmount}
                readOnly
                placeholder="0.00"
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-600 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Exchange Rate */}
          <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-5 md:mb-6">
            <div className="flex justify-between items-center mb-2 gap-2">
              <span className="text-xs md:text-sm text-gray-600">Exchange Rate</span>
              <span className="font-semibold text-black text-xs md:text-sm">
                1 {swap.fromToken} = {exchangeRates[swap.fromToken][swap.toToken]} {swap.toToken}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-xs md:text-sm text-gray-600">Transaction Fee</span>
              <span className="font-semibold text-black text-xs md:text-sm">0.5%</span>
            </div>
          </div>

          <button
            onClick={handleSwap}
            disabled={swap.isSwapping || !swap.fromAmount}
            className={`w-full py-3 md:py-4 bg-black text-white rounded-lg font-semibold text-sm md:text-base hover:bg-[#f85522] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden ${
              swap.isSuccess ? "animate-pulse-glow" : ""
            }`}
          >
            {swap.isSwapping ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : swap.isSuccess ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                Swap Successful!
              </div>
            ) : (
              "Swap Now"
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 md:mt-8 text-gray-600 text-xs md:text-sm px-2">
          <p>Powered by Pax Protocol</p>
        </div>
      </div>
    </section>
  )
}
