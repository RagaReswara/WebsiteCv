'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface EquipmentItem {
  name: string
  description: string
  image: string
  category: 'sewa' | 'operasional'
}

const allEquipment: EquipmentItem[] = [
  {
    name: 'Excavator CAT',
    description:
      'Alat berat serbaguna merk Caterpillar (CAT) untuk galian, pengurukan, dan pembersihan lahan proyek.',
    image: '/images/equipment-excavator.png',
    category: 'sewa',
  },
  {
    name: 'Mobil Pick Up',
    description:
      'Kendaraan operasional untuk pengangkutan material dan logistik proyek harian.',
    image: '/images/equipment-pickup.png',
    category: 'sewa',
  },
  {
    name: 'TW500 Sakai',
    description:
      'Vibrating roller Sakai TW500 untuk pemadatan aspal dan tanah pada pekerjaan jalan.',
    image: '/images/aspal-new-2.jpg',
    category: 'operasional',
  },
  {
    name: 'Asphalt Finisher',
    description:
      'Mesin penghampar aspal (paver) untuk menghasilkan permukaan jalan yang rata dan presisi.',
    image: '/images/aspal-new-8.jpg',
    category: 'operasional',
  },
  {
    name: 'Genset CAT',
    description:
      'Generator set Caterpillar untuk sumber daya listrik cadangan di lokasi proyek.',
    image: '/images/equipment-genset.png',
    category: 'operasional',
  },
]

export default function EquipmentShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const legendRef = useRef<HTMLDivElement>(null)
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
        legendRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: legendRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
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
      id="alat-berat"
      ref={sectionRef}
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Section Title ── */}
        <div ref={titleRef} className="mx-auto max-w-4xl text-center opacity-0">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange text-center">
            Armada &amp; Peralatan
          </p>
          <h2
            className="mt-3 whitespace-nowrap text-3xl font-extrabold tracking-tight text-black sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Alat Berat &amp; Kendaraan Operasional
          </h2>
        </div>

        {/* ── Legend / Category Indicator ── */}
        <div
          ref={legendRef}
          className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-6 opacity-0"
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-emerald-500/15 px-3.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Sewa
            </span>
            <span className="text-xs text-slate-400">Tersedia untuk disewakan</span>
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-slate-500/15 px-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" />
              </svg>
              Operasional
            </span>
            <span className="text-xs text-slate-400">Armada pengerjaan proyek</span>
          </div>
        </div>

        {/* ── Unified Equipment Grid ── */}
        <div className="mx-auto mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allEquipment.map((item, i) => {
            const isRental = item.category === 'sewa'

            return (
              <div
                key={item.name}
                ref={(el) => {
                  cardsRef.current[i] = el
                }}
                className={`group relative overflow-hidden rounded-2xl opacity-0 shadow-lg transition-all duration-300 hover:shadow-2xl ${
                  isRental
                    ? 'bg-[#2A3441] ring-1 ring-white/5'
                    : 'bg-slate-50 ring-1 ring-slate-200/60 hover:ring-slate-300'
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                      isRental ? 'from-[#2A3441]' : 'from-slate-50'
                    }`}
                  />
                  {/* Name badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm ${
                        isRental ? 'bg-brand-orange/90' : 'bg-slate-800/80'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {/* Category tag */}
                  <div className="absolute top-4 right-4">
                    {isRental ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Sewa
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-600/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" />
                        </svg>
                        Operasional
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className={`text-lg font-bold ${isRental ? 'text-white' : 'text-slate-800'}`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed text-left ${
                      isRental ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-base text-slate-500">
            Butuh alat berat untuk proyek Anda?{' '}
            <a
              href="#kontak"
              className="font-semibold text-brand-orange underline-offset-4 transition-all hover:underline"
            >
              Hubungi kami untuk info sewa &amp; ketersediaan →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
