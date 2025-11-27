"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Factory, Glasses, Sprout, Brain, Puzzle, ArrowUpRight, Zap, Cpu, Database, Wifi, Cog, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"

// Animated Icon component with hover effects
function AnimatedIcon({ icon: Icon, className, gradient }: { icon: any; className?: string; gradient: string }) {
  return (
    <div className={cn(
      "relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110",
      "bg-gradient-to-br border border-white/10",
      gradient
    )}>
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500",
        `bg-gradient-to-br ${gradient}`
      )} />
      
      {/* Icon with animation */}
      <Icon className={cn(
        "w-8 h-8 text-white relative z-10 transition-transform duration-300",
        "group-hover:scale-110 group-hover:rotate-3"
      )} />
      
      {/* Floating particles */}
      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white/30 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:translate-x-2 transition-all duration-500" />
      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 group-hover:-translate-x-2 transition-all duration-700" />
    </div>
  )
}

// 3D Tilt hook
const useTilt = (ref: React.RefObject<HTMLDivElement | null>, intensity: number = 15) => {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / intensity
      const rotateY = (centerX - x) / intensity
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, intensity])
}

// Topic Card Component
function TopicCard({ topic, index, isLarge, isFeatured }: { 
  topic: any; 
  index: number;
  isLarge?: boolean;
  isFeatured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  useTilt(cardRef)

  return (
    <div
      ref={cardRef}
      className={cn(
        "transition-all duration-300 ease-out h-full",
        isFeatured && "md:col-span-2 lg:col-span-2",
        isLarge && "md:row-span-2",
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Card className={cn(
        "h-full overflow-hidden group cursor-pointer relative",
        "bg-card/80 backdrop-blur-md border-border/50",
        "hover:border-primary/30 transition-all duration-500",
      )}>
        {/* Animated gradient background */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
          `bg-gradient-to-br ${topic.gradient}`
        )} />
        
        {/* Mesh pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Glow effect */}
        <div className={cn(
          "absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 -z-10",
          `bg-gradient-to-br ${topic.gradientFull}`
        )} />

        <CardContent className={cn(
          "p-6 md:p-8 relative h-full flex flex-col",
          isFeatured && "md:flex-row md:items-center md:gap-8",
        )}>
          {/* Icon with animation */}
          <AnimatedIcon 
            icon={topic.icon} 
            gradient={topic.gradientFull}
            className={cn(isFeatured && "md:shrink-0")}
          />

          {/* Content */}
          <div className={cn("relative flex-1", !isFeatured && "mt-6")}>
            {/* Title with arrow */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className={cn(
                "font-bold text-foreground group-hover:text-primary transition-colors",
                isLarge || isFeatured ? "text-2xl" : "text-xl",
              )}>
                {topic.title}
              </h3>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                "bg-secondary/50 group-hover:bg-primary/20 transition-all duration-300",
                "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
              )}>
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </div>
            </div>

            {/* Description */}
            <p className={cn(
              "text-muted-foreground leading-relaxed mb-5",
              isLarge || isFeatured ? "text-base" : "text-sm",
            )}>
              {topic.description}
            </p>

            {/* Tags with hover effects */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {topic.tags.map((tag: string, i: number) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300",
                    "bg-secondary/50 text-muted-foreground border-border",
                    "group-hover:border-primary/30 group-hover:bg-primary/5",
                    "hover:scale-105"
                  )}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Mini icon decorations for featured/large cards */}
            {(isLarge || isFeatured) && (
              <div className="absolute bottom-0 right-0 flex gap-2 opacity-20 group-hover:opacity-40 transition-opacity">
                {topic.relatedIcons?.map((Icon: any, i: number) => (
                  <Icon key={i} className="w-5 h-5 text-primary" />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function Topics() {
  const { t, language } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const topics = [
    {
      icon: Factory,
      ...t.topics.items.industrial,
      gradient: "from-blue-500/10 to-primary/5",
      gradientFull: "from-blue-500 to-blue-600",
      relatedIcons: [Cog, Cpu, Wifi],
    },
    {
      icon: Glasses,
      ...t.topics.items.bim,
      gradient: "from-violet-500/10 to-purple-500/5",
      gradientFull: "from-violet-500 to-purple-600",
      relatedIcons: [Layers, Cpu],
    },
    {
      icon: Sprout,
      ...t.topics.items.iot,
      gradient: "from-emerald-500/10 to-green-500/5",
      gradientFull: "from-emerald-500 to-green-600",
      relatedIcons: [Wifi, Database],
    },
    {
      icon: Brain,
      ...t.topics.items.ai,
      gradient: "from-primary/10 to-orange-500/5",
      gradientFull: "from-primary to-orange-500",
      relatedIcons: [Cpu, Database],
    },
    {
      icon: Puzzle,
      ...t.topics.items.hackathon,
      gradient: "from-rose-500/10 to-pink-500/5",
      gradientFull: "from-rose-500 to-pink-600",
      featured: true,
      relatedIcons: [Cog, Wifi, Database],
    },
  ]

  return (
    <section id="topics" className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-secondary/10" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-orange-500/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan/10 to-blue-500/5 rounded-full blur-3xl opacity-50" />
      
      {/* Tech grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating tech icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Cpu, Database, Wifi, Cog, Layers].map((Icon, i) => (
          <div
            key={i}
            className="absolute text-primary/10 animate-float"
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + i}s`,
            }}
          >
            <Icon className="w-8 h-8" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-cyan/10 border border-primary/20 mb-6 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-primary text-sm font-medium">{t.topics.badge}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {t.topics.title}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.topics.description}</p>
        </div>

        {/* Interactive indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {language === "en" ? "Hover to explore" : "Survolez pour explorer"}
          </div>
        </div>

        {/* Topics Grid - Bento style with improved layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.title}
              topic={topic}
              index={index}
              isLarge={index === 0}
              isFeatured={index === 4}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur-md border border-border/50">
            <div className="flex gap-3">
              {[Factory, Brain, Sprout, Glasses, Puzzle].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              {language === "en" 
                ? "All topics converge towards building integrated smart solutions from sensor to dashboard"
                : "Tous les sujets convergent vers la construction de solutions intelligentes intégrées du capteur au dashboard"
              }
            </p>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
