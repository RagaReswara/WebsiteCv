'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Route, Waves, Mountain, Fence, Building2, Triangle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    icon: Route,
    title: 'Pembangunan & Perbaikan Jalan',
    description:
      'Solusi lengkap untuk infrastruktur jalan Anda — dari pengaspalan hotmix berkualitas tinggi hingga paving dan corblok yang tahan lama.',
    tags: ['Pengaspalan Hotmix', 'Penetrasi Jalan', 'Corblok', 'Paving'],
  },
  {
    icon: Waves,
    title: 'Talud, Irigasi & Drainase',
    description:
      'Perlindungan lahan dan pengelolaan air yang handal. Kami bangun talud kokoh, irigasi fungsional, dan sistem drainase yang efektif.',
    tags: ['Pembangunan Talud', 'Irigasi', 'Drainase', 'Sumur Resapan'],
  },
  {
    icon: Mountain,
    title: 'Perataan & Pemadatan Tanah',
    description:
      'Persiapan lahan yang tepat adalah kunci proyek yang sukses. Tim kami siap melakukan perataan, pengurukan, dan pemadatan tanah sesuai standar teknis.',
    tags: ['Perataan Lahan', 'Pengurukan', 'Pemadatan Tanah'],
  },
  {
    icon: Fence,
    title: 'Pagar & Infrastruktur Komersial',
    description:
      'Dari pagar pembatas rumah hingga infrastruktur kantor dan kawasan komersial — kami kerjakan dengan presisi dan estetika terbaik.',
    tags: ['Pagar Rumah', 'Pagar Kantor', 'Infrastruktur Komersial'],
  },
  {
    icon: Building2,
    title: 'Gedung & Rumah Tinggal',
    description:
      'Mulai dari rumah tinggal, pendopo, gereja, gudang, hingga gedung pertemuan — kami bangun dengan konstruksi kokoh dan hasil pengerjaan rapi.',
    tags: ['Rumah Tinggal', 'Gudang', 'Gedung', 'Pendopo'],
  },
  {
    icon: Triangle,
    title: 'Konstruksi Atap & Rangka Baja',
    description:
      'Ahli dalam pemasangan atap/roof covering, kerangka baja ringan, dan plafon untuk berbagai jenis bangunan. Kuat, presisi, dan estetis.',
    tags: ['Rangka Baja Ringan', 'Roof Covering', 'Plafon PVC'],
  },
]

export default function WorkExperience() {
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
      id="pengalaman"
      ref={sectionRef}
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="mx-auto max-w-2xl text-center opacity-0">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Pengalaman Kerja
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Kami Ahli di Berbagai Bidang Konstruksi
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-500">
            Dengan portofolio pengerjaan yang luas dan tim yang berpengalaman,
            tidak ada proyek yang terlalu besar atau terlalu kecil bagi kami.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, i) => {
            const Icon = exp.icon
            return (
              <div
                key={exp.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative rounded-2xl border border-slate-100 bg-slate-50 p-7 opacity-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-amber-50/40 hover:shadow-lg"
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
                  {exp.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
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
