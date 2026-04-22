import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import About from '@/components/about'
import CompanyHistory from '@/components/company-history'
import Services from '@/components/services'
import WorkExperience from '@/components/work-experience'
import Portfolio from '@/components/portfolio'
import WhyChooseUs from '@/components/why-choose-us'
import Testimonials from '@/components/testimonials'
import CompanyData from '@/components/company-data'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <CompanyHistory />
      <Services />
      <WorkExperience />
      <Portfolio />
      <WhyChooseUs />
      <Testimonials />
      <CompanyData />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
