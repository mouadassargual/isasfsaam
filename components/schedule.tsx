"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  CalendarDays, Clock, MapPin, ChevronRight, Coffee, User,
  Mic2, Wrench, Users2, Sparkles, Radio, Play, Zap, ArrowRight, GraduationCap
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GOOGLE_FORM_URL } from "@/lib/constants"

const speakerImages: Record<string, { image: string | null; initials?: string }> = {
  "Ismail Saddik": { image: "/speakrs/ismail.png" },
  "Mohamed El Habib Abaakil": { image: "/speakrs/Mohamed-El-Habib-Abaakil.jpeg" },
  "Zakaria El Khadiri": { image: "/speakrs/ZEK.png" },
  "Ismail Khoubbaz": { image: "/speakrs/Ismail-Khoubbaz.jpeg" },
  "Amine Saddik": { image: "/speakrs/amine.png" },
  "Prof. Amine Saddik": { image: "/speakrs/amine.png" },
  "Nabil Ayoub": { image: "/speakrs/nabil.png" },
  "Anas Bennis": { image: "/speakrs/bennis.jpeg" },
  "Zakaria Oulad": { image: "/speakrs/zakaria-oulad.png" },
  "Prof. El Mehdi Cherrat": { image: "/speakrs/Cherrat.png" },
  "Nabil Ayoub & Anas Bennis": { image: null, initials: "NA" },
  "Rachid Belmouden": { image: null, initials: "RB" },
  "Abdellah Bourti": { image: "/speakrs/abdellah-bourti.jpg" },
  "Youssef El-Ouardi": { image: "/speakrs/Elouardi.jpeg" },
  "Zakaria Oulad & CNDP": { image: "/speakrs/zakaria-oulad.png" },
}

const getSpeakerInfo = (speakerName: string) => {
  const cleanName = speakerName.split(" (")[0].trim()
  return speakerImages[cleanName] || null
}

