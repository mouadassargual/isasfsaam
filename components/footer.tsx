"use client"

import { Mail, MapPin, Phone, ExternalLink, ArrowUpRight, Instagram, Facebook, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/context"
import { GOOGLE_FORM_URL, SOCIAL_MEDIA } from "@/lib/constants"

export function Footer() {
  const { t, language } = useLanguage()

  const quickLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.topics, href: "#topics" },
    { label: t.nav.schedule, href: "#schedule" },
    { label: t.nav.speakers, href: "#speakers" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.register, href: "#registration" },
  ]

  const socialLinks = [
    { icon: Instagram, href: SOCIAL_MEDIA.instagram, label: "Instagram", color: "hover:text-pink-500" },
    { icon: Facebook, href: SOCIAL_MEDIA.facebook, label: "Facebook", color: "hover:text-blue-500" },
    { icon: Linkedin, href: SOCIAL_MEDIA.linkedin, label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Twitter, href: SOCIAL_MEDIA.twitter, label: "Twitter/X", color: "hover:text-sky-500" },
  ]

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden pt-12">
      {/* Background accent */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-gradient-to-br from-primary/5 to-cyan/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* CTA Banner */}
        <div className="mb-12">
          <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-cyan/20 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6 glow-gradient">
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">{t.footer.cta.title}</h3>
              <p className="text-muted-foreground text-sm sm:text-base">{t.footer.cta.description}</p>
            </div>
            <Button
              asChild
              size="lg"
              className="gradient-animated text-white hover:opacity-90 shrink-0 h-12 sm:h-14 px-6 sm:px-8 font-semibold shadow-lg group w-full sm:w-auto"
            >
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                {t.footer.cta.button}
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="#home" className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl gradient-animated flex items-center justify-center">
                  <span className="text-lg font-bold text-white">IS</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan rounded-md flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">AS</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-foreground leading-none">ISAS 2025</span>
                <span className="text-xs bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent font-medium">Autumn School</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.footer.brand}</p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground ${social.color} hover:bg-secondary transition-all hover:scale-110`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-emerald-400 text-xs font-medium">{t.footer.registrationOpen}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.footer.navigation}</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.footer.contact}</h4>
            <div className="space-y-4">
              <a href="mailto:isasautumnschool@gmail.com" className="flex items-center gap-3 text-sm group">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground group-hover:text-primary transition-colors break-all">
                  isasautumnschool@gmail.com
                </span>
              </a>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">
                  {t.footer.faculty}
                  <br />
                  Ait Melloul, Maroc
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">+212 5XX XXX XXX</span>
              </div>
            </div>
          </div>

          {/* Event info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.footer.event}</h4>
            <div className="p-5 rounded-xl bg-secondary/30 border border-border space-y-4">
              <div>
                <p className="text-lg font-bold text-foreground">9 - 13 December</p>
                <p className="text-primary font-semibold">2025</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">5 days</span>
                <span className="px-2 py-1 rounded-md bg-chart-4/10 text-chart-4 text-xs font-medium">Free</span>
              </div>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
              >
                {t.footer.registerLink}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.emploi-public.ma/backoffice/files/images/administrations/logo-385.png"
              alt="Université Ibn Zohr"
              className="h-12 md:h-14 w-auto object-contain dark:brightness-0 dark:invert opacity-70 hover:opacity-100 transition-opacity"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logofsaam.png"
              alt="FSA Ait Melloul"
              className="h-12 md:h-14 w-auto object-contain dark:brightness-0 dark:invert opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © 2025 Intelligent Systems Autumn School. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <a 
              href={SOCIAL_MEDIA.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Instagram className="w-4 h-4" />
              @isas.fsaam
            </a>
            <span className="text-border">•</span>
            <span className="text-sm text-muted-foreground">{t.footer.faculty}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
