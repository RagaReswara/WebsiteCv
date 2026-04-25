'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building, FileText, TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const companyInfo = [
  { label: 'Nama Perusahaan', value: 'CV Efata Jaya Truss' },
  { label: 'Alamat', value: 'JL Agrowisata, Klelen Rt 04, Trimulyo, Kec. Sleman, Yogyakarta 55513' },
  { label: 'Nomor Telepon', value: '0821 3890 6449 / 0858 6842 6690' },
  { label: 'Email', value: 'efatajaya58@gmail.com' },
  { label: 'Akta Pendirian', value: 'No. 13, Tanggal 30 Juni 2020' },
  { label: 'SK Kemenkumham', value: 'No. AHU-0038124-AH.01.15 Tahun 2020' },
  { label: 'NPWP', value: '95.196.321.4-542.000' },
  { label: 'Bidang Usaha', value: 'Contractor & General Trading' },
]

export default function CompanyData() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
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
      id="data-perusahaan"
      ref={sectionRef}
      className="bg-slate-900 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="mx-auto max-w-2xl text-center opacity-0">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Legalitas & Identitas
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Data Perusahaan Resmi
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-400">
            Kami beroperasi dengan legalitas penuh dan transparan. Kepercayaan
            Anda adalah prioritas utama kami.
          </p>
        </div>

        <div ref={contentRef} className="mt-16 grid gap-8 opacity-0 lg:grid-cols-3">
          {/* Company Info Table — spans 2 cols */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange/20">
                <Building className="h-5 w-5 text-brand-orange" />
              </div>
              <h3
                className="text-lg font-bold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Identitas Perusahaan
              </h3>
            </div>
            <div className="divide-y divide-white/10">
              {companyInfo.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:gap-4">
                  <span className="w-full shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:w-44">
                    {item.label}
                  </span>
                  <span className="text-sm text-slate-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Legal Badge */}
            <div className="rounded-2xl border border-brand-orange/30 bg-brand-orange/10 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p
                    className="font-bold text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Berbadan Hukum Resmi
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    CV Efata Jaya Truss adalah badan usaha resmi dengan akta notaris,
                    SK Kemenkumham, dan NPWP aktif. Setiap proyek dikerjakan
                    dengan penuh pertanggungjawaban.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-orange/20">
                  <TrendingUp className="h-4 w-4 text-brand-orange" />
                </div>
                <p
                  className="text-sm font-bold text-white"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Pencapaian Kami
                </p>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { value: '15+', label: 'Tahun Pengalaman' },
                  { value: '500+', label: 'Proyek Selesai' },
                  { value: '200+', label: 'Klien Puas' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-4">
                    <p
                      className="text-3xl font-extrabold text-brand-orange"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
