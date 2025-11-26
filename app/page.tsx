import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { WhyAttend } from "@/components/why-attend"
import { Topics } from "@/components/topics"
import { Schedule } from "@/components/schedule"
import { Speakers } from "@/components/speakers"
import { FAQ } from "@/components/faq"
import { Registration } from "@/components/registration"
import { Organizers } from "@/components/organizers"
import { Footer } from "@/components/footer"
import { FallingLeaves } from "@/components/falling-leaves"
import { FloatingCTA } from "@/components/floating-cta"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FallingLeaves />
      <Header />
      <Hero />
      <About />
      <WhyAttend />
      <Topics />
      <Schedule />
      <Speakers />
      <FAQ />
      <Registration />
      <Organizers />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
