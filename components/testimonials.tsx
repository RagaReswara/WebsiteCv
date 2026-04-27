'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Bapak Hendra Wijaya',
    role: 'Kontraktor Perumahan',
    content:
      'Kerjasama dengan Efata Jaya sangat memuaskan. Pengaspalan jalan kompleks perumahan kami dikerjakan rapi, tepat waktu, dan timnya sangat profesional. Sudah 3 proyek kami percayakan kepada mereka.',
    rating: 5,
  },
  {
    name: 'Ibu Ratna Sari',
    role: 'Kepala Desa Trimulyo',
    content:
      'Jalan desa kami yang sudah lama rusak akhirnya diperbaiki dengan kualitas aspal yang luar biasa. Efata Jaya mengerjakan dengan cepat dan hasilnya sangat memuaskan warga.',
    rating: 5,
  },
  {
    name: 'Bapak Agus Prasetyo',
    role: 'Pemilik Pabrik',
    content:
      'Area parkir dan halaman pabrik kami diaspal oleh Efata Jaya. Hasilnya sangat rata, kuat, dan estetis. Tim mereka bekerja profesional dan tidak mengganggu operasional pabrik.',
    rating: 5,
  },
  {
    name: 'Bapak Surya Dharma',
    role: 'Kontraktor Komersial',
    content:
      'Proyek pengaspalan kawasan industri kami membutuhkan kualitas tinggi dan waktu cepat. Efata Jaya menyelesaikannya dengan sangat memuaskan. Akan terus kami rekomendasikan.',
    rating: 5,
  },
  {
    name: 'Ibu Dewi Anggraini',
    role: 'Konsultan Infrastruktur',
    content:
      'Sebagai konsultan, saya butuh partner kontraktor yang bisa memenuhi spesifikasi teknis. Efata Jaya selalu memenuhi standar dalam setiap proyek aspal yang kami tangani bersama.',
    rating: 5,
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

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
        carouselRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animate card transition
  useEffect(() => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector('.testimonial-active')
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
      }
    }
  }, [current])

  const t = testimonials[current]

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="mx-auto max-w-2xl text-center opacity-0">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Testimoni
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Apa Kata Klien Kami
          </h2>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="mx-auto mt-16 max-w-3xl opacity-0"
        >
          <div className="testimonial-active relative rounded-2xl border border-slate-100 bg-white p-8 shadow-sm sm:p-10">
            {/* Quote icon */}
            <Quote className="mb-6 h-10 w-10 text-brand-orange/20" />

            {/* Stars */}
            <div className="mb-4 flex items-center gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-justify text-lg leading-relaxed text-slate-600">
              {`"${t.content}"`}
            </p>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10">
                <span
                  className="text-lg font-bold text-brand-orange"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {t.name.charAt(0)}
                </span>
              </div>
              <div>
                <p
                  className="text-sm font-bold text-slate-900"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {t.name}
                </p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Testimoni sebelumnya"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:border-brand-orange hover:text-brand-orange"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimoni ${i + 1}`}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-brand-orange'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Testimoni selanjutnya"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:border-brand-orange hover:text-brand-orange"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
