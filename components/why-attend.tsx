"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  GraduationCap, 
  Users, 
  Award, 
  Briefcase, 
  CheckCircle2,
  Sparkles,
  Target,
  Rocket
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const whyAttendData = {
  en: {
    badge: "Why Attend?",
    title: "Transform Your Career in 5 Days",
    subtitle: "Join hundreds of students, researchers, and professionals for an immersive learning experience",
    reasons: [
      {
        icon: GraduationCap,
        title: "Hands-on Learning",
        description: "Practical workshops with real-world projects in AI, IoT, BIM, and more",
        highlight: "Learn by doing",
      },
      {
        icon: Users,
        title: "Expert Network",
        description: "Connect with industry leaders, researchers, and like-minded professionals",
        highlight: "Build connections",
      },
      {
        icon: Award,
        title: "Official Certificate",
        description: "Receive a recognized certificate of participation from Ibn Zohr University",
        highlight: "Boost your CV",
      },
      {
        icon: Briefcase,
        title: "Career Opportunities",
        description: "Discover internship and job opportunities with our partner companies",
        highlight: "Launch your career",
      },
    ],
    benefits: [
      "Access to all conferences and workshops",
      "Participation in the Systems Integration Hackathon",
      "Exclusive course materials and resources",
      "Networking sessions with industry experts",
      "Welcome kit with goodies",
      "Lunch and refreshments included",
    ],
    cta: "All this for FREE",
  },
  fr: {
    badge: "Pourquoi Participer ?",
    title: "Transformez Votre Carrière en 5 Jours",
    subtitle: "Rejoignez des centaines d'étudiants, chercheurs et professionnels pour une expérience immersive",
    reasons: [
      {
        icon: GraduationCap,
        title: "Apprentissage Pratique",
        description: "Ateliers pratiques avec des projets réels en IA, IoT, BIM et plus encore",
        highlight: "Apprenez en faisant",
      },
      {
        icon: Users,
        title: "Réseau d'Experts",
        description: "Connectez-vous avec des leaders de l'industrie, chercheurs et professionnels",
        highlight: "Créez des liens",
      },
      {
        icon: Award,
        title: "Certificat Officiel",
        description: "Recevez un certificat de participation reconnu de l'Université Ibn Zohr",
        highlight: "Boostez votre CV",
      },
      {
        icon: Briefcase,
        title: "Opportunités de Carrière",
        description: "Découvrez des stages et emplois avec nos entreprises partenaires",
        highlight: "Lancez votre carrière",
      },
    ],
    benefits: [
      "Accès à toutes les conférences et ateliers",
      "Participation au Hackathon d'Intégration Systèmes",
      "Supports de cours et ressources exclusives",
      "Sessions de networking avec des experts",
      "Kit de bienvenue avec goodies",
      "Déjeuner et rafraîchissements inclus",
    ],
    cta: "Tout cela GRATUITEMENT",
  },
}

export function WhyAttend() {
  const { language } = useLanguage()
  const content = whyAttendData[language]

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-chart-4/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{content.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {content.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            {content.subtitle}
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {content.reasons.map((reason, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-6 relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {reason.highlight}
                </span>
                <h3 className="text-lg font-bold text-foreground mt-1 mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits List */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">What's Included</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {content.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center pt-4 border-t border-border">
                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Rocket className="w-5 h-5 text-emerald-500" />
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {content.cta}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
