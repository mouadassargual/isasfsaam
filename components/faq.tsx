"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/context"
import { GOOGLE_FORM_URL } from "@/lib/constants"

export function FAQ() {
  const { t } = useLanguage()

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{t.faq.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{t.faq.title}</h2>
          <p className="text-muted-foreground text-lg">{t.faq.description}</p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {t.faq.questions.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:bg-primary/5 transition-all"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5 text-base font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{t.faq.contact.title}</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">{t.faq.contact.description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10 bg-transparent">
              <a href="mailto:isasautumnschool@gmail.com">{t.faq.contact.contactBtn}</a>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 group">
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                {t.faq.contact.registerBtn}
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
