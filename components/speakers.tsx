"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, ArrowRight, Linkedin, Twitter, Globe, Calendar, MapPin, Mic2, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const speakers = [
  {
    id: "ismail-saddik",
    name: "Ismail Saddik",
    roleEn: "Building a Project from Scratch",
    roleFr: "Construire un projet de zéro",
    organization: "Keynote Speaker",
    bioEn: "Expert in project management and entrepreneurship, sharing insights on building successful projects from the ground up.",
    bioFr: "Expert en gestion de projet et entrepreneuriat, partageant ses connaissances sur la construction de projets réussis.",
    expertise: ["Project Management", "Entrepreneurship", "Strategy"],
    image: "/speakrs/ismail.png",
    gradient: "from-primary to-orange-500",
    day: 1,
    time: "10:00 - 11:00",
    confirmed: true,
  },
  {
    id: "mohamed-abaakil",
    name: "Mohamed El Habib Abaakil",
    roleEn: "Industrial Smart Solutions",
    roleFr: "Solutions Intelligentes Industrielles",
    organization: "PPRIME Institute",
    bioEn: "Researcher at PPRIME Institute specializing in industrial IoT and smart manufacturing systems.",
    bioFr: "Chercheur à l'Institut PPRIME spécialisé dans l'IoT industriel et les systèmes de fabrication intelligents.",
    expertise: ["IoT", "Industry 4.0", "Smart Systems"],
    image: "/speakrs/Mohamed-El-Habib-Abaakil.jpeg",
    gradient: "from-cyan to-blue-500",
    day: 2,
    time: "10:00 - 11:00",
    confirmed: true,
  },
  {
    id: "zakaria-elkhadiri",
    name: "Zakaria El Khadiri",
    roleEn: "Engineering ADAS: Vehicle Autonomy",
    roleFr: "Ingénierie ADAS: Autonomie Véhicule",
    organization: "Automotive Expert",
    bioEn: "Automotive engineer with expertise in Advanced Driver Assistance Systems and autonomous vehicle technologies.",
    bioFr: "Ingénieur automobile expert en systèmes ADAS et technologies de véhicules autonomes.",
    expertise: ["ADAS", "Autonomous Vehicles", "AI"],
    image: null,
    initials: "ZK",
    gradient: "from-violet-500 to-purple-600",
    day: 3,
    time: "10:00 - 11:00",
    confirmed: true,
  },
  {
    id: "ismail-khoubbaz",
    name: "Ismail Khoubbaz",
    roleEn: "BIM & Virtual Reality",
    roleFr: "BIM & Réalité Virtuelle",
    organization: "BIM-R",
    bioEn: "Pioneer in Building Information Modeling and VR applications for construction and architecture.",
    bioFr: "Pionnier du BIM et des applications VR pour la construction et l'architecture.",
    expertise: ["BIM", "VR/AR", "Digital Twins"],
    image: "/speakrs/Ismail-Khoubbaz.jpeg",
    gradient: "from-emerald-500 to-teal-600",
    day: 3,
    time: "11:15 - 12:45",
    confirmed: true,
  },
  {
    id: "amine-saddik",
    name: "Amine Saddik",
    roleEn: "Robotic Precision Agriculture",
    roleFr: "Agriculture de Précision Robotisée",
    organization: "Robotics Expert",
    bioEn: "Robotics specialist focused on agricultural automation, drones, and precision farming technologies.",
    bioFr: "Spécialiste en robotique agricole, drones et technologies d'agriculture de précision.",
    expertise: ["Robotics", "Drones", "Agriculture"],
    image: "/speakrs/amine.png",
    gradient: "from-amber-500 to-orange-600",
    day: 4,
    time: "10:00 - 11:00",
    confirmed: true,
  },
  {
    id: "nabil-ayoub",
    name: "Nabil Ayoub",
    roleEn: "Open-Source Data Pipeline",
    roleFr: "Pipeline de Données Open-Source",
    organization: "AgriData",
    bioEn: "Data engineer building modern open-source data pipelines for agricultural analytics.",
    bioFr: "Ingénieur data construisant des pipelines de données open-source pour l'analytique agricole.",
    expertise: ["Data Engineering", "Python", "Metabase"],
    image: "/speakrs/nabil.png",
    gradient: "from-blue-500 to-indigo-600",
    day: 4,
    time: "14:00 - 17:00",
    confirmed: true,
  },
  {
    id: "anas-bennis",
    name: "Anas Bennis",
    roleEn: "Data-Driven Agriculture",
    roleFr: "Agriculture Data-Driven",
    organization: "ENA Meknès",
    bioEn: "Professor at ENA Meknès specializing in data science applications for agricultural optimization.",
    bioFr: "Professeur à l'ENA Meknès spécialisé dans les applications de data science pour l'agriculture.",
    expertise: ["Data Science", "Agriculture", "AI"],
    image: "/speakrs/bennis.jpeg",
    gradient: "from-green-500 to-emerald-600",
    day: 5,
    time: "10:00 - 11:00",
    confirmed: true,
  },
  {
    id: "zakaria-oulad",
    name: "Zakaria Oulad",
    roleEn: "Systems Integration Hackathon",
    roleFr: "Hackathon Intégration Systèmes",
    organization: "MOZA Partners",
    bioEn: "Tech entrepreneur leading the hackathon on systems integration from sensor to dashboard.",
    bioFr: "Entrepreneur tech animant le hackathon sur l'intégration des systèmes du capteur au dashboard.",
    expertise: ["Hackathon", "IoT", "Integration"],
    image: "/speakrs/zakaria-oulad.png",
    gradient: "from-rose-500 to-pink-600",
    day: 5,
    time: "11:15 - 17:00",
    confirmed: true,
  },
]

