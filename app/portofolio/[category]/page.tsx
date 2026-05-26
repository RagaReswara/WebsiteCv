'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { gsap } from 'gsap'
import { slugToCategory, galleryData, categoryToSlug, categories, type ProgressGroup } from '@/lib/projects'

export default function PortfolioCategory() {
  const params = useParams()
  const router = useRouter()
  const slug = params.category as string
  const category = slugToCategory(slug)

  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [progressLightbox, setProgressLightbox] = useState<{ group: ProgressGroup; phaseIndex: number; imageIndex: number } | null>(null)

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
    if (lightboxIndex === null && progressLightbox === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
        setProgressLightbox(null)
      }
      if (lightboxIndex !== null) {
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
      if (progressLightbox !== null) {
        if (e.key === 'ArrowRight') {
          setProgressLightbox((prev) => {
            if (!prev) return null
            const activePhase = prev.group.phases[prev.phaseIndex]
            const activeImages = activePhase.images && activePhase.images.length > 0
              ? activePhase.images
              : (activePhase.src ? [{ src: activePhase.src, alt: activePhase.alt || '' }] : [])

            if (prev.imageIndex < activeImages.length - 1) {
              return { ...prev, imageIndex: prev.imageIndex + 1 }
            } else if (prev.phaseIndex < prev.group.phases.length - 1) {
              return { ...prev, phaseIndex: prev.phaseIndex + 1, imageIndex: 0 }
            }
            return prev
          })
        }
        if (e.key === 'ArrowLeft') {
          setProgressLightbox((prev) => {
            if (!prev) return null
            if (prev.imageIndex > 0) {
              return { ...prev, imageIndex: prev.imageIndex - 1 }
            } else if (prev.phaseIndex > 0) {
              const prevPhaseIdx = prev.phaseIndex - 1
              const prevPhase = prev.group.phases[prevPhaseIdx]
              const prevPhaseImages = prevPhase.images && prevPhase.images.length > 0
                ? prevPhase.images
                : (prevPhase.src ? [{ src: prevPhase.src, alt: prevPhase.alt || '' }] : [])
              return { ...prev, phaseIndex: prevPhaseIdx, imageIndex: prevPhaseImages.length - 1 }
            }
            return prev
          })
        }
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, progressLightbox])

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

  // Group images by section (if any image has a section property)
  const hasSections = data.images.some((img) => img.section)
  const sections: { title: string; images: { src: string; alt: string; section?: string; originalIndex: number }[] }[] = []

  if (hasSections) {
    data.images.forEach((img, idx) => {
      const sectionTitle = img.section || 'Lainnya'
      let section = sections.find((s) => s.title === sectionTitle)
      if (!section) {
        section = { title: sectionTitle, images: [] }
        sections.push(section)
      }
      section.images.push({ ...img, originalIndex: idx })
    })
  }

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
        <div ref={titleRef} className="mx-auto flex max-w-2xl flex-col items-center text-center opacity-0">
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
                  className={`cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${cat === category
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
      <div ref={gridRef} className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        {!hasSections ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

            {/* Progress Group Cards */}
            {data.progressGroups?.map((group, gIndex) => (
              <div
                key={`progress-${gIndex}`}
                className="gallery-card group relative overflow-hidden rounded-2xl opacity-0"
              >
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={group.thumbnail}
                    alt={group.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Progress badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {group.phases.map((phase, pIdx) => {
                      const labelLower = phase.label.toLowerCase();
                      const badgeColor = labelLower === 'sebelum'
                        ? 'bg-slate-500/80 text-white'
                        : labelLower === 'proses'
                        ? 'bg-amber-500/80 text-white'
                        : 'bg-emerald-500/80 text-white';
                      return (
                        <span
                          key={pIdx}
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm ${badgeColor}`}
                        >
                          {phase.label}
                        </span>
                      );
                    })}
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-bold text-white">{group.title}</p>
                    <p className="mt-1 text-xs text-slate-300 line-clamp-2">{group.description}</p>
                    <button
                      onClick={() => setProgressLightbox({ group, phaseIndex: 0, imageIndex: 0 })}
                      className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition-all duration-300 hover:bg-brand-orange-dark hover:shadow-xl hover:shadow-brand-orange/40 hover:-translate-y-0.5"
                    >
                      <Eye className="h-4 w-4" />
                      Lihat Foto
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {sections.map((section, sIndex) => (
              <div key={section.title} className="space-y-8">
                {/* Section Header with Divider line */}
                <div className="flex items-center gap-4 pt-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-xs font-extrabold text-white shadow-md shadow-brand-orange/20">
                    0{sIndex + 1}
                  </span>
                  <h2 className="text-xl font-extrabold uppercase tracking-widest text-white sm:text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
                    {section.title}
                  </h2>
                  <div className="h-[2px] flex-1 bg-[#2A3441]" />
                </div>
                
                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {section.images.map((image) => (
                    <div
                      key={image.src}
                      className="gallery-card group relative cursor-pointer overflow-hidden rounded-2xl opacity-0"
                      onClick={() => setLightboxIndex(image.originalIndex)}
                    >
                      <div className="relative aspect-4/3 w-full">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
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
              </div>
            ))}
          </div>
        )}
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
            className="absolute top-6 right-6 z-50 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
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
            className="absolute left-4 z-50 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-8"
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
            className="absolute right-4 z-50 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Progress Lightbox */}
      {progressLightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md py-8"
          onClick={() => setProgressLightbox(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setProgressLightbox(null)}
            className="absolute top-6 right-6 z-50 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Top Panel (Title & Tabs) */}
          <div className="w-full flex flex-col items-center gap-4 px-6 text-center z-10">
            <h3 className="text-lg font-bold text-white md:text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
              {progressLightbox.group.title}
            </h3>

            {/* Phase tabs */}
            <div className="inline-flex gap-1 rounded-xl bg-white/10 p-1 backdrop-blur-sm">
              {progressLightbox.group.phases.map((phase, pIdx) => {
                const labelLower = phase.label.toLowerCase();
                const tabColor = labelLower === 'sebelum'
                  ? 'bg-slate-500'
                  : labelLower === 'proses'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500';
                return (
                  <button
                    key={pIdx}
                    onClick={(e) => {
                      e.stopPropagation()
                      setProgressLightbox({ ...progressLightbox, phaseIndex: pIdx, imageIndex: 0 })
                    }}
                    className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-bold transition-all duration-300 ${
                      pIdx === progressLightbox.phaseIndex
                        ? `${tabColor} text-white shadow-lg`
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {phase.label}
                  </button>
                )
              })}
            </div>
          </div>

          {(() => {
            const activePhase = progressLightbox.group.phases[progressLightbox.phaseIndex]
            const activeImages = activePhase.images && activePhase.images.length > 0
              ? activePhase.images
              : (activePhase.src ? [{ src: activePhase.src, alt: activePhase.alt || '' }] : [])

            const activeImage = activeImages[progressLightbox.imageIndex] || activeImages[0] || { src: '', alt: '' }

            return (
              <>
                {/* Navigation arrows */}
                {(progressLightbox.phaseIndex > 0 || progressLightbox.imageIndex > 0) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (progressLightbox.imageIndex > 0) {
                        setProgressLightbox({ ...progressLightbox, imageIndex: progressLightbox.imageIndex - 1 })
                      } else {
                        const prevPhaseIdx = progressLightbox.phaseIndex - 1
                        const prevPhase = progressLightbox.group.phases[prevPhaseIdx]
                        const prevPhaseImages = prevPhase.images && prevPhase.images.length > 0
                          ? prevPhase.images
                          : (prevPhase.src ? [{ src: prevPhase.src, alt: prevPhase.alt || '' }] : [])
                        setProgressLightbox({
                          ...progressLightbox,
                          phaseIndex: prevPhaseIdx,
                          imageIndex: prevPhaseImages.length - 1
                        })
                      }
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-8"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}

                {/* Middle Section (Image Container) */}
                <div
                  className="relative w-full flex-1 max-h-[50vh] md:max-h-[55vh] max-w-5xl mx-auto my-4 flex items-center justify-center px-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full h-full max-h-[50vh] md:max-h-[55vh]">
                    <Image
                      src={activeImage.src}
                      alt={activeImage.alt}
                      fill
                      className="rounded-lg object-contain"
                      sizes="90vw"
                      priority
                    />
                  </div>
                </div>

                {/* Bottom Section (Description Panel) */}
                <div
                  className="w-full max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-3 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Badge */}
                  <span
                    className={`rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${
                      activePhase.label.toLowerCase() === 'sebelum'
                        ? 'bg-slate-500/80 text-white'
                        : activePhase.label.toLowerCase() === 'proses'
                        ? 'bg-amber-500/80 text-white'
                        : 'bg-emerald-500/80 text-white'
                    }`}
                  >
                    {activePhase.label}
                  </span>

                  {/* Description text */}
                  <p className="text-sm md:text-base text-slate-300 font-medium max-w-2xl leading-relaxed">
                    {activeImage.alt}
                  </p>

                  {/* Sub-dots navigation */}
                  {activeImages.length > 1 && (
                    <div className="flex gap-2 mt-1">
                      {activeImages.map((_, imgIdx) => (
                        <button
                          key={imgIdx}
                          onClick={(e) => {
                            e.stopPropagation()
                            setProgressLightbox({ ...progressLightbox, imageIndex: imgIdx })
                          }}
                          className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            imgIdx === progressLightbox.imageIndex
                              ? 'bg-brand-orange scale-125'
                              : 'bg-white/30 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Next */}
                {(progressLightbox.phaseIndex < progressLightbox.group.phases.length - 1 ||
                  progressLightbox.imageIndex < activeImages.length - 1) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (progressLightbox.imageIndex < activeImages.length - 1) {
                        setProgressLightbox({ ...progressLightbox, imageIndex: progressLightbox.imageIndex + 1 })
                      } else {
                        setProgressLightbox({
                          ...progressLightbox,
                          phaseIndex: progressLightbox.phaseIndex + 1,
                          imageIndex: 0
                        })
                      }
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-8"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}
              </>
            )
          })()}
        </div>
      )}
    </main>
  )
}
