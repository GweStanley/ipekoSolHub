import Hero from './components/Hero'
import Highlights from './components/Highlights'
import PortfolioPreview from './components/PortfolioPreview'
import MarketplacePreview from './components/MarketplacePreview'
import Testimonials from './components/Testimonials'

export default function HomePage() {

  return (
    <>

      <Hero />
<section
  id="highlights"
  className="highlights-section"
>
        <Highlights />

</section>

      <PortfolioPreview />

      <MarketplacePreview />

      <Testimonials />

    </>
  )
}