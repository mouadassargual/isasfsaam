"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  CalendarDays, Clock, MapPin, ChevronRight, Coffee, Utensils, User, Filter, X,
  Mic2, Wrench, Users2, Sparkles, Radio, LayoutGrid, List, Play
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Speaker data for linking schedule to speakers section
const speakerImages: Record<string, { image: string | null; initials?: string }> = {
  "Ismail Saddik": { image: "/speakrs/ismail.png" },
  "Mohamed El Habib Abaakil": { image: "/speakrs/Mohamed-El-Habib-Abaakil.jpeg" },
  "Zakaria El Khadiri": { image: null, initials: "ZK" },
  "Ismail Khoubbaz": { image: "/speakrs/Ismail-Khoubbaz.jpeg" },
  "Amine Saddik": { image: "/speakrs/amine.png" },
  "Nabil Ayoub": { image: "/speakrs/nabil.png" },
  "Anas Bennis": { image: "/speakrs/bennis.jpeg" },
  "Zakaria Oulad": { image: "/speakrs/zakaria-oulad.png" },
}

const getSpeakerInfo = (speakerName: string) => {
  const cleanName = speakerName.split(" (")[0].trim()
  return speakerImages[cleanName] || null
}

const scheduleData = [
  {
    day: 1,
    date: "8 Dec",
    dateEn: "Dec 8",
    dayNameFr: "Lundi",
    dayNameEn: "Monday",
    theme: "Opening & Project Building",
    themeFr: "Ouverture & Construction de Projet",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    events: [
      { time: "08:30 - 09:30", titleEn: "Registration", titleFr: "Inscription", type: "ceremony", location: "Hall" },
      {
        time: "09:30 - 10:00",
        titleEn: "Opening Speech",
        titleFr: "Discours d'ouverture",
        type: "ceremony",
        location: "Salle des conférences",
      },
      {
        time: "10:00 - 11:00",
        titleEn: "Building a project from scratch",
        titleFr: "Construire un projet de zéro",
        speaker: "Ismail Saddik",
        type: "keynote",
        location: "Salle des conférences",
      },
      {
        time: "11:00 - 11:15",
        titleEn: "Break & Speed Networking",
        titleFr: "Pause & Speed Networking",
        type: "networking",
        location: "Hall",
      },
      {
        time: "11:15 - 12:45",
        titleEn: "Smart systems needs by Local government (Agadir city) & Private sector (Haliopole)",
        titleFr: "Besoins en systèmes intelligents par le gouvernement local (Agadir) & secteur privé (Haliopole)",
        type: "conference",
        location: "Salle des conférences",
      },
      { time: "12:45 - 14:00", titleEn: "Lunch", titleFr: "Déjeuner", type: "lunch", location: "Cafeteria" },
      {
        time: "14:00 - 17:00",
        titleEn: "From business needs to technical solutions",
        titleFr: "Des besoins métiers aux solutions techniques",
        type: "workshop",
        location: "Salle Polyvalente",
      },
    ],
  },
  {
    day: 2,
    date: "9 Dec",
    dateEn: "Dec 9",
    dayNameFr: "Mardi",
    dayNameEn: "Tuesday",
    theme: "Industrial Smart Solutions",
    themeFr: "Solutions Industrielles Intelligentes",
    color: "bg-violet-500",
    gradient: "from-violet-500 to-purple-600",
    events: [
      {
        time: "10:00 - 11:00",
        titleEn: "Industrial Smart Solutions - Keynote",
        titleFr: "Solutions Industrielles Intelligentes - Keynote",
        speaker: "Mohamed El Habib Abaakil (PPRIME)",
        type: "keynote",
        location: "Salle des conférences",
      },
      {
        time: "11:00 - 11:15",
        titleEn: "Break & Speed Networking",
        titleFr: "Pause & Speed Networking",
        type: "networking",
        location: "Hall",
      },
      {
        time: "11:15 - 12:45",
        titleEn: "Industrial smart solutions",
        titleFr: "Solutions industrielles intelligentes",
        type: "conference",
        location: "Salle des conférences",
      },
      { time: "12:45 - 14:00", titleEn: "Lunch", titleFr: "Déjeuner", type: "lunch", location: "Cafeteria" },
      {
        time: "14:00 - 17:00",
        titleEn: "Co-creating smart solutions - Workshop",
        titleFr: "Co-création de solutions intelligentes - Workshop",
        speaker: "Mohamed El Habib Abaakil",
        type: "workshop",
        location: "Salle Polyvalente",
      },
    ],
  },
  {
    day: 3,
    date: "10 Dec",
    dateEn: "Dec 10",
    dayNameFr: "Mercredi",
    dayNameEn: "Wednesday",
    theme: "ADAS & BIM/VR",
    themeFr: "ADAS & BIM/VR",
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-teal-500",
    events: [
      {
        time: "10:00 - 11:00",
        titleEn: "Engineering ADAS: A Gateway to Vehicle Autonomy",
        titleFr: "Ingénierie ADAS: Passerelle vers l'autonomie véhiculaire",
        speaker: "Zakaria El Khadiri",
        type: "keynote",
        location: "Salle des conférences",
      },
      {
        time: "11:00 - 11:15",
        titleEn: "Break & Speed Networking",
        titleFr: "Pause & Speed Networking",
        type: "networking",
        location: "Hall",
      },
      {
        time: "11:15 - 12:45",
        titleEn: "Building Information Modeling (BIM) & Virtual Reality",
        titleFr: "Modélisation BIM & Réalité Virtuelle",
        speaker: "Ismail Khoubbaz (BIM-R)",
        type: "keynote",
        location: "Salle des conférences",
      },
      { time: "12:45 - 14:00", titleEn: "Lunch", titleFr: "Déjeuner", type: "lunch", location: "Cafeteria" },
      {
        time: "14:00 - 17:00",
        titleEn: "BIM design and VR exploration - Hands-on Session",
        titleFr: "Conception BIM et exploration VR - Session Pratique",
        speaker: "Ismail Khoubbaz",
        type: "workshop",
        location: "Salle Polyvalente",
      },
    ],
  },
  {
    day: 4,
    date: "11 Dec",
    dateEn: "Dec 11",
    dayNameFr: "Jeudi",
    dayNameEn: "Thursday",
    theme: "Agriculture & Data Pipeline",
    themeFr: "Agriculture & Pipeline de Données",
    color: "bg-primary",
    gradient: "from-primary to-orange-500",
    events: [
      {
        time: "10:00 - 11:00",
        titleEn: "Robotic Precision Agriculture: Sensors, Drones, and Innovations",
        titleFr: "Agriculture de précision robotique: Capteurs, Drones et Innovations",
        speaker: "Amine Saddik",
        type: "keynote",
        location: "Salle des conférences",
      },
      {
        time: "11:00 - 11:15",
        titleEn: "Break & Speed Networking",
        titleFr: "Pause & Speed Networking",
        type: "networking",
        location: "Hall",
      },
      {
        time: "11:15 - 12:45",
        titleEn: "TBA",
        titleFr: "À confirmer",
        type: "tba",
        location: "Salle des conférences",
      },
      { time: "12:45 - 14:00", titleEn: "Lunch", titleFr: "Déjeuner", type: "lunch", location: "Cafeteria" },
      {
        time: "14:00 - 17:00",
        titleEn: "Building a modern open-source data pipeline",
        titleFr: "Construire un pipeline de données open-source moderne",
        speaker: "Nabil Ayoub (AgriData)",
        type: "workshop",
        location: "Salle Polyvalente",
      },
    ],
  },
  {
    day: 5,
    date: "12 Dec",
    dateEn: "Dec 12",
    dayNameFr: "Vendredi",
    dayNameEn: "Friday",
    theme: "Data Agriculture & Hackathon",
    themeFr: "Agriculture Data & Hackathon",
    color: "bg-rose-500",
    gradient: "from-rose-500 to-pink-600",
    events: [
      {
        time: "10:00 - 11:00",
        titleEn: "Data-Driven Agriculture, real use cases!",
        titleFr: "Agriculture Data-Driven, cas réels!",
        speaker: "Anas Bennis (ENA Meknès)",
        type: "keynote",
        location: "Salle des conférences",
      },
      {
        time: "11:00 - 11:15",
        titleEn: "Break & Speed Networking",
        titleFr: "Pause & Speed Networking",
        type: "networking",
        location: "Hall",
      },
      {
        time: "11:15 - 12:45",
        titleEn: "Systems Integration Hackathon: From Sensor to Dashboard",
        titleFr: "Hackathon Intégration Systèmes: Du Capteur au Dashboard",
        speaker: "Zakaria Oulad (MOZA Partners)",
        type: "hackathon",
        location: "Salle des conférences + Salle Polyvalente",
      },
      { time: "12:45 - 14:00", titleEn: "Lunch", titleFr: "Déjeuner", type: "lunch", location: "Cafeteria" },
      {
        time: "14:00 - 17:00",
        titleEn: "Systems Integration Hackathon (continued)",
        titleFr: "Hackathon Intégration Systèmes (suite)",
        speaker: "Zakaria Oulad",
        type: "hackathon",
        location: "Salle des conférences + Salle Polyvalente",
      },
      {
        time: "17:00 - 17:30",
        titleEn: "Closing Speech & Awards",
        titleFr: "Discours de clôture & Remise des prix",
        type: "ceremony",
        location: "Salle des conférences",
      },
    ],
  },
]

