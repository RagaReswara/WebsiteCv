'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Route, Waves, Building2, Triangle, Wrench, Truck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Route,
    title: 'Pengaspalan & Jalan Raya',
    description: 'Pengerjaan aspal hotmix dan penetrasi untuk jalan raya, jalan desa, dan akses lingkungan dengan kualitas material terjamin.',
    tags: ['Aspal Hotmix', 'Aspal Penetrasi', 'Corblok'],
  },
  {
    icon: Waves,
    title: 'Talud, Irigasi & Drainase',
    description: 'Perlindungan lahan dan pengelolaan air yang handal melalui pembangunan talud kokoh, irigasi fungsional, dan sistem drainase.',
    tags: ['Pembangunan Talud', 'Irigasi', 'Sistem Drainase'],
  },
  {
    icon: Building2,
    title: 'Gedung & Area Komersial',
    description: 'Pembangunan infrastruktur bangunan seperti rumah tinggal, gudang, gedung pertemuan, serta area parkir paving block dan pagar.',
    tags: ['Rumah & Gedung', 'Paving Parkir', 'Pagar Komersial'],
  },
  {
    icon: Triangle,
    title: 'Konstruksi Atap & Baja Ringan',
    description: 'Layanan pemasangan atap, kerangka baja ringan galvanis, dan plafon PVC dengan tingkat presisi tinggi dan hasil estetis.',
    tags: ['Truss Baja Ringan', 'Roof Covering', 'Plafon PVC'],
  },
  {
    icon: Wrench,
    title: 'Pemeliharaan & Perencanaan',
    description: 'Layanan end-to-end mulai dari penyusunan RAB & gambar desain, hingga perbaikan dan perawatan jalan (patching/resurfacing).',
    tags: ['Patching & Overlay', 'Pemeliharaan Jalan', 'RAB & Desain'],
  },
  {
    icon: Truck,
    title: 'Penyewaan Alat & Alat Berat',
    description: 'Layanan sewa alat berat dan kendaraan operasional untuk mendukung kelancaran proyek konstruksi Anda dengan harga kompetitif.',
    tags: ['Excavator', 'Towing', 'TW500 Sakai', 'Pickup', 'Genset'],
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
          stagger: 0.1,
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
        <div ref={titleRef} className="mx-auto flex max-w-2xl flex-col items-center text-center opacity-0">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Layanan & Pengalaman Kerja
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Layanan Konstruksi & General Contractor
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-500">
            Berbekal pengalaman dan portofolio yang luas, kami menyediakan layanan end-to-end 
            dari perencanaan hingga pengerjaan akhir untuk segala kebutuhan konstruksi Anda.
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
                className="group relative rounded-2xl border border-slate-100 bg-white p-7 opacity-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-amber-50/40 hover:shadow-lg"
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

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

