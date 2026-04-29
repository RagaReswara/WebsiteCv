'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const equipment = [
  {
    name: 'Excavator',
    description: 'Alat berat serbaguna untuk galian, pengurukan, dan pembersihan lahan proyek.',
    image: '/images/equipment-excavator.png',
    specs: ['Kapasitas Bucket 0.8 m³', 'Jangkauan Optimal', 'Operator Berpengalaman'],
  },
  {
    name: 'TW500 Sakai',
    description: 'Vibrating roller untuk pemadatan aspal dan tanah dengan hasil yang merata dan solid.',
    image: '/images/equipment-roller.png',
    specs: ['Tandem Vibratory', 'Pemadatan Optimal', 'Untuk Aspal & Tanah'],
  },
  {
    name: 'Towing',
    description: 'Kendaraan pengangkut alat berat dan material ke lokasi proyek dengan aman.',
    image: '/images/equipment-towing.png',
    specs: ['Kapasitas Angkut Besar', 'Flatbed Truck', 'Antar Lokasi Proyek'],
  },
  {
    name: 'Mobil Pick Up',
    description: 'Kendaraan operasional untuk pengangkutan material dan logistik proyek harian.',
    image: '/images/equipment-pickup.png',
    specs: ['Mobilitas Tinggi', 'Angkut Material', 'Operasional Harian'],
  },
  {
    name: 'Genset',
    description: 'Generator set portable untuk kebutuhan listrik di lokasi proyek yang belum terjangkau PLN.',
    image: '/images/equipment-genset.png',
    specs: ['Diesel Portable', 'Daya Besar', 'Siap Pakai 24 Jam'],
  },
]

export default function EquipmentShowcase() {
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
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
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
      id="alat-berat"
      ref={sectionRef}
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="mx-auto max-w-2xl text-center opacity-0">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange text-center">
            Armada & Peralatan
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-black sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Alat Berat & Kendaraan Operasional
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-400">
            Kami menyediakan layanan penyewaan alat berat dan kendaraan operasional
            untuk mendukung kelancaran proyek konstruksi Anda.
          </p>
        </div>

        {/* Equipment Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => { cardsRef.current[i] = el }}
              className={`group relative overflow-hidden rounded-2xl bg-[#2A3441] opacity-0 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${i >= 3 ? 'lg:col-span-1 sm:col-span-1' : ''
                }`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A3441] via-transparent to-transparent" />
                {/* Equipment name badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                    {item.name}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-base text-slate-400">
            Butuh alat berat untuk proyek Anda?{' '}
            <a
              href="#kontak"
              className="font-semibold text-brand-orange underline-offset-4 transition-all hover:underline"
            >
              Hubungi kami untuk info sewa & ketersediaan →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