const typeConfig: Record<string, { bg: string; text: string; icon: React.ReactNode; gradient: string }> = {
  ceremony: { bg: "bg-primary/10", text: "text-primary", icon: <Sparkles className="w-3.5 h-3.5" />, gradient: "from-primary to-orange-500" },
  keynote: { bg: "bg-cyan-500/10", text: "text-cyan-400", icon: <Mic2 className="w-3.5 h-3.5" />, gradient: "from-cyan-400 to-blue-500" },
  conference: { bg: "bg-blue-500/10", text: "text-blue-400", icon: <Users2 className="w-3.5 h-3.5" />, gradient: "from-blue-400 to-indigo-500" },
  workshop: { bg: "bg-emerald-500/10", text: "text-emerald-400", icon: <Wrench className="w-3.5 h-3.5" />, gradient: "from-emerald-400 to-teal-500" },
  networking: { bg: "bg-violet-500/10", text: "text-violet-400", icon: <Coffee className="w-3.5 h-3.5" />, gradient: "from-violet-400 to-purple-500" },
  lunch: { bg: "bg-amber-500/10", text: "text-amber-400", icon: <Utensils className="w-3.5 h-3.5" />, gradient: "from-amber-400 to-orange-500" },
  hackathon: { bg: "bg-rose-500/10", text: "text-rose-400", icon: <Play className="w-3.5 h-3.5" />, gradient: "from-rose-400 to-pink-500" },
  tba: { bg: "bg-muted", text: "text-muted-foreground", icon: <Clock className="w-3.5 h-3.5" />, gradient: "from-gray-400 to-gray-500" },
}

