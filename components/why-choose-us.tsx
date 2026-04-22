'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Clock, BadgeCheck, Headphones } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Material Berkualitas',
    description:
      'Kami hanya menggunakan material aspal grade terbaik dengan standar SNI untuk daya tahan dan kerataan permukaan maksimal.',
  },
  {
    icon: Clock,
    title: 'Pengerjaan Cepat',
    description:
      'Proses mobilisasi alat berat dan pengerjaan terorganisir memastikan proyek aspal Anda selesai tepat waktu.',
  },
  {
    icon: BadgeCheck,
    title: 'Garansi Resmi',
    description:
      'Setiap proyek dilengkapi garansi resmi atas kualitas material aspal dan pengerjaan untuk ketenangan Anda.',
  },
  {
    icon: Headphones,
    title: 'Layanan Responsif',
    description:
      'Tim kami siap melayani konsultasi, survey lokasi, hingga after-sales support dengan respons cepat.',
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 60" stroke="white" strokeWidth="0.5" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="mx-auto max-w-2xl text-center opacity-0">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Keunggulan Kami
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-black sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mengapa Memilih Efata Jaya?
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-400">
            Kami berkomitmen memberikan yang terbaik dalam setiap aspek layanan
            konstruksi aspal dan infrastruktur jalan.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group rounded-2xl border border-white/10 bg-black/5 p-7 opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:bg-orange-400/20"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange shadow-lg shadow-brand-orange/20">
                  <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
                </div>
                <h3
                  className="text-lg font-bold text-black"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
