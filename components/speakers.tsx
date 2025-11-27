"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const speakers = [
  {
    name: "Ismail Saddik",
    roleEn: "Building a Project from Scratch",
    roleFr: "Construire un projet de zéro",
    organization: "Keynote Speaker",
    expertise: ["Project Management", "Entrepreneurship"],
    image: "/speakrs/ismail.png",
    gradient: "from-primary to-orange-500",
    confirmed: true,
  },
  {
    name: "Mohamed El Habib Abaakil",
    roleEn: "Industrial Smart Solutions",
    roleFr: "Solutions Intelligentes Industrielles",
    organization: "PPRIME Institute",
    expertise: ["IoT", "Industry 4.0", "Smart Systems"],
    image: "/speakrs/Mohamed-El-Habib-Abaakil.jpeg",
    gradient: "from-cyan to-blue-500",
    confirmed: true,
  },
  {
    name: "Zakaria El Khadiri",
    roleEn: "Engineering ADAS: Vehicle Autonomy",
    roleFr: "Ingénierie ADAS: Autonomie Véhicule",
    organization: "Automotive Expert",
    expertise: ["ADAS", "Autonomous Vehicles", "AI"],
    image: null,
    initials: "ZK",
    gradient: "from-violet-500 to-purple-600",
    confirmed: true,
  },
  {
    name: "Ismail Khoubbaz",
    roleEn: "BIM & Virtual Reality",
    roleFr: "BIM & Réalité Virtuelle",
    organization: "BIM-R",
    expertise: ["BIM", "VR/AR", "Digital Twins"],
    image: "/speakrs/Ismail-Khoubbaz.jpeg",
    gradient: "from-emerald-500 to-teal-600",
    confirmed: true,
  },
  {
    name: "Amine Saddik",
    roleEn: "Robotic Precision Agriculture",
    roleFr: "Agriculture de Précision Robotisée",
    organization: "Robotics Expert",
    expertise: ["Robotics", "Drones", "Agriculture"],
    image: "/speakrs/amine.png",
    gradient: "from-amber-500 to-orange-600",
    confirmed: true,
  },
  {
    name: "Nabil Ayoub",
    roleEn: "Open-Source Data Pipeline",
    roleFr: "Pipeline de Données Open-Source",
    organization: "AgriData",
    expertise: ["Data Engineering", "Python", "Metabase"],
    image: "/speakrs/nabil.png",
    gradient: "from-blue-500 to-indigo-600",
    confirmed: true,
  },
  {
    name: "Anas Bennis",
    roleEn: "Data-Driven Agriculture",
    roleFr: "Agriculture Data-Driven",
    organization: "ENA Meknès",
    expertise: ["Data Science", "Agriculture", "AI"],
    image: "/speakrs/bennis.jpeg",
    gradient: "from-green-500 to-emerald-600",
    confirmed: true,
  },
  {
    name: "Zakaria Oulad",
    roleEn: "Systems Integration Hackathon",
    roleFr: "Hackathon Intégration Systèmes",
    organization: "MOZA Partners",
    expertise: ["Hackathon", "IoT", "Integration"],
    image: "/speakrs/zakaria-oulad.png",
    gradient: "from-rose-500 to-pink-600",
    confirmed: true,
  },
]

export function Speakers() {
  const { t, language } = useLanguage()

  return (
    <section id="speakers" className="py-20 md:py-28 bg-gradient-to-b from-secondary/30 via-secondary/10 to-background relative overflow-hidden section-separator">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-orange-500/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-gradient-to-br from-cyan/10 to-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{t.speakers.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t.speakers.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">{t.speakers.description}</p>
        </div>

        {/* Speakers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-12">
          {speakers.map((speaker) => (
            <Card
              key={speaker.name}
              className="glass-strong hover-lift card-shine transition-all duration-500 group overflow-hidden"
            >
              <CardContent className="p-6 text-center">
                {/* Photo with gradient border */}
                <div className="relative mb-5">
                  <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${speaker.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-background flex items-center justify-center">
                      {speaker.image ? (
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-foreground">{speaker.initials}</span>
                      )}
                    </div>
                  </div>
                  {/* Confirmed badge */}
                  {speaker.confirmed && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      <Badge className="bg-emerald-500 text-white border-0 text-[10px] shadow-md">
                        ✓ Confirmed
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-foreground mb-1">{speaker.name}</h3>
                <p className="text-primary text-sm font-medium mb-1">
                  {language === "en" ? speaker.roleEn : speaker.roleFr}
                </p>
                <p className="text-muted-foreground text-xs mb-4">{speaker.organization}</p>

                {/* Expertise tags */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {speaker.expertise.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-secondary/50 text-muted-foreground border-border text-[10px] px-2 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More speakers coming soon */}
        <Card className="bg-gradient-to-r from-primary/5 via-card to-cyan/5 border-dashed border-primary/30 max-w-2xl mx-auto glass">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t.speakers.comingSoon}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t.speakers.comingSoonDesc}</p>
            <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
              <Link href="#registration">
                {language === "en" ? "Get Notified" : "Être notifié"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
