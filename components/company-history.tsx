'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Milestone } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    year: 'Awal Berdiri',
    title: 'Lahir dari Semangat Membangun',
    description:
      'CV Efata Jaya Truss bermula dari usaha perorangan di bidang konstruksi rangka atap dari bambu dan bangunan bambu — cikal bakal semangat membangun yang tak pernah padam dan terus berkembang hingga hari ini.',
    accent: true,
    image: '/images/project-1.jpg',
  },
  {
    year: '2013',
    title: 'Inovasi ke Baja Ringan & Plafon PVC',
    description:
      'Merespons kebutuhan pasar yang terus berkembang, kami mulai mengadopsi material baja ringan dan plafon PVC. Langkah berani ini membuka babak baru kapasitas layanan kami yang lebih modern dan kompetitif.',
    accent: false,
    image: '/images/project-2.jpg',
  },
  {
    year: '2014',
    title: 'Merek "Efata Truss" Dikenal Luas',
    description:
      'Nama "Efata Truss" mulai dikenal di Yogyakarta. Dari proyek rumah tinggal, pendopo, hingga gereja — kepercayaan klien terus bertumbuh. Reputasi kami dibangun satu proyek berkualitas demi satu proyek berkualitas.',
    accent: false,
    image: '/images/project-3.jpg',
  },
  {
    year: '2018',
    title: 'Bermitra dengan Pemerintah',
    description:
      'Tonggak bersejarah: kami mulai mengerjakan proyek-proyek pemerintah desa — pengaspalan jalan, pembangunan talud, corblok, dan irigasi. Kepercayaan pemerintah kepada kami adalah bukti nyata kualitas yang tak perlu diragukan.',
    accent: false,
    image: '/images/project-4.jpg',
  },
  {
    year: '2020',
    title: 'Resmi Berbadan Hukum sebagai CV',
    description:
      'Dengan Akta Pendirian No. 13 tanggal 30 Juni 2020 dan SK Kemenkumham No. AHU-0038124-AH.01.15, CV Efata Jaya Truss resmi berbadan hukum. Fondasi legal yang kuat untuk melayani proyek yang lebih besar dan lebih ambisius.',
    accent: true,
    image: '/images/project-5.jpg',
  },
]

export default function CompanyHistory() {
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

      itemsRef.current.filter(Boolean).forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="sejarah"
      ref={sectionRef}
      className="bg-slate-50 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="mx-auto max-w-2xl text-center opacity-0">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Perjalanan Kami
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Sejarah Singkat CV Efata Jaya Truss
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-500">
            Perjalanan panjang yang dimulai dari semangat sederhana, kini menjadi
            kontraktor terpercaya kepercayaan pemerintah dan swasta.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Center line - desktop only */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-orange/30 via-brand-orange/50 to-brand-orange/10 lg:block" />

          <div className="flex flex-col">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                ref={(el) => { itemsRef.current[i] = el }}
                className={`relative flex opacity-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col items-center gap-6 lg:gap-10`}
              >
                {/* Content Card */}
                <div className="w-full lg:w-[calc(50%-2.5rem)]">
                  <div
                    className={`group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${m.accent
                      ? 'border-brand-orange/30 bg-amber-50'
                      : 'border-slate-200 bg-white'
                      }`}
                  >
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider ${m.accent
                        ? 'bg-brand-orange text-white'
                        : 'bg-slate-100 text-slate-600'
                        }`}
                    >
                      {m.year}
                    </span>
                    <h3
                      className="mt-3 text-lg font-bold text-slate-900"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {m.title}
                    </h3>
                    <p className="mt-2 text-justify text-sm leading-relaxed text-slate-500">
                      {m.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden shrink-0 lg:flex">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md ${m.accent
                      ? 'bg-brand-orange text-white'
                      : 'bg-white text-brand-orange border-2 border-brand-orange/40'
                      }`}
                  >
                    <Milestone className="h-4 w-4" />
                  </div>
                </div>

                {/* Image Section */}
                <div className="hidden w-full lg:block lg:w-[calc(50%-2.5rem)]">
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
                    <Image
                      src={m.image}
                      alt={`Dokumentasi ${m.year}`}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
