'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories, projects, type Category } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const animateCards = useCallback(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.portfolio-card')
    if (!cards.length) return

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
      }
    )
  }, [])

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

      const cards = gridRef.current?.querySelectorAll('.portfolio-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleFilter = (category: string) => {
    if (category === activeCategory) return
    setActiveCategory(category)
    // Animate cards in after React re-renders the filtered list
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animateCards()
      })
    })
  }

  const filteredProjects =
    activeCategory === 'All'
      ? projects.slice(0, 9)
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section
      id="proyek"
      ref={sectionRef}
      className="bg-[#1E2A35] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="mx-auto flex max-w-4xl flex-col items-center text-center opacity-0">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Proyek Terbaru
          </p>
          <h2
            className="mt-3 whitespace-nowrap text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Portofolio Proyek Kami
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl bg-[#2A3441] p-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer ${activeCategory === cat
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/25'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid with consistent min-height */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-5 content-start sm:grid-cols-2 lg:grid-cols-3 min-h-[480px] sm:min-h-[580px] lg:min-h-[720px]"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.label}
              className="portfolio-card relative overflow-hidden rounded-2xl opacity-0"
            >
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-brand-orange">
                    {project.type}
                  </p>
                  <h3
                    className="text-xl font-bold leading-tight text-white truncate"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {project.label}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Single Portfolio CTA Button */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/portofolio"
            className="inline-flex items-center gap-3 rounded-xl bg-brand-orange px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition-all duration-300 hover:bg-brand-orange-dark hover:shadow-xl hover:shadow-brand-orange/35 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            Lihat Seluruh Portofolio Proyek
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
