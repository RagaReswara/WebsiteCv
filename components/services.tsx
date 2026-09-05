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
    tags: ['Aspal Hotmix', 'Aspal Penetrasi', 'Corblok'],
  },
  {
    icon: Waves,
    title: 'Talud, Irigasi & Drainase',
    tags: ['Pembangunan Talud', 'Irigasi', 'Sistem Drainase'],
  },
  {
    icon: Building2,
    title: 'Gedung & Area Komersial',
    tags: ['Rumah & Gedung', 'Paving Parkir', 'Pagar'],
  },
  {
    icon: Triangle,
    title: 'Konstruksi Atap & Baja Ringan',
    tags: ['Truss Baja Ringan', 'Roof Covering', 'Plafon PVC'],
  },
  {
    icon: Wrench,
    title: 'Pemeliharaan & Perencanaan',
    tags: ['Patching & Overlay', 'Pemeliharaan Jalan', 'RAB & Desain'],
  },
  {
    icon: Truck,
    title: 'Penyewaan Alat & Alat Berat',
    tags: ['Excavator CAT', 'Mobil Pick Up'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

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
        itemsRef.current.filter(Boolean),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: itemsRef.current[0],
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
            className="mt-3 whitespace-nowrap text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Layanan Konstruksi & General Contractor
          </h2>
        </div>

        {/* Clean Service List */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-0">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  ref={(el) => { itemsRef.current[i] = el }}
                  className="flex items-start gap-5 border-b border-slate-200/80 py-9 opacity-0"
                >
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10">
                    <Icon
                      className="h-5 w-5 text-brand-orange"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <h3
                      className="text-[15px] font-bold text-slate-800"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {service.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-slate-400"
                        >
                          {tag}
                          {tag !== service.tags[service.tags.length - 1] && (
                            <span className="ml-1.5 text-slate-300">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
