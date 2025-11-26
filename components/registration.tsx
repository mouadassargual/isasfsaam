"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mail,
  MapPin,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Ticket,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Globe,
  AlertCircle,
  TrendingUp,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { GOOGLE_FORM_URL, GOOGLE_MAPS_EMBED_URL, PARTICIPANTS } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"

export function Registration() {
  const { t, language } = useLanguage()

  return (
    <section id="registration" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-chart-4/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Ticket className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{t.registration.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {t.registration.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.registration.description}</p>
          
          {/* Urgency Banner */}
          <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500 animate-pulse" />
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {language === "en" ? "Limited Spots Available!" : "Places Limitées !"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                {language === "en" ? `${PARTICIPANTS.registered}+ already registered` : `${PARTICIPANTS.registered}+ déjà inscrits`}
              </Badge>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20">
                {language === "en" ? `Only ${PARTICIPANTS.maxCapacity - PARTICIPANTS.registered} spots left` : `Plus que ${PARTICIPANTS.maxCapacity - PARTICIPANTS.registered} places`}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left: CTA Card */}
          <div className="space-y-6">
            {/* Main CTA Card */}
            <Card className="bg-gradient-to-br from-primary/20 via-card to-card border-primary/30 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <CardContent className="p-8 md:p-10 relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{t.registration.cta.title}</h3>
                    <p className="text-sm text-muted-foreground">{t.registration.cta.subtitle}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8 leading-relaxed">{t.registration.cta.description}</p>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group"
                >
                  <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-5 h-5 mr-2" />
                    {t.registration.cta.button}
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">{t.registration.cta.redirect}</p>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  {t.registration.benefits.title}
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {t.registration.benefits.items.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Info Cards */}
          <div className="space-y-4">
            {/* Event Info */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {t.registration.info.title}
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t.registration.info.date}</p>
                      <p className="text-muted-foreground">{t.registration.info.dateValue}</p>
                      <p className="text-xs text-primary mt-1">{t.registration.info.dateSub}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t.registration.info.time}</p>
                      <p className="text-muted-foreground">{t.registration.info.timeValue}</p>
                      <p className="text-xs text-primary mt-1">{t.registration.info.timeSub}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t.registration.info.location}</p>
                      <p className="text-muted-foreground">{t.registration.info.locationValue}</p>
                      <p className="text-xs text-primary mt-1">{t.registration.info.locationSub}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Price */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-medium text-foreground mb-1">{t.registration.info.contact}</p>
                  <a
                    href="mailto:isasautumnschool@gmail.com"
                    className="text-sm text-primary hover:underline break-all"
                  >
                    isasautumnschool@gmail.com
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500/10 to-card border-emerald-500/20">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-emerald-400" />
                  </div>
                  <p className="font-medium text-foreground mb-1">{t.registration.info.price}</p>
                  <p className="text-2xl font-bold text-emerald-400">{t.registration.info.priceValue}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.registration.info.priceSub}</p>
                </CardContent>
              </Card>
            </div>

            {/* Secondary CTA */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full h-14 text-base border-primary/30 hover:bg-primary/10 group bg-transparent"
            >
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                {t.registration.secondaryCta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12 max-w-6xl mx-auto">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t.registration.info.location}</h3>
                    <p className="text-sm text-muted-foreground">{t.registration.info.locationValue} - {t.registration.info.locationSub}</p>
                  </div>
                </div>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src={GOOGLE_MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FSA Ait Melloul Location"
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
