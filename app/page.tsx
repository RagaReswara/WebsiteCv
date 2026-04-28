import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import About from '@/components/about'
import CompanyHistory from '@/components/company-history'
import Services from '@/components/services'
import Portfolio from '@/components/portfolio'
import WhyChooseUs from '@/components/why-choose-us'
import Testimonials from '@/components/testimonials'
import CompanyData from '@/components/company-data'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import SectionDivider from '@/components/section-divider'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <SectionDivider fromColor="#ffffff" toColor="#f1f5f9" />
      <CompanyHistory />
      <SectionDivider fromColor="#f1f5f9" toColor="#f8fafc" />
      <Services />
      <Portfolio />
      <WhyChooseUs />
      <SectionDivider fromColor="#ffffff" toColor="#f1f5f9" />
      <Testimonials />
      <CompanyData />
      <Contact />
      <SectionDivider fromColor="#ffffff" toColor="#f1f5f9" />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
