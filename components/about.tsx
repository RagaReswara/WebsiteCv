'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { MapPin, Award, Users, Target, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  {
    icon: Award,
    title: '15+ Tahun',
    description: 'Pengalaman di industri konstruksi & kontraktor',
  },
  {
    icon: Users,
    title: 'Tim Profesional',
    description: 'Tenaga ahli bersertifikat dan terampil',
  },
  {
    icon: Target,
    title: 'Tepat Waktu',
    description: 'Komitmen penyelesaian sesuai jadwal',
  },
  {
    icon: MapPin,
    title: 'Sleman, Yogyakarta',
    description: 'Melayani seluruh DIY dan Jawa Tengah',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        imageRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 30, opacity: 0 },
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
      id="tentang"
      ref={sectionRef}
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Two-column layout */}
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Text */}
          <div ref={textRef} className="flex-1 opacity-0">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
              Tentang Kami
            </p>
            <h2
              className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Mitra Konstruksi Terpercaya untuk Proyek Anda
            </h2>
            <p className="mt-6 text-justify text-base leading-relaxed text-slate-600">
              <strong>CV Efata Jaya Truss</strong> merupakan perusahaan konstruksi terpercaya di Sleman, Yogyakarta, yang bergerak di bidang <em>pengadaan barang dan jasa konstruksi</em>. Kami menawarkan kerjasama kepada berbagai perusahaan maupun instansi pemerintah berdasarkan bidang keahlian kami yang telah teruji.
            </p>
            <p className="mt-4 text-justify text-base leading-relaxed text-slate-600">
              Berpengalaman dalam pembangunan rumah huni, gudang, gedung pertemuan, <strong>jalan aspal</strong>, jalan cor beton, talud, jembatan, hingga pemasangan konstruksi atap baja dan roofing — kami hadir sebagai <strong>solusi satu atap</strong> untuk semua kebutuhan konstruksi Anda. Percayakan proyek Anda kepada kami.
            </p>

            {/* Visi & Misi */}
            <div className="mt-8 space-y-4">
              <div className="rounded-xl border-l-4 border-brand-orange bg-amber-50/60 px-6 py-5">
                <p className="text-sm font-semibold text-slate-900">Visi Kami</p>
                <p className="mt-1 text-justify text-sm leading-relaxed text-slate-600">
                  Menjadi CV kontraktor dan perdagangan umum terbaik di Yogyakarta,
                  dengan mengutamakan kepuasan pekerja dan pelanggan melalui hasil
                  kerja berkualitas tinggi.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
                <p className="text-sm font-semibold text-slate-900">Misi Kami</p>
                <ul className="mt-3 space-y-2">
                  {[
                    'Menjaga kualitas sumber daya yang kami sediakan.',
                    'Mengedepankan kepuasan pelanggan sebagai prioritas utama.',
                    'Menghasilkan karya konstruksi dengan standar kualitas terbaik.',
                    'Mewujudkan Zero Accident pada setiap aktivitas pekerjaan.',
                  ].map((misi) => (
                    <li key={misi} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      {misi}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="flex-1 opacity-0">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/about-bg.jpg"
                alt="Proyek pengaspalan CV Efata Jaya Truss"
                width={640}
                height={480}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Floating stats card */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-5 shadow-lg backdrop-blur-sm sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-[220px]">
                <p
                  className="text-3xl font-extrabold text-brand-orange"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  500+
                </p>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  Proyek Berhasil Diselesaikan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight cards */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 opacity-0 transition-all duration-300 hover:border-orange-100 hover:bg-orange-300/15"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-orange/10">
                  <Icon className="h-5 w-5 text-brand-orange" />
                </div>
                <h3
                  className="text-sm font-bold text-slate-900"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