const scheduleData = [
  {
    day: 1, date: "8", month: "DEC", dayNameFr: "Lundi", dayNameEn: "Monday",
    theme: "Opening & Data Solutions", themeFr: "Ouverture & Solutions Data",
    emoji: "🚀", gradient: "from-blue-500 via-blue-600 to-cyan-500", bgGlow: "bg-blue-500/20",
    events: [
      { time: "09:30 - 10:00", titleEn: "Opening Ceremony", titleFr: "Cérémonie d'ouverture", type: "ceremony", location: "Salle de Conférence", icon: "🎤", openingSpeakers: ["Prof. Nabil Hamina — President of Ibn Zohr University", "Prof. Ali Rachidi — Dean of FSA Ait Melloul", "Mr. Omar Seghrouchni — President of CNDP", "Vice-President of Agadir City Council", "Prof. Azeddine Dliou — Head of GISI Department", "Prof. Yasmine Lamari — Chair, ISAS'25 Organizing Committee"] },
      { time: "10:00 - 11:00", titleEn: "Round Table — Data Solutions in Morocco", titleFr: "Table Ronde — Solutions Data au Maroc", speaker: "Zakaria Oulad", type: "conference", location: "Salle de Conférence", icon: "🗣️" },
      { time: "11:00 - 11:30", titleEn: "Coffee Break", titleFr: "Pause Café", type: "networking", location: "Hall", icon: "☕" },
      { time: "11:30 - 12:30", titleEn: "Guest Talk — Building a Project from Scratch", titleFr: "Conférence — Construire un projet de zéro", speaker: "Ismail Saddik", type: "keynote", location: "Salle de Conférence", icon: "💡" },
      { time: "14:00 - 17:00", titleEn: "Workshop — From Business Needs to Smart Solutions", titleFr: "Atelier — Des besoins métiers aux solutions intelligentes", speaker: "Zakaria Oulad & CNDP", type: "workshop", location: "Salle Polyvalente", icon: "🔧" },
    ],
  },
  {
    day: 2, date: "9", month: "DEC", dayNameFr: "Mardi", dayNameEn: "Tuesday",
    theme: "Agri-AI & Industrial Solutions", themeFr: "Agri-IA & Solutions Industrielles",
    emoji: "🤖", gradient: "from-violet-500 via-purple-600 to-fuchsia-500", bgGlow: "bg-violet-500/20",
    events: [
      { time: "10:00 - 11:00", titleEn: "Agri-AI: Digital Solutions for Agriculture", titleFr: "Agri-IA : Solutions numériques pour l'agriculture", speaker: "Prof. El Mehdi Cherrat", type: "keynote", location: "Salle de Conférence", icon: "🌿" },
      { time: "11:00 - 11:15", titleEn: "Break & Speed Networking", titleFr: "Pause & Speed Networking", type: "networking", location: "Hall", icon: "☕" },
      { time: "11:15 - 12:45", titleEn: "Industrial Smart Solutions", titleFr: "Solutions Industrielles Intelligentes", speaker: "Mohamed El Habib Abaakil", type: "keynote", location: "Salle de Conférence", icon: "🏭" },
      { time: "14:00 - 17:00", titleEn: "Workshop — Co-Creating Smart Solutions", titleFr: "Atelier — Co-création de solutions intelligentes", speaker: "Mohamed El Habib Abaakil", type: "workshop", location: "Salle Polyvalente", icon: "🤝" },
    ],
  },
  {
    day: 3, date: "10", month: "DEC", dayNameFr: "Mercredi", dayNameEn: "Wednesday",
    theme: "ADAS & BIM/VR", themeFr: "ADAS & BIM/VR",
    emoji: "🚗", gradient: "from-emerald-500 via-green-600 to-teal-500", bgGlow: "bg-emerald-500/20",
    events: [
      { time: "10:00 - 11:00", titleEn: "Engineering ADAS: A Gateway to Vehicle Autonomy", titleFr: "Ingénierie ADAS : Vers l'autonomie véhiculaire", speaker: "Zakaria El Khadiri", type: "keynote", location: "Salle de Conférence", icon: "🚙" },
      { time: "11:00 - 11:15", titleEn: "Break & Speed Networking", titleFr: "Pause & Speed Networking", type: "networking", location: "Hall", icon: "☕" },
      { time: "11:15 - 12:45", titleEn: "Building Information Modeling (BIM) & Virtual Reality", titleFr: "BIM & Réalité Virtuelle", speaker: "Ismail Khoubbaz", type: "keynote", location: "Salle de Conférence", icon: "🥽" },
      { time: "14:00 - 17:00", titleEn: "Workshop — BIM Design and VR Exploration", titleFr: "Atelier — Conception BIM et exploration VR", speaker: "Ismail Khoubbaz", type: "workshop", location: "Salle Polyvalente", icon: "🎮" },
    ],
  },
  {
    day: 4, date: "11", month: "DEC", dayNameFr: "Jeudi", dayNameEn: "Thursday",
    theme: "Precision Agriculture & Data", themeFr: "Agriculture de Précision & Data",
    emoji: "🌾", gradient: "from-orange-500 via-amber-600 to-yellow-500", bgGlow: "bg-orange-500/20",
    events: [
      { time: "10:00 - 11:00", titleEn: "Precision Agriculture: Robotics, Sensors, Drones & Innovations", titleFr: "Agriculture de précision : Robotique, Capteurs, Drones & Innovations", speaker: "Prof. Amine Saddik", type: "keynote", location: "Salle de Conférence", icon: "🌱" },
      { time: "11:00 - 11:15", titleEn: "Break & Speed Networking", titleFr: "Pause & Speed Networking", type: "networking", location: "Hall", icon: "☕" },
      { time: "11:15 - 12:45", titleEn: "Precision Guidance for Optimal Crop Protection", titleFr: "Guidage de précision pour la protection optimale des cultures", speaker: "Rachid Belmouden", type: "keynote", location: "Salle de Conférence", icon: "🎯" },
      { time: "14:00 - 17:00", titleEn: "Workshop — Building a Modern Open-Source Data Pipeline", titleFr: "Atelier — Pipeline de données open-source moderne", speaker: "Nabil Ayoub & Anas Bennis", type: "workshop", location: "Salle Polyvalente", icon: "📊" },
    ],
  },
  {
    day: 5, date: "12", month: "DEC", dayNameFr: "Vendredi", dayNameEn: "Friday",
    theme: "Business Model & Strategy", themeFr: "Business Model & Stratégie",
    emoji: "💼", gradient: "from-rose-500 via-pink-600 to-red-500", bgGlow: "bg-rose-500/20",
    events: [
      { time: "10:00 - 12:45", titleEn: "Business Model Strategies and Go-to-Market Approaches for Intelligent Solutions", titleFr: "Stratégies Business Model et Go-to-Market pour les solutions intelligentes", speaker: "Abdellah Bourti", type: "keynote", location: "Salle de Conférence", icon: "📈" },
      { time: "14:00 - 17:00", titleEn: "Hands-On Workshop — Building Your Business Model and Launch Plan", titleFr: "Atelier Pratique — Construisez votre Business Model et Plan de Lancement", speaker: "Abdellah Bourti", type: "workshop", location: "Salle Polyvalente", icon: "🚀" },
    ],
  },
  {
    day: 6, date: "13", month: "DEC", dayNameFr: "Samedi", dayNameEn: "Saturday",
    theme: "Project Management & Closing", themeFr: "Gestion de Projet & Clôture",
    emoji: "🏆", gradient: "from-indigo-500 via-blue-600 to-cyan-500", bgGlow: "bg-indigo-500/20",
    events: [
      { time: "10:00 - 13:00", titleEn: "Project Management and Go-to-Market Strategy", titleFr: "Gestion de Projet et Stratégie Go-to-Market", speaker: "Youssef El-Ouardi", type: "keynote", location: "Salle de Conférence", icon: "📋" },
      { time: "13:00 - 14:00", titleEn: "Closing Session & Certificates", titleFr: "Cérémonie de Clôture & Certificats", type: "ceremony", location: "Salle de Conférence", icon: "🏅" },
    ],
  },
]

