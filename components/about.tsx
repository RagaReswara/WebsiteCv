'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

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
              className="mt-3 whitespace-nowrap text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Mitra Konstruksi Terpercaya untuk Proyek Anda
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              <strong>CV Efata Jaya Truss</strong> merupakan perusahaan konstruksi terpercaya di Sleman, Yogyakarta, yang bergerak di bidang <em>pengadaan barang dan jasa konstruksi</em>. Kami menawarkan kerjasama kepada berbagai perusahaan maupun instansi pemerintah berdasarkan bidang keahlian kami yang telah teruji.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Berpengalaman dalam pembangunan rumah huni, gudang, gedung pertemuan, <strong>jalan aspal</strong>, jalan cor beton, talud, jembatan, hingga pemasangan konstruksi atap baja dan roofing kami hadir sebagai <strong>solusi satu atap</strong> untuk semua kebutuhan konstruksi Anda. Percayakan proyek Anda kepada kami.
            </p>

            {/* Visi & Misi */}
            <div className="mt-8 space-y-4">
              <div className="rounded-xl bg-amber-50/60 px-6 py-5">
                <p className="text-sm font-semibold text-slate-900">Visi Kami</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Menjadi CV kontraktor dan perdagangan umum terbaik di Yogyakarta,
                  dengan mengutamakan kepuasan pekerja dan pelanggan melalui hasil
                  kerja berkualitas tinggi.
                </p>
              </div>
              <div className="rounded-xl bg-amber-50/60 px-6 py-5">
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
                  200+
                </p>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  Proyek Berhasil Diselesaikan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