// Check if an event is currently live (during the actual event dates)
const isEventLive = (dayIndex: number, eventTime: string): boolean => {
  const now = new Date()
  const eventDate = new Date(2025, 11, 8 + dayIndex) // December 8-12, 2025
  
  // Check if it's the right day
  if (now.toDateString() !== eventDate.toDateString()) return false
  
  // Parse time range
  const [startTime, endTime] = eventTime.split(" - ")
  const [startHour, startMin] = startTime.split(":").map(Number)
  const [endHour, endMin] = endTime.split(":").map(Number)
  
  const currentHour = now.getHours()
  const currentMin = now.getMinutes()
  const currentTotalMin = currentHour * 60 + currentMin
  const startTotalMin = startHour * 60 + startMin
  const endTotalMin = endHour * 60 + endMin
  
  return currentTotalMin >= startTotalMin && currentTotalMin < endTotalMin
}

// 3D Tilt effect hook
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
      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20
      
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
  }, [ref])
}

// Tiltable Card Component
function TiltCard({ children, className, isLive }: { children: React.ReactNode; className?: string; isLive?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  useTilt(cardRef)

  return (
    <div
      ref={cardRef}
      className={cn(
        "transition-all duration-200 ease-out",
        isLive && "ring-2 ring-red-500 ring-offset-2 ring-offset-background",
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

export function Schedule() {
  const [activeDay, setActiveDay] = useState(0)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed')
  const [mounted, setMounted] = useState(false)
  const { t, language } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSpeaker = (speakerName: string) => {
    const speakersSection = document.getElementById('speakers')
    if (speakersSection) {
      speakersSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const eventTypes = ['keynote', 'workshop', 'conference', 'hackathon']

  const filteredEvents = activeFilter 
    ? scheduleData[activeDay].events.filter(e => e.type === activeFilter)
    : scheduleData[activeDay].events

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      ceremony: t.schedule.types.ceremony,
      keynote: t.schedule.types.keynote || "Keynote",
      conference: t.schedule.types.conference,
      workshop: t.schedule.types.workshop,
      networking: t.schedule.types.networking,
      lunch: t.schedule.types.lunch,
      hackathon: t.schedule.types.hackathon,
      tba: t.schedule.types.tba,
    }
    return labels[type] || type
  }

  const currentDayGradient = scheduleData[activeDay].gradient

  return (
    <section id="schedule" className="py-24 md:py-32 relative overflow-hidden">
      {/* Dynamic Background based on active day */}
      <div 
        className={cn(
          "absolute inset-0 opacity-[0.03] transition-all duration-1000",
          `bg-gradient-to-br ${currentDayGradient}`
        )} 
      />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-cyan/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header with animated gradient */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-cyan/10 border border-primary/20 mb-6 backdrop-blur-sm">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{t.schedule.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {t.schedule.title}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.schedule.description}</p>
        </div>

        {/* Day tabs with gradient indicators */}
        <div className="flex justify-center gap-2 md:gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {scheduleData.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(index)}
              className={cn(
                "flex-shrink-0 px-4 md:px-6 py-4 rounded-2xl transition-all duration-500 flex flex-col items-center min-w-[100px] md:min-w-[120px] relative group",
                activeDay === index
                  ? "bg-gradient-to-br text-white shadow-xl scale-105"
                  : "bg-card/80 backdrop-blur-md border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground hover:scale-102",
                activeDay === index && day.gradient
              )}
            >
              {/* Glow effect for active day */}
              {activeDay === index && (
                <div className={cn("absolute inset-0 rounded-2xl blur-xl opacity-40 -z-10 bg-gradient-to-br", day.gradient)} />
              )}
              
              <span className={cn(
                "text-xs font-medium mb-1 transition-opacity",
                activeDay === index ? "opacity-90" : "opacity-60"
              )}>
                {language === "en" ? day.dayNameEn : day.dayNameFr}
              </span>
              <span className="text-2xl md:text-3xl font-black">
                {language === "en" ? day.dateEn.split(" ")[1] : day.date.split(" ")[0]}
              </span>
              <span className="text-[10px] uppercase tracking-wider mt-1">
                {language === "en" ? day.dateEn.split(" ")[0] : day.date.split(" ")[1]}
              </span>
              
              {/* Active indicator dot */}
              {activeDay === index && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-lg" />
              )}
            </button>
          ))}
        </div>

        {/* Controls: View toggle + Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-md border border-border/50">
            {/* View toggle */}
            <div className="flex items-center gap-2 bg-secondary/50 rounded-xl p-1">
              <Button
                variant={viewMode === 'detailed' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('detailed')}
                className="h-8 px-3 gap-1.5"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">{language === "en" ? "Detailed" : "Détaillé"}</span>
              </Button>
              <Button
                variant={viewMode === 'compact' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('compact')}
                className="h-8 px-3 gap-1.5"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">{language === "en" ? "Compact" : "Compact"}</span>
              </Button>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Button
                variant={activeFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(null)}
                className="h-8 text-xs rounded-full"
              >
                {language === "en" ? "All" : "Tous"}
              </Button>
              {eventTypes.map(type => (
                <Button
                  key={type}
                  variant={activeFilter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(activeFilter === type ? null : type)}
                  className={cn(
                    "h-8 text-xs gap-1.5 rounded-full transition-all",
                    activeFilter === type && `bg-gradient-to-r ${typeConfig[type].gradient} border-0 text-white`
                  )}
                >
                  {typeConfig[type].icon}
                  <span className="hidden sm:inline">{getTypeLabel(type)}</span>
                </Button>
              ))}
              {activeFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveFilter(null)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Active day content */}
        <div className="max-w-4xl mx-auto">
          {/* Day header with gradient */}
          <div className={cn(
            "flex items-center gap-4 mb-8 p-5 rounded-2xl bg-gradient-to-r border-0 text-white relative overflow-hidden",
            scheduleData[activeDay].gradient
          )}>
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            </div>
            
            <div className="relative flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-3xl font-black">{scheduleData[activeDay].day}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {language === "en" 
                    ? `${scheduleData[activeDay].dayNameEn}, ${scheduleData[activeDay].dateEn}`
                    : `${scheduleData[activeDay].dayNameFr} ${scheduleData[activeDay].date}`
                  }
                </h3>
                <p className="text-white/80 font-medium">
                  {language === "en" ? scheduleData[activeDay].theme : scheduleData[activeDay].themeFr}
                </p>
              </div>
            </div>
          </div>

          {/* Events with Timeline */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8" />
              </div>
              <p className="text-lg">
                {language === "en" 
                  ? "No events match this filter for this day." 
                  : "Aucun événement ne correspond à ce filtre pour ce jour."}
              </p>
            </div>
          ) : viewMode === 'detailed' ? (
            // Detailed view with vertical timeline
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[23px] md:left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-cyan to-primary/30 hidden sm:block" />
              
              <div className="space-y-4">
                {filteredEvents.map((event, index) => {
                  const isLive = mounted && isEventLive(activeDay, event.time)
                  
                  return (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <div className={cn(
                        "absolute left-4 md:left-5 top-6 w-3 h-3 rounded-full border-2 border-background z-10 hidden sm:block transition-all duration-300",
                        isLive 
                          ? "bg-red-500 animate-pulse ring-4 ring-red-500/30" 
                          : `bg-gradient-to-br ${typeConfig[event.type].gradient}`
                      )} />
                      
                      <div className="sm:pl-14">
                        <TiltCard isLive={isLive}>
                          <Card className={cn(
                            "bg-card/80 backdrop-blur-md border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden group",
                            event.type === "lunch" && "opacity-80",
                            isLive && "border-red-500/50 bg-red-500/5"
                          )}>
                            <CardContent className="p-0">
                              <div className="flex flex-col md:flex-row">
                                {/* Time column with gradient */}
                                <div className={cn(
                                  "md:w-40 p-4 md:p-5 border-b md:border-b-0 md:border-r border-border/50 flex md:flex-col items-center md:items-start justify-center gap-2 bg-gradient-to-br from-secondary/50 to-transparent"
                                )}>
                                  <div className={cn(
                                    "p-2 rounded-lg",
                                    typeConfig[event.type].bg
                                  )}>
                                    {typeConfig[event.type].icon}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-foreground">{event.time}</span>
                                    {isLive && (
                                      <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500 mt-1">
                                        <Radio className="w-3 h-3 animate-pulse" />
                                        LIVE
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                      {language === "en" ? event.titleEn : event.titleFr}
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
                                      <div className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                        <span className="truncate">{event.location}</span>
                                      </div>
                                      
                                      {/* Speaker with photo */}
                                      {event.speaker && (
                                        <button
                                          onClick={() => scrollToSpeaker(event.speaker!)}
                                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-cyan/10 hover:from-primary/20 hover:to-cyan/20 transition-all group/speaker cursor-pointer border border-primary/20"
                                        >
                                          {(() => {
                                            const speakerInfo = getSpeakerInfo(event.speaker)
                                            if (speakerInfo?.image) {
                                              return (
                                                <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover/speaker:ring-primary/50 transition-all">
                                                  <Image
                                                    src={speakerInfo.image}
                                                    alt={event.speaker}
                                                    width={24}
                                                    height={24}
                                                    className="w-full h-full object-cover"
                                                  />
                                                </div>
                                              )
                                            } else if (speakerInfo?.initials) {
                                              return (
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center ring-2 ring-primary/30">
                                                  <span className="text-[10px] font-bold text-white">{speakerInfo.initials}</span>
                                                </div>
                                              )
                                            } else {
                                              return <User className="w-4 h-4 text-primary" />
                                            }
                                          })()}
                                          <span className="text-primary font-medium text-xs group-hover/speaker:underline">
                                            {event.speaker.split(" (")[0]}
                                          </span>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <Badge className={cn(
                                    "shrink-0 border-0 px-3 py-1.5 rounded-full font-medium",
                                    `bg-gradient-to-r ${typeConfig[event.type].gradient} text-white`
                                  )}>
                                    {typeConfig[event.type].icon}
                                    <span className="ml-1.5">{getTypeLabel(event.type)}</span>
                                  </Badge>
                                </div>

                                {/* Arrow indicator */}
                                <div className="hidden md:flex items-center px-4">
                                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TiltCard>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            // Compact view - Grid layout
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredEvents.map((event, index) => {
                const isLive = mounted && isEventLive(activeDay, event.time)
                
                return (
                  <TiltCard key={index} isLive={isLive}>
                    <Card className={cn(
                      "bg-card/80 backdrop-blur-md border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden h-full",
                      event.type === "lunch" && "opacity-80",
                      isLive && "border-red-500/50 bg-red-500/5"
                    )}>
                      <CardContent className="p-4">
                        {/* Header with type badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <Badge className={cn(
                            "border-0 px-2 py-0.5 rounded-full text-xs font-medium",
                            `bg-gradient-to-r ${typeConfig[event.type].gradient} text-white`
                          )}>
                            {typeConfig[event.type].icon}
                            <span className="ml-1">{getTypeLabel(event.type)}</span>
                          </Badge>
                          {isLive && (
                            <span className="flex items-center gap-1 text-xs font-semibold text-red-500">
                              <Radio className="w-3 h-3 animate-pulse" />
                              LIVE
                            </span>
                          )}
                        </div>
                        
                        {/* Time */}
                        <div className="flex items-center gap-1.5 text-sm text-primary font-semibold mb-2">
                          <Clock className="w-3.5 h-3.5" />
                          {event.time}
                        </div>
                        
                        {/* Title */}
                        <h4 className="font-bold text-foreground mb-2 line-clamp-2 text-sm">
                          {language === "en" ? event.titleEn : event.titleFr}
                        </h4>
                        
                        {/* Speaker */}
                        {event.speaker && (
                          <button
                            onClick={() => scrollToSpeaker(event.speaker!)}
                            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            {(() => {
                              const speakerInfo = getSpeakerInfo(event.speaker)
                              if (speakerInfo?.image) {
                                return (
                                  <div className="w-5 h-5 rounded-full overflow-hidden">
                                    <Image
                                      src={speakerInfo.image}
                                      alt={event.speaker}
                                      width={20}
                                      height={20}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )
                              } else if (speakerInfo?.initials) {
                                return (
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
                                    <span className="text-[8px] font-bold text-white">{speakerInfo.initials}</span>
                                  </div>
                                )
                              }
                              return <User className="w-3.5 h-3.5" />
                            })()}
                            <span>{event.speaker.split(" (")[0]}</span>
                          </button>
                        )}
                      </CardContent>
                    </Card>
                  </TiltCard>
                )
              })}
            </div>
          )}
        </div>

        {/* Bottom mini-navigation with progress */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-1 mb-4">
            {scheduleData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeDay === index 
                    ? "w-8 bg-primary" 
                    : "w-1.5 bg-border hover:bg-primary/50"
                )}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-5 gap-2 max-w-2xl mx-auto">
            {scheduleData.map((day, index) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(index)}
                className={cn(
                  "p-3 rounded-xl border transition-all text-center group relative overflow-hidden",
                  activeDay === index
                    ? "border-primary/50 bg-gradient-to-br from-primary/10 to-cyan/10"
                    : "bg-card/50 backdrop-blur-sm border-border hover:border-primary/30",
                )}
              >
                {/* Active background glow */}
                {activeDay === index && (
                  <div className={cn("absolute inset-0 opacity-20 bg-gradient-to-br", day.gradient)} />
                )}
                
                <div className={cn(
                  "w-2 h-2 rounded-full mx-auto mb-2 transition-transform group-hover:scale-125",
                  activeDay === index ? "bg-primary" : day.color
                )} />
                <div className="text-[10px] text-muted-foreground font-medium">
                  {language === "en" ? day.dayNameEn.slice(0, 3) : day.dayNameFr.slice(0, 3)}
                </div>
                <div className="font-bold text-foreground text-sm relative">
                  {language === "en" ? day.dateEn.split(" ")[1] : day.date.split(" ")[0]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
