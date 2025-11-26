"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Factory, Glasses, Sprout, Brain, Puzzle, ArrowUpRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"

export function Topics() {
  const { t } = useLanguage()

  const topics = [
    {
      icon: Factory,
      ...t.topics.items.industrial,
      gradient: "from-blue-500/20 to-primary/10",
      iconBg: "bg-blue-500/10 border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      icon: Glasses,
      ...t.topics.items.bim,
      gradient: "from-violet-500/20 to-primary/10",
      iconBg: "bg-violet-500/10 border-violet-500/20",
      iconColor: "text-violet-400",
    },
    {
      icon: Sprout,
      ...t.topics.items.iot,
      gradient: "from-emerald-500/20 to-primary/10",
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      icon: Brain,
      ...t.topics.items.ai,
      gradient: "from-primary/20 to-chart-4/10",
      iconBg: "bg-primary/10 border-primary/20",
      iconColor: "text-primary",
    },
    {
      icon: Puzzle,
      ...t.topics.items.hackathon,
      gradient: "from-rose-500/20 to-primary/10",
      iconBg: "bg-rose-500/10 border-rose-500/20",
      iconColor: "text-rose-400",
      featured: true,
    },
  ]

  return (
    <section id="topics" className="py-24 md:py-32 bg-secondary/20 relative overflow-hidden section-separator">
      {/* Background with tech gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-cyan/10 to-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{t.topics.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{t.topics.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.topics.description}</p>
        </div>

        {/* Topics Grid - Bento style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {topics.map((topic, index) => (
            <Card
              key={topic.title}
              className={cn(
                "glass-strong hover-lift card-shine transition-all duration-500 overflow-hidden group cursor-pointer relative",
                topic.featured && "md:col-span-2 lg:col-span-2",
                index === 0 && "md:row-span-2",
              )}
            >
              {/* Hover gradient */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  topic.gradient,
                )}
              />

              <CardContent
                className={cn(
                  "p-6 md:p-8 relative h-full flex flex-col",
                  topic.featured && "md:flex-row md:items-center md:gap-8",
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 border",
                    topic.iconBg,
                    topic.featured && "md:mb-0 md:shrink-0",
                  )}
                >
                  <topic.icon className={cn("w-8 h-8", topic.iconColor)} />
                </div>

                {/* Content */}
                <div className="relative flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3
                      className={cn(
                        "font-bold text-foreground",
                        index === 0 || topic.featured ? "text-2xl" : "text-xl",
                      )}
                    >
                      {topic.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                  </div>
                  <p
                    className={cn(
                      "text-muted-foreground leading-relaxed mb-5",
                      index === 0 || topic.featured ? "text-base" : "text-sm",
                    )}
                  >
                    {topic.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {topic.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-muted-foreground border border-border group-hover:border-primary/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
