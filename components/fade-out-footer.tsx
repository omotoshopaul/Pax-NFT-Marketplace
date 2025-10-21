"use client"

interface FadeOutFooterProps {
  scrollProgress: number
}

export default function FadeOutFooter({ scrollProgress }: FadeOutFooterProps) {
  const fadeStart = 0.85
  const fadeEnd = 1
  const fadeOpacity = Math.max(0, 1 - (scrollProgress - fadeStart) / (fadeEnd - fadeStart))

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-screen pointer-events-none"
      style={{
        background: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, ${1 - fadeOpacity}))`,
        opacity: fadeOpacity,
      }}
    />
  )
}
