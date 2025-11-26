"use client"

import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={cn("flex items-center gap-1 p-1 rounded-lg bg-secondary/50 border border-border", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("fr")}
        className={cn(
          "h-8 px-3 text-xs font-medium transition-all",
          language === "fr"
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary",
        )}
      >
        FR
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("en")}
        className={cn(
          "h-8 px-3 text-xs font-medium transition-all",
          language === "en"
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary",
        )}
      >
        EN
      </Button>
    </div>
  )
}
