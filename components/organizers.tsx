"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const organizers = [
  {
    name: "Departement GISI",
    fullName: "Genie Informatique et Systemes Intelligents",
    descriptionFr: "Departement organisateur principal",
    descriptionEn: "Main organizing department",
    initials: "GISI",
  },
  {
    name: "Laboratoire IMIS",
    fullName: "Laboratoire de Recherche IMIS",
    descriptionFr: "Laboratoire de recherche",
    descriptionEn: "Research Laboratory",
    initials: "IMIS",
  },
  {
    name: "Data Horizon Club",
    fullName: "Club de Data Science",
    descriptionFr: "Club de science des donnees",
    descriptionEn: "Data Science Club",
    initials: "DH",
  },
  {
    name: "Artificielle Intelligence Club",
    fullName: "Club d'Intelligence Artificielle",
    descriptionFr: "Club IA",
    descriptionEn: "AI Club",
    initials: "AI",
  },
]

const sponsors = [
  {
    name: "Universite Ibn Zohr",
    initials: "UIZ",
    tier: "platinum",
    logo: "https://www.emploi-public.ma/backoffice/files/images/administrations/logo-385.png",
  },
  {
    name: "Faculte des Sciences Appliquees Ait Melloul",
    initials: "FSA",
    tier: "platinum",
    logo: "http://fsa-am.uiz.ac.ma/storage/media/stand_fr_dark.png",
  },
]

export function Organizers() {
  const { t, language } = useLanguage()

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Organizers */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{t.organizers.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{t.organizers.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.organizers.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {organizers.map((org) => (
            <Card
              key={org.name}
              className="bg-card border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:scale-105 transition-all">
                  <span className="text-xl font-bold text-primary">{org.initials}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{org.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? org.descriptionEn : org.descriptionFr}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sponsors */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-4/10 border border-chart-4/20 mb-4">
            <Users2 className="w-4 h-4 text-chart-4" />
            <span className="text-chart-4 text-sm font-medium">{t.organizers.sponsorsBadge}</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{t.organizers.sponsorsTitle}</h3>
          <p className="text-muted-foreground text-sm">{t.organizers.sponsorsDesc}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 md:h-20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-full w-auto max-w-[200px] md:max-w-[250px] object-contain dark:brightness-0 dark:invert"
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground text-center">{sponsor.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