const typeConfig: Record<string, { icon: React.ReactNode; gradient: string; label: string; labelFr: string }> = {
  ceremony: { icon: <Sparkles className="w-4 h-4" />, gradient: "from-amber-400 to-orange-500", label: "Ceremony", labelFr: "Cérémonie" },
  keynote: { icon: <Mic2 className="w-4 h-4" />, gradient: "from-cyan-400 to-blue-500", label: "Keynote", labelFr: "Keynote" },
  conference: { icon: <Users2 className="w-4 h-4" />, gradient: "from-blue-400 to-indigo-500", label: "Panel", labelFr: "Panel" },
  workshop: { icon: <Wrench className="w-4 h-4" />, gradient: "from-emerald-400 to-teal-500", label: "Workshop", labelFr: "Atelier" },
  networking: { icon: <Coffee className="w-4 h-4" />, gradient: "from-violet-400 to-purple-500", label: "Break", labelFr: "Pause" },
  hackathon: { icon: <Play className="w-4 h-4" />, gradient: "from-rose-400 to-pink-500", label: "Hackathon", labelFr: "Hackathon" },
  tba: { icon: <Clock className="w-4 h-4" />, gradient: "from-gray-400 to-gray-500", label: "TBA", labelFr: "À confirmer" },
}

const isEventLive = (dayIndex: number, eventTime: string): boolean => {
  const now = new Date()
  const eventDate = new Date(2025, 11, 8 + dayIndex)
  if (now.toDateString() !== eventDate.toDateString()) return false
  const [startTime] = eventTime.split(" - ")
  const [endTimeStr] = eventTime.split(" - ").slice(1)
  const [startHour, startMin] = startTime.split(":").map(Number)
  const [endHour, endMin] = endTimeStr.split(":").map(Number)
  const currentTotalMin = now.getHours() * 60 + now.getMinutes()
  return currentTotalMin >= startHour * 60 + startMin && currentTotalMin < endHour * 60 + endMin
}

