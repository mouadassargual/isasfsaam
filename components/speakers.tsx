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
    name: "Dr. Ahmed Benali",
    roleEn: "AI & Deep Learning Expert",
    roleFr: "Expert en IA & Deep Learning",
    organization: "Ibn Zohr University",
    expertise: ["AI", "Deep Learning", "Computer Vision"],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    gradient: "from-primary to-orange-500",
    confirmed: true,
  },
  {
    name: "Prof. Fatima Zahra Alaoui",
    roleEn: "IoT & Embedded Systems",
    roleFr: "IoT & Systèmes Embarqués",
    organization: "IMIS Research Lab",
    expertise: ["IoT", "Embedded", "Sensors"],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    gradient: "from-cyan to-blue-500",
    confirmed: true,
  },
  {
    name: "Ing. Youssef Amrani",
    roleEn: "BIM/VR Architect",
    roleFr: "Architecte BIM/VR",
    organization: "Tech Solutions Morocco",
    expertise: ["BIM", "VR/AR", "3D Modeling"],
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    gradient: "from-violet-500 to-purple-600",
    confirmed: true,
  },
  {
    name: "Dr. Samira Ouali",
    roleEn: "Machine Learning Researcher",
    roleFr: "Chercheuse en Machine Learning",
    organization: "Data Horizon Club",
    expertise: ["ML", "Data Science", "Python"],
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    gradient: "from-emerald-500 to-teal-600",
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
                    <div className="w-full h-full rounded-2xl overflow-hidden">
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
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
