
import { HeroSection } from "./components/hero-section"
import { WaitlistForm } from "./components/waitlist-form"
import { FeaturesSection } from "./components/features-section"

function App() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <div className="relative z-10 -mt-10 px-6">
        <WaitlistForm />
      </div>
      <FeaturesSection />
    </main>
  )
}

export default App