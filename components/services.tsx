'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  CheckCircle,
  Triangle,
  Shield,
  Pencil,
  Factory,
  Wrench,
  Settings,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Triangle,
    title: 'Pengaspalan Jalan',
    description:
      'Pengerjaan aspal hotmix dan penetrasi untuk jalan raya, jalan desa, dan akses lingkungan dengan kualitas terjamin.',
    features: ['Aspal Hotmix AC-WC', 'Aspal Penetrasi', 'Prime Coat & Tack Coat'],
  },
  {
    icon: Shield,
    title: 'Konstruksi Infrastruktur',
    description:
      'Pembangunan infrastruktur jalan dari nol, termasuk pondasi, base course, hingga lapisan aspal akhir.',
    features: ['Galian & Timbunan', 'Lapis Pondasi', 'Perkerasan Lentur'],
  },
  {
    icon: Pencil,
    title: 'Survey & Perencanaan',
    description:
      'Tim surveyor kami melakukan perencanaan proyek jalan dengan hasil pengukuran dan desain yang akurat.',
    features: ['Survei Topografi', 'Gambar Kerja Detail', 'RAB & Estimasi Biaya'],
  },
  {
    icon: Factory,
    title: 'Area Parkir & Halaman',
    description:
      'Pengaspalan area parkir, halaman pabrik, dan kawasan industri dengan permukaan rata dan kuat.',
    features: ['Parkir Hotmix', 'Paving Block', 'Sistem Drainase'],
  },
  {
    icon: Wrench,
    title: 'Pemeliharaan Jalan',
    description:
      'Layanan perbaikan dan overlay aspal untuk memulihkan kondisi jalan yang rusak atau berlubang.',
    features: ['Patching & Overlay', 'Penambalan Lubang', 'Resurfacing'],
  },
  {
    icon: Settings,
    title: 'Konstruksi Baja (Sampingan)',
    description:
      'Layanan tambahan meliputi fabrikasi dan instalasi rangka baja ringan untuk kebutuhan atap bangunan.',
    features: ['Truss Baja Ringan', 'Rangka Galvanis', 'Instalasi Profesional'],
  },
]

export default function Services() {
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
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
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
      id="layanan"
      ref={sectionRef}
      className="bg-slate-50 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="mx-auto max-w-2xl text-center opacity-0">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Layanan Kami
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Layanan Konstruksi Aspal Lengkap
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-500">
            Dari survei dan perencanaan hingga pengerjaan akhir, kami menyediakan
            layanan end-to-end untuk kebutuhan konstruksi aspal Anda.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative rounded-2xl border border-slate-100 bg-slate-100 p-7 opacity-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 transition-colors group-hover:bg-brand-orange group-hover:[&_svg]:text-white">
                  <Icon
                    className="h-6 w-6 text-brand-orange transition-colors"
                    strokeWidth={1.75}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold text-slate-900"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-justify text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>

                {/* Feature list */}
                <ul className="mt-5 flex flex-col gap-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-brand-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
