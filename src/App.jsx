import Scene from './components/scene/Scene'
import Navbar from './components/ui/Navbar'
import LoadingScreen from './components/ui/LoadingScreen'
import HeroSection from './components/layout/HeroSection'
import FeaturesSection from './components/layout/FeaturesSection'
import ShowcaseSection from './components/layout/ShowcaseSection'
import TechSection from './components/layout/TechSection'
import FooterSection from './components/layout/FooterSection'
import BackgroundGradient from './components/effects/BackgroundGradient'
import ScrollProgress from './components/effects/ScrollProgress'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <LoadingScreen />
      <Scene />
      <BackgroundGradient />
      <ScrollProgress />
      <div className="vignette" />

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <TechSection />
        <FooterSection />
      </div>
    </>
  )
}
