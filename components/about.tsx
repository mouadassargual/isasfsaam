"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Users, Lightbulb, Award, GraduationCap, Cpu, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const duration = 2000
          const increment = value / (duration / 16)

          const timer = setInterval(() => {
            start += increment
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-primary tabular-nums">
      {count}
      {suffix}
    </div>
  )
}

export function About() {
  const { t } = useLanguage()

  const features = [
    { icon: Brain, ...t.about.features.training },
    { icon: Users, ...t.about.features.networking },
    { icon: Lightbulb, ...t.about.features.innovation },
    { icon: Award, ...t.about.features.hackathon },
  ]

  const stats = [
    { value: 200, suffix: "+", label: t.about.stats.participants },
    { value: 5, suffix: "", label: t.about.stats.days },
    { value: 10, suffix: "+", label: t.about.stats.workshops },
    { value: 100, suffix: "%", label: t.about.stats.free },
  ]

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden section-separator">
      {/* Background with tech gradient orbs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-orange-500/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-cyan/10 to-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{t.about.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {t.about.title}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            L'<span className="text-foreground font-semibold">Intelligent Systems Autumn School</span>{" "}
            {t.about.description} <span className="text-primary font-medium">{t.about.department}</span>{" "}
            {t.about.collaboration} <span className="text-primary font-medium">{t.about.iaClub}</span> et{" "}
            <span className="text-primary font-medium">{t.about.dataClub}</span>.
          </p>
        </div>

        {/* Stats with glassmorphism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 md:p-8 rounded-2xl glass-strong hover-lift card-shine group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid with glassmorphism and gradient icons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="glass-strong hover-lift card-shine transition-all duration-500 group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-6 relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-cyan transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Banner with tech gradient */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-primary/15 via-card to-cyan/10 border border-primary/20 relative overflow-hidden glow-gradient">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/10 to-cyan/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <div className="w-20 h-20 rounded-2xl gradient-animated flex items-center justify-center shrink-0">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-3">{t.about.ctaBanner.title}</h3>
              <p className="text-muted-foreground max-w-2xl">{t.about.ctaBanner.description}</p>
            </div>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 group">
              <Link href="#topics">
                {t.about.ctaBanner.cta}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
