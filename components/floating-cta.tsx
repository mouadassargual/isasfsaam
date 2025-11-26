"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { GOOGLE_FORM_URL } from "@/lib/constants"

export function FloatingCTA() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after scrolling past hero section (around 500px)
      const scrollY = window.scrollY
      setIsVisible(scrollY > 500)
      setShowBackToTop(scrollY > 1500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Back to top button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          variant="outline"
          className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border-border shadow-lg hover:bg-card hover:scale-110 transition-all duration-300"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      {/* Floating Register Button */}
      <Button
        asChild
        size="lg"
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25 rounded-full px-6 h-14 animate-pulse hover:animate-none hover:scale-105 transition-all duration-300 group"
      >
        <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
          <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold">
            {language === "en" ? "Register Free" : "S'inscrire Gratuit"}
          </span>
        </a>
      </Button>

      {/* Urgency badge */}
      <div className="absolute -top-2 -left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full animate-bounce">
        {language === "en" ? "FREE!" : "GRATUIT!"}
      </div>
    </div>
  )
}
