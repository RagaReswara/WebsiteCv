'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Proyek', href: '#proyek' },
  { label: 'Kontak', href: '#kontak' },
]

const serviceLinks = [
  'Pengaspalan Jalan',
  'Konstruksi Infrastruktur',
  'Survey & Perencanaan',
  'Area Parkir & Halaman',
  'Pemeliharaan Jalan',
  'Konstruksi Baja (Sampingan)',
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-slate-100">
      <div
        ref={contentRef}
        className="mx-auto max-w-7xl px-6 py-20 opacity-0 lg:px-8"
      >
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/images/Logo-CV-Efata.png"
                alt="Logo CV Efata Jaya Truss"
                width={32}
                height={32}
                className="h-24 w-60 object-contain"
              />
              {/* <span
                className="text-lg font-extrabold text-black"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Efata Jaya Truss
              </span> */}
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Kontraktor aspal terpercaya di Sleman, Yogyakarta. Spesialis
              pengaspalan jalan, konstruksi infrastruktur, dan pemeliharaan
              jalan berkualitas tinggi.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Navigasi
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-slate-700"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Layanan
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#layanan"
                    className="text-sm text-slate-400 transition-colors hover:text-slate-700"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Kontak
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <span className="text-sm leading-relaxed text-slate-400">
                  Jl. Agrowisata Jl. Klelen Raya, Kloler, Trimulyo, Kec. Sleman, Kabupaten Sleman, Daerah Istimewa Yogyakarta
                  <br />
                  DIY 55513
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <div className="flex flex-col gap-1 text-sm text-slate-400">
                  <a
                    href="https://wa.me/6285868426690"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-brand-orange hover:underline"
                  >
                    +62 858-6842-6690
                  </a>
                  <a
                    href="https://wa.me/6282227196772"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-brand-orange hover:underline"
                  >
                    +62 822-2719-6772
                  </a>
                </div>
              </li>
              <li>
                <a
                  href="mailto:info@efatajayatruss.com"
                  className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-brand-orange"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-orange" />
                  info@efatajayatruss.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            {'© 2026 CV Efata Jaya Truss. Seluruh hak dilindungi.'}
          </p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-orange-dark"
          >
            <Phone className="h-4 w-4" />
            Mulai Konsultasi
          </a>
        </div>
      </div>
    </footer>
  )
}
