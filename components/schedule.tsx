"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CalendarDays, Clock, MapPin, ChevronRight, Coffee, Utensils, User, Filter, X } from "lucide-react"
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
  // Extract clean name without organization
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

const typeConfig: Record<string, { bg: string; text: string; icon?: React.ReactNode }> = {
  ceremony: { bg: "bg-primary/10", text: "text-primary" },
  keynote: { bg: "bg-cyan-500/10", text: "text-cyan-400" },
  conference: { bg: "bg-blue-500/10", text: "text-blue-400" },
  workshop: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  networking: { bg: "bg-violet-500/10", text: "text-violet-400" },
  lunch: { bg: "bg-chart-4/10", text: "text-chart-4" },
  hackathon: { bg: "bg-rose-500/10", text: "text-rose-400" },
  tba: { bg: "bg-muted", text: "text-muted-foreground" },
}

export function Schedule() {
  const [activeDay, setActiveDay] = useState(0)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const { t, language } = useLanguage()

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

  return (
    <section id="schedule" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{t.schedule.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{t.schedule.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.schedule.description}</p>
        </div>

        {/* Day tabs - Horizontal scroll on mobile */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {scheduleData.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(index)}
              className={cn(
                "flex-shrink-0 px-5 py-4 rounded-xl transition-all duration-300 flex flex-col items-center min-w-[110px] relative group",
                activeDay === index
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="text-xs font-medium opacity-70 mb-1">
                {language === "en" ? day.dayNameEn : day.dayNameFr}
              </span>
              <span className="text-xl font-bold">
                {language === "en" ? day.dateEn.split(" ")[1] : day.date.split(" ")[0]}
              </span>
              <span className="text-xs">{language === "en" ? day.dateEn.split(" ")[0] : day.date.split(" ")[1]}</span>
              {activeDay === index && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Active day content */}
        <div className="max-w-4xl mx-auto">
          {/* Day header */}
          <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-card border border-border">
            <div className={cn("w-2 h-12 rounded-full", scheduleData[activeDay].color)} />
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {language === "en" ? `Day ${scheduleData[activeDay].day}` : `Jour ${scheduleData[activeDay].day}`}
              </h3>
              <p className="text-primary font-medium">
                {language === "en" ? scheduleData[activeDay].theme : scheduleData[activeDay].themeFr}
              </p>
            </div>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground mr-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "Filter:" : "Filtrer:"}</span>
            </div>
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(null)}
              className="h-8 text-xs"
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
                  "h-8 text-xs gap-1.5",
                  activeFilter === type && typeConfig[type]?.bg
                )}
              >
                {getTypeLabel(type)}
              </Button>
            ))}
            {activeFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilter(null)}
                className="h-8 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3 mr-1" />
                {language === "en" ? "Clear" : "Effacer"}
              </Button>
            )}
          </div>

          {/* Events */}
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {language === "en" ? "No events match this filter for this day." : "Aucun événement ne correspond à ce filtre pour ce jour."}
              </div>
            ) : filteredEvents.map((event, index) => (
              <Card
                key={index}
                className={cn(
                  "bg-card border-border hover:border-primary/30 transition-all duration-300 overflow-hidden group",
                  event.type === "lunch" && "opacity-75",
                )}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Time column */}
                    <div className="md:w-44 p-5 md:p-6 bg-secondary/30 border-b md:border-b-0 md:border-r border-border flex md:flex-col items-center md:items-start justify-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-foreground">{event.time}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {language === "en" ? event.titleEn : event.titleFr}
                        </h4>
                        <div className="flex items-center gap-4 text-muted-foreground text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          {/* Speaker with photo */}
                          {event.speaker && (
                            <button
                              onClick={() => scrollToSpeaker(event.speaker!)}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group/speaker cursor-pointer"
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
                      <Badge
                        className={cn("shrink-0 border-0", typeConfig[event.type].bg, typeConfig[event.type].text)}
                      >
                        {event.type === "lunch" && <Utensils className="w-3 h-3 mr-1" />}
                        {event.type === "networking" && <Coffee className="w-3 h-3 mr-1" />}
                        {getTypeLabel(event.type)}
                      </Badge>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex items-center px-4">
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mini calendar */}
        <div className="mt-16 grid grid-cols-5 gap-2 max-w-3xl mx-auto">
          {scheduleData.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(index)}
              className={cn(
                "p-3 md:p-4 rounded-xl border transition-all text-center",
                activeDay === index
                  ? "bg-primary/10 border-primary/30"
                  : "bg-card border-border hover:border-primary/20",
              )}
            >
              <div className={cn("w-2 h-2 rounded-full mx-auto mb-2", day.color)} />
              <div className="text-xs text-muted-foreground">
                {language === "en" ? day.dayNameEn.slice(0, 3) : day.dayNameFr.slice(0, 3)}
              </div>
              <div className="font-bold text-foreground text-sm">
                {language === "en" ? day.dateEn.split(" ")[1] : day.date.split(" ")[0]}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
