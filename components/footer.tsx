"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full border-2 border-[#f85522] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#f85522]" />
              </div>
              <span className="text-xl font-bold">Pax</span>
            </div>
            <p className="text-gray-400">Powering trusted digital identities.</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#f85522] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-[#f85522] transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/swap" className="hover:text-[#f85522] transition-colors">
                  Swap
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f85522] transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f85522] transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#f85522] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f85522] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>Built for the Web3 Era</p>
          <p className="text-sm mt-2">© 2025 Pax. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