export function Schedule() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)
  const { t, language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  const scrollToSpeaker = () => {
    document.getElementById('speakers')?.scrollIntoView({ behavior: 'smooth' })
  }

  const currentDay = scheduleData[selectedDay]

  return (
    <section id="schedule" className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      <div className={cn("absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full blur-3xl transition-all duration-1000 opacity-30", currentDay.bgGlow)} />
      <div className={cn("absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-3xl transition-all duration-1000 opacity-20", currentDay.bgGlow)} />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30 animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-cyan/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <CalendarDays className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">{t.schedule.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {t.schedule.title}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">{t.schedule.description}</p>
        </div>

        {/* Day Selector - Desktop */}
        <div className="hidden lg:flex justify-center gap-3 mb-16">
          {scheduleData.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(index)}
              className={cn(
                "relative group transition-all duration-500 ease-out",
                selectedDay === index ? "scale-110 z-10" : "scale-100 hover:scale-105"
              )}
            >
              <div className={cn(
                "relative w-28 h-36 rounded-3xl overflow-hidden transition-all duration-500",
                selectedDay === index 
                  ? `bg-gradient-to-br ${day.gradient} shadow-2xl shadow-primary/25` 
                  : "bg-card/80 backdrop-blur-md border border-border/50 hover:border-primary/30"
              )}>
                {/* Shine effect */}
                {selectedDay === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                )}
                
                <div className="relative h-full flex flex-col items-center justify-center p-4">
                  <span className="text-3xl mb-2">{day.emoji}</span>
                  <span className={cn(
                    "text-3xl font-black",
                    selectedDay === index ? "text-white" : "text-foreground"
                  )}>
                    {day.date}
                  </span>
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    selectedDay === index ? "text-white/80" : "text-muted-foreground"
                  )}>
                    {day.month}
                  </span>
                  <span className={cn(
                    "text-[10px] mt-1 uppercase tracking-wider",
                    selectedDay === index ? "text-white/70" : "text-muted-foreground/70"
                  )}>
                    {language === "en" ? day.dayNameEn.slice(0, 3) : day.dayNameFr.slice(0, 3)}
                  </span>
                </div>
              </div>
              
              {/* Active indicator */}
              {selectedDay === index && (
                <div className={cn("absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r", day.gradient)} />
              )}
            </button>
          ))}
        </div>

        {/* Day Selector - Mobile */}
        <div className="flex lg:hidden gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide snap-x snap-mandatory">
          {scheduleData.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(index)}
              className={cn(
                "snap-center flex-shrink-0 px-6 py-4 rounded-2xl transition-all duration-300 flex flex-col items-center min-w-[100px]",
                selectedDay === index
                  ? `bg-gradient-to-br ${day.gradient} text-white shadow-xl scale-105`
                  : "bg-card/60 backdrop-blur-md border border-border/50"
              )}
            >
              <span className="text-2xl mb-1">{day.emoji}</span>
              <span className="text-2xl font-black">{day.date}</span>
              <span className="text-[10px] uppercase tracking-wider opacity-80">
                {language === "en" ? day.dayNameEn.slice(0, 3) : day.dayNameFr.slice(0, 3)}
              </span>
            </button>
          ))}
        </div>

        {/* Day Theme Header */}
        <div className="text-center mb-10">
          <div className={cn(
            "inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r border-0 text-white font-semibold text-lg shadow-lg",
            currentDay.gradient
          )}>
            <span className="text-2xl">{currentDay.emoji}</span>
            <span>{language === "en" ? currentDay.theme : currentDay.themeFr}</span>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            {language === "en" 
              ? `${currentDay.dayNameEn}, December ${currentDay.date}, 2025`
              : `${currentDay.dayNameFr} ${currentDay.date} Décembre 2025`
            }
          </p>
        </div>

        {/* Timeline - Horizontal */}
        <div className="relative w-full">
          {/* Timeline Line - Horizontal */}
          <div className={cn(
            "absolute left-0 right-0 top-[30px] h-1 rounded-full bg-gradient-to-r opacity-30 hidden md:block",
            currentDay.gradient
          )} />

          <div className="overflow-x-auto pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
            <div className="flex gap-4 md:gap-6 w-max px-2">
              {currentDay.events.map((event, eventIndex) => {
                const isLive = mounted && isEventLive(selectedDay, event.time)
                const config = typeConfig[event.type]

                return (
                  <div
                    key={eventIndex}
                    className="relative flex flex-col items-center flex-shrink-0"
                    onMouseEnter={() => setHoveredEvent(eventIndex)}
                    onMouseLeave={() => setHoveredEvent(null)}
                  >
                    {/* Timeline Node */}
                    <div className={cn(
                      "z-10 transition-all duration-300 mb-3",
                      hoveredEvent === eventIndex ? "scale-110" : "scale-100"
                    )}>
                      <div className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-lg md:text-xl shadow-lg border-4 border-background transition-all duration-300",
                        isLive 
                          ? "bg-red-500 animate-pulse ring-4 ring-red-500/30" 
                          : `bg-gradient-to-br ${config.gradient}`,
                        hoveredEvent === eventIndex && "shadow-xl"
                      )}>
                        {event.icon}
                      </div>
                    </div>

                    {/* Content Card */}
                    <Card className={cn(
                      "w-[280px] md:w-[320px] overflow-hidden transition-all duration-500 group border-border/30",
                      "bg-card/80 backdrop-blur-xl hover:bg-card/90",
                      hoveredEvent === eventIndex && "shadow-2xl scale-[1.02] border-primary/30",
                      isLive && "ring-2 ring-red-500/50 bg-red-500/5"
                    )}>
                      <CardContent className="p-4">
                        {/* Time & Type */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                            <Clock className="w-4 h-4 text-primary" />
                            {event.time}
                          </div>
                          {isLive && (
                            <Badge className="bg-red-500 text-white border-0 animate-pulse text-xs">
                              <Radio className="w-3 h-3 mr-1" />
                              LIVE
                            </Badge>
                          )}
                        </div>

                        {/* Type Badge */}
                        <Badge className={cn("border-0 text-white text-xs mb-3", `bg-gradient-to-r ${config.gradient}`)}>
                          {config.icon}
                          <span className="ml-1">{language === "en" ? config.label : config.labelFr}</span>
                        </Badge>

                        {/* Title */}
                        <h4 className="text-sm md:text-base font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug min-h-[48px] md:min-h-[56px]" title={language === "en" ? event.titleEn : event.titleFr}>
                          {language === "en" ? event.titleEn : event.titleFr}
                        </h4>

                        {/* Opening Speakers List */}
                        {event.openingSpeakers && (
                          <div className="mb-3 p-2 rounded-lg bg-primary/5 border border-primary/10">
                            <p className="text-xs font-semibold text-primary mb-1.5">{language === "en" ? "Speakers:" : "Intervenants :"}</p>
                            <ul className="space-y-1">
                              {event.openingSpeakers.map((speaker: string, idx: number) => (
                                <li key={idx} className="text-xs text-muted-foreground flex items-center gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-primary/60" />
                                  {speaker}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        
                        {/* Speaker */}
                        {event.speaker && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); scrollToSpeaker() }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-cyan/10 hover:from-primary/20 hover:to-cyan/20 transition-all border border-primary/20 group/speaker w-full"
                          >
                            {(() => {
                              const info = getSpeakerInfo(event.speaker)
                              if (info?.image) {
                                return (
                                  <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover/speaker:ring-primary/50 transition-all shrink-0">
                                    <Image src={info.image} alt={event.speaker} width={24} height={24} className="w-full h-full object-cover" />
                                  </div>
                                )
                              }
                              if (info?.initials) {
                                return (
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center shrink-0">
                                    <span className="text-[9px] font-bold text-white">{info.initials}</span>
                                  </div>
                                )
                              }
                              return <User className="w-4 h-4 text-primary shrink-0" />
                            })()}
                            <span className="text-xs font-semibold text-primary group-hover/speaker:underline truncate">
                              {event.speaker.split(" (")[0]}
                            </span>
                            <ChevronRight className="w-3 h-3 text-primary group-hover/speaker:translate-x-0.5 transition-transform ml-auto shrink-0" />
                          </button>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Scroll hint */}
          <div className="flex justify-center mt-2 gap-2">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="animate-pulse">👉</span>
              {language === "en" ? "Swipe to see more" : "Glisser pour voir plus"}
            </span>
          </div>
        </div>

{/* Quick Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { value: "6", label: language === "en" ? "Days" : "Jours", gradient: "from-blue-500 to-cyan-500", emoji: "📅" },
            { value: "12", label: language === "en" ? "Sessions" : "Sessions", gradient: "from-violet-500 to-purple-500", emoji: "🎙️" },
            { value: "6", label: language === "en" ? "Workshops" : "Ateliers", gradient: "from-emerald-500 to-teal-500", emoji: "🔧" },
            { value: "12", label: "Speakers", gradient: "from-rose-500 to-pink-500", emoji: "👨‍🏫" },
          ].map((stat, i) => (
            <Card key={i} className="bg-card/60 backdrop-blur-md border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardContent className="p-6 text-center relative">
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br", stat.gradient)} />
                <div className="text-4xl mb-2">{stat.emoji}</div>
                <div className="text-4xl font-black text-foreground group-hover:text-primary transition-colors">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className={cn(
            "max-w-2xl mx-auto overflow-hidden border-0",
            "bg-gradient-to-r", currentDay.gradient
          )}>
            <CardContent className="p-8 md:p-10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CalendarDays className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                  {language === "en" ? "Join Us at ISAS 2025!" : "Rejoignez ISAS 2025 !"}
                </h3>
                <p className="text-white/80 mb-6 text-lg">
                  {language === "en" 
                    ? "December 8-12, 2025 • FSA Agadir • Free Registration" 
                    : "8-12 Décembre 2025 • FSA Agadir • Inscription Gratuite"
                  }
                </p>
                <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90 font-bold text-lg px-8 shadow-xl">
                  <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                    {language === "en" ? "Register Now" : "S'inscrire Maintenant"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
