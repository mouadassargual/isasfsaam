"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ArrowRight, ChevronDown, Sparkles, Users, Award, BookOpen, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/i18n/context"
import { GOOGLE_FORM_URL } from "@/lib/constants"

function CountdownTimer() {
  const { t } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const targetDate = new Date("2025-12-08T09:00:00").getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const timeItems = [
    { value: timeLeft.days, label: t.hero.days },
    { value: timeLeft.hours, label: t.hero.hours },
    { value: timeLeft.minutes, label: t.hero.min },
    { value: timeLeft.seconds, label: t.hero.sec },
  ]

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
      {timeItems.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-background/90 dark:bg-card/90 border border-border backdrop-blur-md flex items-center justify-center shadow-lg">
              <span className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground tabular-nums">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground mt-2 font-medium tracking-wide uppercase">
              {item.label}
            </span>
          </div>
          {index < 3 && (
            <div className="flex flex-col gap-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-100" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/fsaa-hero.jpg')" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background dark:from-background/90 dark:via-background/70 dark:to-background" />
        {/* Additional overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </div>

      {/* Animated gradient orbs - Orange and Cyan */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] max-w-[400px] h-[40vw] max-h-[400px] bg-gradient-to-br from-primary/30 to-orange-500/20 rounded-full blur-3xl animate-pulse opacity-70" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] max-w-[300px] h-[30vw] max-h-[300px] bg-gradient-to-br from-cyan/30 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000 opacity-70" />
      <div className="absolute top-1/2 right-1/3 w-[20vw] max-w-[200px] h-[20vw] max-h-[200px] bg-cyan/10 rounded-full blur-3xl animate-pulse delay-500 opacity-50" />

      <div id="main-content" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 pt-28 md:pt-32">
        {/* FREE Badge - More visible */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            {t.hero.badge}
          </span>
        </div>

        {/* Main title with tech gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <span className="bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            ISAS
          </span>
          <span className="bg-gradient-to-r from-foreground to-cyan/80 bg-clip-text text-transparent">'25</span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-foreground/90 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 tracking-wide">
          INTELLIGENT SYSTEMS AUTUMN SCHOOL
        </h2>

        {/* Theme tagline with gradient accents */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-2">
            From Sensor to Dashboard
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Building Integrated Solutions for <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent font-semibold">Smart Cities</span> & <span className="bg-gradient-to-r from-cyan to-blue-500 bg-clip-text text-transparent font-semibold">Industry 4.0</span>
          </p>
        </div>

        {/* Date & Location with glassmorphism */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-strong hover-lift">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm">{t.hero.date}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-strong hover-lift">
            <MapPin className="w-4 h-4 text-cyan" />
            <span className="font-semibold text-sm">{t.hero.location}</span>
          </div>
        </div>

        {/* CTA Buttons with gradient glow */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <Button
            asChild
            size="lg"
            className="gradient-animated text-white hover:opacity-90 px-8 h-12 sm:h-14 text-sm sm:text-base font-bold glow-gradient transition-all group w-full sm:w-auto"
          >
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
              <Sparkles className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              {t.hero.cta}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-cyan/30 text-foreground hover:bg-cyan/10 hover:border-cyan/50 px-8 h-12 sm:h-14 text-sm sm:text-base glass group w-full sm:w-auto"
          >
            <Link href="#schedule">
              {t.hero.ctaSecondary}
              <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Countdown */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 font-medium uppercase tracking-widest">
            {t.hero.countdownLabel}
          </p>
          <CountdownTimer />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[600ms]">
          {[
            { value: "5", label: t.hero.stats.days, icon: BookOpen },
            { value: "5+", label: t.hero.stats.topics, icon: Zap },
            { value: "10+", label: t.hero.stats.experts, icon: Users },
            { value: "1", label: t.hero.stats.hackathon, icon: Award },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-background/70 dark:bg-card/70 border border-border/50 backdrop-blur-md hover:bg-background/90 dark:hover:bg-card/90 hover:border-primary/30 transition-all group"
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground/50" />
        </div>
      </div>
    </section>
  )
}
