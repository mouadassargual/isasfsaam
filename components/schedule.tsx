"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  CalendarDays, Clock, MapPin, ChevronRight, Coffee, Utensils, User,
  Mic2, Wrench, Users2, Sparkles, Radio, Play, ChevronDown, Zap
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GOOGLE_FORM_URL } from "@/lib/constants"

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
    emoji: "🚀",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    events: [
      { time: "08:30 - 09:30", titleEn: "Registration", titleFr: "Inscription", type: "ceremony", location: "Hall" },
      { time: "09:30 - 10:00", titleEn: "Opening Speech", titleFr: "Discours d'ouverture", type: "ceremony", location: "Salle des conférences" },
      { time: "10:00 - 11:00", titleEn: "Building a project from scratch", titleFr: "Construire un projet de zéro", speaker: "Ismail Saddik", type: "keynote", location: "Salle des conférences" },
      { time: "11:00 - 11:15", titleEn: "Break & Speed Networking", titleFr: "Pause & Speed Networking", type: "networking", location: "Hall" },
      { time: "11:15 - 12:45", titleEn: "Smart systems needs by Local government & Private sector", titleFr: "Besoins en systèmes intelligents par le gouvernement local & secteur privé", type: "conference", location: "Salle des conférences" },
      { time: "12:45 - 14:00", titleEn: "Lunch", titleFr: "Déjeuner", type: "lunch", location: "Cafeteria" },
      { time: "14:00 - 17:00", titleEn: "From business needs to technical solutions", titleFr: "Des besoins métiers aux solutions techniques", type: "workshop", location: "Salle Polyvalente" },
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
    emoji: "🏭",
    color: "bg-violet-500",
    gradient: "from-violet-500 to-purple-600",
    events: [
      { time: "10:00 - 11:00", titleEn: "Industrial Smart Solutions - Keynote", titleFr: "Solutions Industrielles Intelligentes - Keynote", speaker: "Mohamed El Habib Abaakil (PPRIME)", type: "keynote", location: "Salle des conférences" },
      { time: "11:00 - 11:15", titleEn: "Break & Speed Networking", titleFr: "Pause & Speed Networking", type: "networking", location: "Hall" },
      { time: "11:15 - 12:45", titleEn: "Industrial smart solutions", titleFr: "Solutions industrielles intelligentes", type: "conference", location: "Salle des conférences" },
      { time: "12:45 - 14:00", titleEn: "Lunch", titleFr: "Déjeuner", type: "lunch", location: "Cafeteria" },
      { time: "14:00 - 17:00", titleEn: "Co-creating smart solutions - Workshop", titleFr: "Co-création de solutions intelligentes - Workshop", speaker: "Mohamed El Habib Abaakil", type: "workshop", location: "Salle Polyvalente" },
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
    emoji: "🚗",
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-teal-500",
    events: [
      { time: "10:00 - 11:00", titleEn: "Engineering ADAS: A Gateway to Vehicle Autonomy", titleFr: "Ingénierie ADAS: Passerelle vers l'autonomie véhiculaire", speaker: "Zakaria El Khadiri", type: "keynote", location: "Salle des conférences" },
      { time: "11:00 - 11:15", titleEn: "Break & Speed Networking", titleFr: "Pause & Speed Networking", type: "networking", location: "Hall" },
      { time: "11:15 - 12:45", titleEn: "Building Information Modeling (BIM) & Virtual Reality", titleFr: "Modélisation BIM & Réalité Virtuelle", speaker: "Ismail Khoubbaz (BIM-R)", type: "keynote", location: "Salle des conférences" },
      { time: "12:45 - 14:00", titleEn: "Lunch", titleFr: "Déjeuner", type: "lunch", location: "Cafeteria" },
      { time: "14:00 - 17:00", titleEn: "BIM design and VR exploration - Hands-on Session", titleFr: "Conception BIM et exploration VR - Session Pratique", speaker: "Ismail Khoubbaz", type: "workshop", location: "Salle Polyvalente" },
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
    emoji: "🌾",
    color: "bg-primary",
    gradient: "from-primary to-orange-500",
    events: [
      { time: "10:00 - 11:00", titleEn: "Robotic Precision Agriculture: Sensors, Drones, and Innovations", titleFr: "Agriculture de précision robotique: Capteurs, Drones et Innovations", speaker: "Amine Saddik", type: "keynote", location: "Salle des conférences" },
      { time: "11:00 - 11:15", titleEn: "Break & Speed Networking", titleFr: "Pause & Speed Networking", type: "networking", location: "Hall" },
      { time: "11:15 - 12:45", titleEn: "TBA", titleFr: "À confirmer", type: "tba", location: "Salle des conférences" },
      { time: "12:45 - 14:00", titleEn: "Lunch", titleFr: "Déjeuner", type: "lunch", location: "Cafeteria" },
      { time: "14:00 - 17:00", titleEn: "Building a modern open-source data pipeline", titleFr: "Construire un pipeline de données open-source moderne", speaker: "Nabil Ayoub (AgriData)", type: "workshop", location: "Salle Polyvalente" },
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
    emoji: "🏆",
    color: "bg-rose-500",
    gradient: "from-rose-500 to-pink-600",
    events: [
      { time: "10:00 - 11:00", titleEn: "Data-Driven Agriculture, real use cases!", titleFr: "Agriculture Data-Driven, cas réels!", speaker: "Anas Bennis (ENA Meknès)", type: "keynote", location: "Salle des conférences" },
      { time: "11:00 - 11:15", titleEn: "Break & Speed Networking", titleFr: "Pause & Speed Networking", type: "networking", location: "Hall" },
      { time: "11:15 - 12:45", titleEn: "Systems Integration Hackathon: From Sensor to Dashboard", titleFr: "Hackathon Intégration Systèmes: Du Capteur au Dashboard", speaker: "Zakaria Oulad (MOZA Partners)", type: "hackathon", location: "Salle des conférences + Salle Polyvalente" },
      { time: "12:45 - 14:00", titleEn: "Lunch", titleFr: "Déjeuner", type: "lunch", location: "Cafeteria" },
      { time: "14:00 - 17:00", titleEn: "Systems Integration Hackathon (continued)", titleFr: "Hackathon Intégration Systèmes (suite)", speaker: "Zakaria Oulad", type: "hackathon", location: "Salle des conférences + Salle Polyvalente" },
      { time: "17:00 - 17:30", titleEn: "Closing Speech & Awards", titleFr: "Discours de clôture & Remise des prix", type: "ceremony", location: "Salle des conférences" },
    ],
  },
]

const typeConfig: Record<string, { icon: React.ReactNode; gradient: string; label: string; labelFr: string }> = {
  ceremony: { icon: <Sparkles className="w-4 h-4" />, gradient: "from-primary to-orange-500", label: "Ceremony", labelFr: "Cérémonie" },
  keynote: { icon: <Mic2 className="w-4 h-4" />, gradient: "from-cyan-400 to-blue-500", label: "Keynote", labelFr: "Keynote" },
  conference: { icon: <Users2 className="w-4 h-4" />, gradient: "from-blue-400 to-indigo-500", label: "Conference", labelFr: "Conférence" },
  workshop: { icon: <Wrench className="w-4 h-4" />, gradient: "from-emerald-400 to-teal-500", label: "Workshop", labelFr: "Atelier" },
  networking: { icon: <Coffee className="w-4 h-4" />, gradient: "from-violet-400 to-purple-500", label: "Networking", labelFr: "Networking" },
  lunch: { icon: <Utensils className="w-4 h-4" />, gradient: "from-amber-400 to-orange-500", label: "Lunch", labelFr: "Déjeuner" },
  hackathon: { icon: <Play className="w-4 h-4" />, gradient: "from-rose-400 to-pink-500", label: "Hackathon", labelFr: "Hackathon" },
  tba: { icon: <Clock className="w-4 h-4" />, gradient: "from-gray-400 to-gray-500", label: "TBA", labelFr: "À confirmer" },
}

// Check if an event is currently live
const isEventLive = (dayIndex: number, eventTime: string): boolean => {
  const now = new Date()
  const eventDate = new Date(2025, 11, 8 + dayIndex)
  if (now.toDateString() !== eventDate.toDateString()) return false
  
  const [startTime, endTime] = eventTime.split(" - ")
  const [startHour, startMin] = startTime.split(":").map(Number)
  const [endHour, endMin] = endTime.split(":").map(Number)
  
  const currentTotalMin = now.getHours() * 60 + now.getMinutes()
  const startTotalMin = startHour * 60 + startMin
  const endTotalMin = endHour * 60 + endMin
  
  return currentTotalMin >= startTotalMin && currentTotalMin < endTotalMin
}

export function Schedule() {
  const [expandedDay, setExpandedDay] = useState<number | null>(0)
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

  return (
    <section id="schedule" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-cyan/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
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

        {/* 5 Days Overview - Horizontal Cards */}
        <div className="grid grid-cols-5 gap-3 mb-12 hidden lg:grid">
          {scheduleData.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setExpandedDay(expandedDay === index ? null : index)}
              className={cn(
                "p-4 rounded-2xl transition-all duration-500 text-left relative overflow-hidden group",
                expandedDay === index
                  ? "bg-gradient-to-br text-white shadow-2xl scale-105 z-10"
                  : "bg-card/60 backdrop-blur-md border border-border/50 hover:border-primary/30 hover:scale-102",
                expandedDay === index && day.gradient
              )}
            >
              {expandedDay === index && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              )}
              <div className="relative">
                <div className="text-3xl mb-2">{day.emoji}</div>
                <div className={cn(
                  "text-2xl font-black",
                  expandedDay !== index && "text-foreground"
                )}>
                  {language === "en" ? day.dateEn.split(" ")[1] : day.date.split(" ")[0]}
                </div>
                <div className={cn(
                  "text-xs font-medium uppercase tracking-wider",
                  expandedDay === index ? "text-white/80" : "text-muted-foreground"
                )}>
                  {language === "en" ? day.dayNameEn : day.dayNameFr}
                </div>
                <div className={cn(
                  "text-xs mt-2 line-clamp-1",
                  expandedDay === index ? "text-white/90" : "text-muted-foreground"
                )}>
                  {language === "en" ? day.theme : day.themeFr}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 lg:hidden scrollbar-hide">
          {scheduleData.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setExpandedDay(expandedDay === index ? null : index)}
              className={cn(
                "flex-shrink-0 px-5 py-4 rounded-2xl transition-all duration-300 flex flex-col items-center min-w-[90px]",
                expandedDay === index
                  ? "bg-gradient-to-br text-white shadow-xl"
                  : "bg-card/60 backdrop-blur-md border border-border/50",
                expandedDay === index && day.gradient
              )}
            >
              <span className="text-2xl mb-1">{day.emoji}</span>
              <span className="text-xl font-black">
                {language === "en" ? day.dateEn.split(" ")[1] : day.date.split(" ")[0]}
              </span>
              <span className="text-[10px] uppercase tracking-wider opacity-80">
                {language === "en" ? day.dayNameEn.slice(0, 3) : day.dayNameFr.slice(0, 3)}
              </span>
            </button>
          ))}
        </div>

        {/* Accordion Style Days */}
        <div className="space-y-4">
          {scheduleData.map((day, dayIndex) => (
            <div key={day.day} className="relative">
              {/* Day Header Card */}
              <button
                onClick={() => setExpandedDay(expandedDay === dayIndex ? null : dayIndex)}
                className={cn(
                  "w-full p-5 rounded-2xl transition-all duration-500 flex items-center justify-between group",
                  expandedDay === dayIndex
                    ? \`bg-gradient-to-r \${day.gradient} text-white shadow-2xl\`
                    : "bg-card/80 backdrop-blur-md border border-border/50 hover:border-primary/30"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center text-2xl",
                    expandedDay === dayIndex
                      ? "bg-white/20"
                      : "bg-secondary/50"
                  )}>
                    {day.emoji}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-xl font-black",
                        expandedDay !== dayIndex && "text-foreground"
                      )}>
                        {language === "en" 
                          ? \`\${day.dayNameEn} \${day.dateEn}\`
                          : \`\${day.dayNameFr} \${day.date}\`
                        }
                      </span>
                      <Badge className={cn(
                        "border-0 text-xs",
                        expandedDay === dayIndex
                          ? "bg-white/20 text-white"
                          : \`bg-gradient-to-r \${day.gradient} text-white\`
                      )}>
                        {day.events.length} {language === "en" ? "events" : "événements"}
                      </Badge>
                    </div>
                    <p className={cn(
                      "text-sm mt-1",
                      expandedDay === dayIndex ? "text-white/80" : "text-muted-foreground"
                    )}>
                      {language === "en" ? day.theme : day.themeFr}
                    </p>
                  </div>
                </div>
                <ChevronDown className={cn(
                  "w-6 h-6 transition-transform duration-300",
                  expandedDay === dayIndex ? "rotate-180" : "",
                  expandedDay !== dayIndex && "text-muted-foreground"
                )} />
              </button>

              {/* Expanded Events */}
              <div className={cn(
                "overflow-hidden transition-all duration-500",
                expandedDay === dayIndex ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"
              )}>
                <div className="relative pl-8 md:pl-12">
                  {/* Vertical Timeline */}
                  <div className={cn(
                    "absolute left-3 md:left-5 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b",
                    day.gradient
                  )} />

                  <div className="space-y-3">
                    {day.events.map((event, eventIndex) => {
                      const isLive = mounted && isEventLive(dayIndex, event.time)
                      const config = typeConfig[event.type]
                      
                      return (
                        <div key={eventIndex} className="relative group">
                          {/* Timeline Dot */}
                          <div className={cn(
                            "absolute -left-5 md:-left-7 top-5 w-4 h-4 rounded-full border-4 border-background z-10 transition-all",
                            isLive 
                              ? "bg-red-500 animate-pulse ring-4 ring-red-500/30" 
                              : \`bg-gradient-to-br \${config.gradient}\`
                          )} />

                          {/* Event Card */}
                          <Card className={cn(
                            "overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.01]",
                            "bg-card/80 backdrop-blur-md border-border/30 hover:border-primary/30",
                            isLive && "ring-2 ring-red-500/50 bg-red-500/5"
                          )}>
                            <CardContent className="p-0">
                              <div className="flex flex-col sm:flex-row">
                                {/* Time Block */}
                                <div className={cn(
                                  "sm:w-32 p-4 flex sm:flex-col items-center sm:items-start justify-center gap-2 border-b sm:border-b-0 sm:border-r border-border/30",
                                  "bg-gradient-to-br from-secondary/30 to-transparent"
                                )}>
                                  <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    \`bg-gradient-to-br \${config.gradient} text-white\`
                                  )}>
                                    {config.icon}
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-foreground">{event.time}</div>
                                    {isLive && (
                                      <div className="flex items-center gap-1 text-xs text-red-500 font-bold mt-0.5">
                                        <Radio className="w-3 h-3 animate-pulse" />
                                        LIVE
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-4">
                                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                    <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex-1">
                                      {language === "en" ? event.titleEn : event.titleFr}
                                    </h4>
                                    <Badge className={cn(
                                      "shrink-0 border-0 text-white text-xs",
                                      \`bg-gradient-to-r \${config.gradient}\`
                                    )}>
                                      {language === "en" ? config.label : config.labelFr}
                                    </Badge>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                      <MapPin className="w-3.5 h-3.5" />
                                      <span>{event.location}</span>
                                    </div>

                                    {event.speaker && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          scrollToSpeaker(event.speaker!)
                                        }}
                                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-cyan/10 hover:from-primary/20 hover:to-cyan/20 transition-all border border-primary/20 group/speaker"
                                      >
                                        {(() => {
                                          const speakerInfo = getSpeakerInfo(event.speaker)
                                          if (speakerInfo?.image) {
                                            return (
                                              <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-primary/30">
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
                                          return <User className="w-3.5 h-3.5 text-primary" />
                                        })()}
                                        <span className="text-xs font-medium text-primary group-hover/speaker:underline">
                                          {event.speaker.split(" (")[0]}
                                        </span>
                                        <ChevronRight className="w-3 h-3 text-primary" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <CalendarDays className="w-6 h-6" />, value: "5", label: language === "en" ? "Days" : "Jours", gradient: "from-blue-500 to-cyan-500" },
            { icon: <Mic2 className="w-6 h-6" />, value: "8", label: language === "en" ? "Keynotes" : "Keynotes", gradient: "from-violet-500 to-purple-500" },
            { icon: <Wrench className="w-6 h-6" />, value: "5", label: language === "en" ? "Workshops" : "Ateliers", gradient: "from-emerald-500 to-teal-500" },
            { icon: <Zap className="w-6 h-6" />, value: "1", label: language === "en" ? "Hackathon" : "Hackathon", gradient: "from-rose-500 to-pink-500" },
          ].map((stat, i) => (
            <Card key={i} className="bg-card/60 backdrop-blur-md border-border/50 overflow-hidden group hover:border-primary/30 transition-all hover:scale-105">
              <CardContent className="p-5 text-center relative">
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
                  stat.gradient
                )} />
                <div className={cn(
                  "w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white bg-gradient-to-br",
                  stat.gradient
                )}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Download Program CTA */}
        <div className="mt-12 text-center">
          <Card className="max-w-xl mx-auto bg-gradient-to-r from-primary/10 via-card/80 to-cyan/10 border-primary/20 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {language === "en" ? "Full Program Available" : "Programme Complet Disponible"}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {language === "en" 
                  ? "December 8-12, 2025 • FSA Agadir" 
                  : "8-12 Décembre 2025 • FSA Agadir"}
              </p>
              <Button asChild className="bg-gradient-to-r from-primary to-cyan hover:opacity-90 border-0 text-white">
                <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                  {language === "en" ? "Register Now" : "S'inscrire Maintenant"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
