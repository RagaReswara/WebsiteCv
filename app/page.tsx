import dynamic from 'next/dynamic'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import SectionDivider from '@/components/section-divider'

// Lazy load components that are below the fold to drastically reduce initial JS payload
const About = dynamic(() => import('@/components/about'))
const CompanyHistory = dynamic(() => import('@/components/company-history'))
const Services = dynamic(() => import('@/components/services'))
const EquipmentShowcase = dynamic(() => import('@/components/equipment-showcase'))
const Portfolio = dynamic(() => import('@/components/portfolio'))
const WhyChooseUs = dynamic(() => import('@/components/why-choose-us'))
const Testimonials = dynamic(() => import('@/components/testimonials'))
const CompanyData = dynamic(() => import('@/components/company-data'))
const Contact = dynamic(() => import('@/components/contact'))
const Footer = dynamic(() => import('@/components/footer'))
const WhatsAppButton = dynamic(() => import('@/components/whatsapp-button'))

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
      <SectionDivider fromColor="#f8fafc" toColor="#ffffff" />
      <EquipmentShowcase />
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
