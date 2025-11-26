"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { GOOGLE_FORM_URL } from "@/lib/constants"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { t } = useLanguage()

  const navItems = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.topics, href: "#topics" },
    { label: t.nav.schedule, href: "#schedule" },
    { label: t.nav.speakers, href: "#speakers" },
    { label: t.nav.faq, href: "#faq" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, []) // Removed navItems from the dependency array

  // Close on Escape and manage focus when mobile menu opens
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }
    if (mobileMenuOpen) {
      document.addEventListener("keydown", onKey)
      // focus first link in mobile menu
      setTimeout(() => {
        const first = document.querySelector(".mobile-menu nav a, .mobile-menu nav button") as HTMLElement | null
        first?.focus()
      }, 50)
    } else {
      document.removeEventListener("keydown", onKey)
    }
    return () => document.removeEventListener("keydown", onKey)
  }, [mobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass-strong shadow-lg shadow-black/5"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl gradient-animated flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all group-hover:scale-105">
                <span className="text-lg font-bold text-white">IS</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan rounded-md flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">AS</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-lg text-foreground leading-none tracking-tight">ISAS</span>
              <span className="text-[10px] bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent font-semibold tracking-wider">AUTUMN SCHOOL 2025</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all rounded-lg",
                  activeSection === item.href.replace("#", "")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-semibold"
            >
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                {t.nav.register}
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden text-foreground p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={cn(
          "mobile-menu lg:hidden overflow-hidden transition-all duration-300 border-t border-border/50",
          mobileMenuOpen ? "max-h-[600px] bg-background/95 backdrop-blur-xl" : "max-h-0",
        )}
      >
        <nav className="flex flex-col p-4 gap-1" role="navigation" aria-label="Mobile navigation">
          <div className="flex justify-center gap-3 mb-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-3 rounded-lg transition-colors",
                activeSection === item.href.replace("#", "")
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary/50",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 mt-3 h-12 font-semibold">
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
              {t.nav.register}
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}
