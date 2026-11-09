import { About } from '../components/sections/About'
import { Differentials } from '../components/sections/Differentials'
import { Faq } from '../components/sections/Faq'
import { FinalCta } from '../components/sections/FinalCta'
import { Hero } from '../components/sections/Hero'
import { Intro } from '../components/sections/Intro'
import { Offer } from '../components/sections/Offer'
import { Process } from '../components/sections/Process'
import { Services } from '../components/sections/Services'
import { Solutions } from '../components/sections/Solutions'

export function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Solutions />
      <Differentials />
      <Process />
      <Offer />
      <About />
      <Faq />
      <FinalCta />
    </>
  )
}
