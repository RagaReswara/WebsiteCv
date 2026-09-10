'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const companies = [
  {
    name: 'CV Efata Jaya Truss',
    logo: '/images/Logo-CV-Efata.png',
    alt: 'Logo CV Efata Jaya Truss',
    width: 200,
    height: 60,
  },
  {
    name: 'PT Reswara Jaya Semesta',
    logo: '/images/logo-reswara.svg',
    alt: 'Logo PT Reswara Jaya Semesta',
    width: 240,
    height: 80,
  },
]

export default function EfataGroup() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
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
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
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
      id="efata-group"
      ref={sectionRef}
      className="border-t border-white/10 bg-slate-900 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className="mx-auto flex max-w-4xl flex-col items-center text-center opacity-0"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Jaringan Perusahaan
          </p>
          <h2
            className="mt-3 whitespace-nowrap text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Part of Efata Group
          </h2>
        </div>

        {/* Company Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {companies.map((company, index) => (
            <div
              key={company.name}
              ref={(el) => { cardsRef.current[index] = el }}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm opacity-0 shadow-lg shadow-black/20"
            >
              {/* White canvas container for crisp logo presentation */}
              <div className="flex h-28 w-full max-w-[280px] items-center justify-center rounded-xl bg-white px-6 py-4 shadow-sm">
                <Image
                  src={company.logo}
                  alt={company.alt}
                  width={company.width}
                  height={company.height}
                  className="max-h-16 w-auto object-contain"
                />
              </div>

              {/* Company Name */}
              <h3
                className="mt-6 text-lg sm:text-xl font-bold tracking-tight text-white text-center"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {company.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
