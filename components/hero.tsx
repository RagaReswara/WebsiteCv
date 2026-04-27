'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background image
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Text reveal timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        badgeRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          headlineRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=0.4'
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0, transformOrigin: 'left' },
          { scaleX: 1, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          statsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.3'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="beranda"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div ref={bgRef} className="absolute inset-0 -top-10 -bottom-10">
        <Image
          src="/images/hero-bg.jpg"
          alt="Proyek pengaspalan jalan"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/90 via-brand-brown/70 to-brand-brown/30" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:px-8 lg:pt-44">
        <div className="max-w-4xl">
          {/* Badge */}
          <div ref={badgeRef} className="mb-6 opacity-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
              General Contractor & Trading
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl font-extrabold leading-tight tracking-tight text-white opacity-0 sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-brand-orange">Satu Mitra</span>{' '}
            untuk Semua Kebutuhan Proyek Anda
            <br />
            di Yogyakarta
          </h1>
        </div>

        {/* Separator Line */}
        <div
          ref={lineRef}
          className="mt-12 mb-8 h-px w-full bg-linear-to-r from-white/40 via-white/10 to-transparent opacity-0"
        />

        {/* Bottom Part */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">

          {/* Left Column (Stats & CTA) */}
          <div className="flex flex-col gap-10">
            {/* Stats */}
            <div
              ref={statsRef}
              className="flex flex-wrap items-center gap-10 opacity-0 lg:pt-2"
            >
              {[
                { value: '15+', label: 'Tahun Pengalaman' },
                { value: '500+', label: 'Proyek Selesai' },
                { value: '200+', label: 'Klien Puas' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-3xl font-extrabold text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-4 opacity-0"
            >
              <a
                href="#proyek"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById('proyek')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition-all hover:bg-brand-orange-dark hover:shadow-xl"
              >
                Lihat Proyek
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Hubungi Kami
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/30 p-1">
          <div className="h-1.5 w-1 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  )
}