// 3D Card tilt effect
const useTilt = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 15
      const rotateY = (centerX - x) / 15
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
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
  }, [ref])
}

function SpeakerCard({ speaker, index, isExpanded, onToggle }: { 
  speaker: typeof speakers[0]; 
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  useTilt(cardRef)

  const dayNames = language === "en" 
    ? ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    : ["", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]

  return (
    <div
      ref={cardRef}
      className="transition-all duration-300 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Card
        className={cn(
          "overflow-hidden group cursor-pointer relative h-full",
          "bg-card/60 backdrop-blur-xl border-border/30",
          "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500",
          isExpanded && "ring-2 ring-primary/50"
        )}
        onClick={onToggle}
      >
        <CardContent className="p-6">
          {/* Header with photo and day badge */}
          <div className="flex items-start gap-5 mb-5">
            {/* Photo */}
            <div className={cn(
              "relative shrink-0 w-20 h-20 rounded-2xl p-0.5 shadow-lg",
              `bg-gradient-to-br ${speaker.gradient}`
            )}>
              <div className="w-full h-full rounded-2xl overflow-hidden bg-background flex items-center justify-center">
                {speaker.image ? (
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-xl font-black text-primary">
                    {speaker.initials}
                  </span>
                )}
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
                <span className="text-[9px] text-white">✓</span>
              </div>
            </div>

            {/* Name and role */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {speaker.name}
              </h3>
              <p className={cn(
                "text-sm font-medium mb-1.5",
                `bg-gradient-to-r ${speaker.gradient} bg-clip-text text-transparent`
              )}>
                {language === "en" ? speaker.roleEn : speaker.roleFr}
              </p>
              <p className="text-sm text-muted-foreground">{speaker.organization}</p>
            </div>
          </div>

          {/* Day and Time */}
          <div className="flex items-center gap-3 mb-5">
            <Badge className={cn(
              "text-xs border-0 text-white px-3 py-1",
              `bg-gradient-to-r ${speaker.gradient}`
            )}>
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {language === "en" ? `Day ${speaker.day}` : `Jour ${speaker.day}`}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {speaker.time}
            </span>
          </div>

          {/* Expertise tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {speaker.expertise.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-secondary/30 text-muted-foreground border-border/50 text-xs px-2.5 py-1 hover:border-primary/30 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Expanded bio */}
          <div className={cn(
            "overflow-hidden transition-all duration-500",
            isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="pt-3 border-t border-border/30">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {language === "en" ? speaker.bioEn : speaker.bioFr}
              </p>
            </div>
          </div>

          {/* Expand hint line */}
          <div className="flex justify-center mt-3">
            <div className={cn(
              "h-1 rounded-full transition-all duration-300",
              isExpanded ? "w-12 bg-primary" : "w-8 bg-border/50 group-hover:w-12 group-hover:bg-primary/50"
            )} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function Speakers() {
  const { t, language } = useLanguage()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const filteredSpeakers = activeFilter 
    ? speakers.filter(s => s.day === activeFilter)
    : speakers

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  return (
    <section id="speakers" className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-secondary/20" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-orange-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gradient-to-br from-cyan/10 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-2 h-2 rounded-full bg-primary/20 animate-float",
              i % 2 === 0 ? "animate-float" : "animate-float-delayed"
            )}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-cyan/10 border border-primary/20 mb-6 backdrop-blur-sm">
            <Mic2 className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{t.speakers.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {t.speakers.title}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.speakers.description}</p>
        </div>

        {/* Day filter */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          <Button
            variant={activeFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(null)}
            className="rounded-full"
          >
            {language === "en" ? "All Speakers" : "Tous les Speakers"}
          </Button>
          {[1, 2, 3, 4, 5].map(day => (
            <Button
              key={day}
              variant={activeFilter === day ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(activeFilter === day ? null : day)}
              className={cn(
                "rounded-full",
                activeFilter === day && "bg-gradient-to-r from-primary to-cyan border-0"
              )}
            >
              {language === "en" ? `Day ${day}` : `Jour ${day}`}
            </Button>
          ))}
        </div>

        {/* Speakers Grid with scroll for mobile */}
        <div className="relative">
          {/* Navigation arrows for mobile */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors hidden sm:hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors hidden sm:hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div 
            ref={scrollRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredSpeakers.map((speaker, index) => (
              <SpeakerCard
                key={speaker.id}
                speaker={speaker}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "8", label: language === "en" ? "Expert Speakers" : "Speakers Experts", icon: "🎤" },
            { value: "5", label: language === "en" ? "Days of Learning" : "Jours d'Apprentissage", icon: "📅" },
            { value: "15+", label: language === "en" ? "Hours of Content" : "Heures de Contenu", icon: "⏱️" },
            { value: "100%", label: language === "en" ? "Free Access" : "Accès Gratuit", icon: "🎁" },
          ].map((stat, i) => (
            <div 
              key={i}
              className="p-4 rounded-2xl bg-card/50 backdrop-blur-md border border-border/50 text-center group hover:border-primary/30 transition-all hover:scale-105"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-black text-foreground group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* More speakers coming soon */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 via-card/50 to-cyan/5 border-dashed border-primary/30 max-w-2xl mx-auto backdrop-blur-md overflow-hidden relative">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-cyan/5 animate-pulse" />
          
          <CardContent className="p-6 md:p-8 text-center relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t.speakers.comingSoon}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t.speakers.comingSoonDesc}</p>
            <Button asChild className="bg-gradient-to-r from-primary to-cyan hover:opacity-90 border-0 text-white">
              <Link href="#registration">
                {language === "en" ? "Get Notified" : "Être notifié"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}
