'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { slugToCategory, galleryData, categoryToSlug, categories } from '@/lib/projects'

export default function PortfolioCategory() {
  const params = useParams()
  const router = useRouter()
  const slug = params.category as string
  const category = slugToCategory(slug)

  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!category) return

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
    }

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.gallery-card')
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.3,
        }
      )
    }
  }, [category])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % data!.images.length : null
        )
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + data!.images.length) % data!.images.length
            : null
        )
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex])

  if (!category) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#1E2A35] text-white">
        <h1 className="text-3xl font-bold">Kategori tidak ditemukan</h1>
        <Link
          href="/#proyek"
          className="mt-6 rounded-lg bg-brand-orange px-6 py-3 font-medium text-white transition-colors hover:bg-brand-orange-dark"
        >
          Kembali ke Portofolio
        </Link>
      </div>
    )
  }

  const data = galleryData[category]
  const otherCategories = categories.filter((c) => c !== 'All' && c !== category)

  return (
    <main className="min-h-screen bg-[#1E2A35]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a2530]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            href="/#proyek"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-brand-orange"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <Link href="/" className="text-sm font-bold text-white">
            CV Efata Jaya Truss
          </Link>
        </div>
      </div>

      {/* Title Section */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <div ref={titleRef} className="mx-auto max-w-2xl text-center opacity-0">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Portofolio
          </p>
          <h1
            className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {data.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            {data.description}
          </p>
        </div>

        {/* Category navigation */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl bg-[#2A3441] p-2">
            {categories
              .filter((c) => c !== 'All')
              .map((cat) => (
                <button
                  key={cat}
                  onClick={() => router.push(`/portofolio/${categoryToSlug(cat)}`)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    cat === category
                      ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/25'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.images.map((image, index) => (
            <div
              key={image.src}
              className="gallery-card group relative cursor-pointer overflow-hidden rounded-2xl opacity-0"
              onClick={() => setLightboxIndex(index)}
            >
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-bold text-white shadow-lg">
                    Lihat Foto
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                <p className="text-sm font-medium text-white">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Other categories */}
        <div className="mt-20 border-t border-white/10 pt-12">
          <h2
            className="text-center text-xl font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Lihat Kategori Lainnya
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {otherCategories.map((cat) => (
              <Link
                key={cat}
                href={`/portofolio/${categoryToSlug(cat)}`}
                className="rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-brand-orange hover:bg-brand-orange/10 hover:text-brand-orange"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(
                (lightboxIndex - 1 + data.images.length) % data.images.length
              )
            }}
            className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative mx-16 h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={data.images[lightboxIndex].src}
              alt={data.images[lightboxIndex].alt}
              fill
              className="rounded-lg object-contain"
              sizes="90vw"
              priority
            />
            <p className="absolute -bottom-10 left-0 right-0 text-center text-sm text-slate-400">
              {data.images[lightboxIndex].alt} — {lightboxIndex + 1} / {data.images.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(
                (lightboxIndex + 1) % data.images.length
              )
            }}
            className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </main>
  )
}
