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
    image: '/images/project-1.jpg',
    accent: true,
  },
  {
    year: '2013',
    title: 'Inovasi ke Baja Ringan & Plafon PVC',
    description:
      'Merespons kebutuhan pasar yang terus berkembang, kami mulai mengadopsi material baja ringan dan plafon PVC. Langkah berani ini membuka babak baru kapasitas layanan kami yang lebih modern dan kompetitif.',
    image: '/images/project-2.jpg',
    accent: false,
  },
  {
    year: '2014',
    title: 'Merek "Efata Truss" Dikenal Luas',
    description:
      'Nama "Efata Truss" mulai dikenal di Yogyakarta. Dari proyek rumah tinggal, pendopo, hingga gereja — kepercayaan klien terus bertumbuh. Reputasi kami dibangun satu proyek berkualitas demi satu proyek berkualitas.',
    image: '/images/project-3.jpg',
    accent: false,
  },
  {
    year: '2018',
    title: 'Bermitra dengan Pemerintah',
    description:
      'Tonggak bersejarah: kami mulai mengerjakan proyek-proyek pemerintah desa — pengaspalan jalan, pembangunan talud, corblok, dan irigasi. Kepercayaan pemerintah kepada kami adalah bukti nyata kualitas yang tak perlu diragukan.',
    image: '/images/project-4.jpg',
    accent: false,
  },
  {
    year: '2020',
    title: 'Resmi Berbadan Hukum sebagai CV',
    description:
      'Dengan Akta Pendirian No. 13 tanggal 30 Juni 2020 dan SK Kemenkumham No. AHU-0038124-AH.01.15, CV Efata Jaya Truss resmi berbadan hukum. Fondasi legal yang kuat untuk melayani proyek yang lebih besar dan lebih ambisius.',
    image: '/images/project-5.jpg',
    accent: true,
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
        const content = item?.querySelector('.timeline-content')
        if (content) {
          gsap.fromTo(
            content,
            { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="sejarah" ref={sectionRef} className="bg-slate-100 pt-24 lg:pt-32 pb-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
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
      </div>

      {/* Timeline with Constrained Backgrounds */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 lg:px-8 pb-24">
        {/* Center line - desktop only */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-300 lg:block z-20" />

        {milestones.map((m, i) => (
          <div
            key={m.year}
            ref={(el) => { itemsRef.current[i] = el }}
            className="group relative flex w-full items-center justify-center overflow-hidden py-16 lg:py-10 my-3 rounded-3xl shadow-xl shadow-slate-200/50"
          >
            {/* Background Image for this specific story row */}
            <div className="absolute inset-0 z-0">
              <Image
                src={m.image}
                alt={`Dokumentasi ${m.year}`}
                fill
                className="object-cover transition-transform duration-[10s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/30 transition-colors duration-500 group-hover:bg-slate-900/10" />
            </div>

            {/* Timeline Content */}
            <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12">
              <div className={`flex w-full flex-col items-center gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:gap-10`}>

                {/* Content Card */}
                <div className="timeline-content w-full lg:w-[calc(50%-2.5rem)] opacity-0">
                  <div
                    className={`group/card relative overflow-hidden rounded-2xl border p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${m.accent
                      ? 'border-brand-orange/40 bg-slate-900/60'
                      : 'border-white/10 bg-slate-900/40'
                      }`}
                  >
                    <span
                      className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-wider ${m.accent
                        ? 'bg-brand-orange text-white'
                        : 'bg-white/10 text-slate-300'
                        }`}
                    >
                      {m.year}
                    </span>
                    <h3
                      className="mt-4 text-2xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {m.title}
                    </h3>
                    <p className="mt-3 text-justify text-base leading-relaxed text-slate-300">
                      {m.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-10 h-10">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg ring-4 ring-slate-900/50 ${m.accent
                      ? 'bg-brand-orange text-white'
                      : 'bg-slate-800 text-brand-orange border border-white/20'
                      }`}
                  >
                    <Milestone className="h-4 w-4" />
                  </div>
                </div>

                {/* Empty side to reveal the background image */}
                <div className="hidden lg:block lg:w-[calc(50%-2.5rem)]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
