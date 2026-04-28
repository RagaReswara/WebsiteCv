'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Proyek', href: '#proyek' },
  { label: 'Kontak', href: '#kontak' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileLinksRef = useRef<HTMLUListElement>(null)
  const underlineRefs = useRef<Map<string, HTMLSpanElement>>(new Map())
  const lenisRef = useRef<Lenis | null>(null)

  // Get Lenis instance from the global scope
  useEffect(() => {
    const checkLenis = () => {
      const lenisEl = document.querySelector('[data-lenis-prevent]')?.closest('[data-lenis]')
      // Access lenis from the scroll listener attached to the document
      if ((window as any).__lenis) {
        lenisRef.current = (window as any).__lenis
      }
    }
    // Poll briefly for Lenis to be ready
    const interval = setInterval(() => {
      const lenis = (window as any).__lenis
      if (lenis) {
        lenisRef.current = lenis
        clearInterval(interval)
      }
    }, 50)
    setTimeout(() => clearInterval(interval), 3000)

    return () => clearInterval(interval)
  }, [])

  // Navbar background on scroll via GSAP ScrollTrigger
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -40px',
      onToggle: (self) => {
        setScrolled(self.isActive)
        gsap.to(header, {
          backgroundColor: self.isActive
            ? 'rgba(255,255,255,0.97)'
            : 'rgba(255,255,255,0)',
          backdropFilter: self.isActive ? 'blur(16px)' : 'blur(0px)',
          boxShadow: self.isActive
            ? '0 1px 3px 0 rgba(0,0,0,0.08)'
            : '0 0 0 0 rgba(0,0,0,0)',
          duration: 0.4,
          ease: 'power2.out',
        })
      },
    })

    return () => ScrollTrigger.killAll()
  }, [])

  // Scroll spy with ScrollTrigger
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1))
    const triggers: ScrollTrigger[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(id)
          }
        },
      })
      triggers.push(trigger)
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  // Animate underline when active section changes
  useEffect(() => {
    underlineRefs.current.forEach((span, key) => {
      if (key === activeSection) {
        gsap.to(span, {
          scaleX: 1,
          opacity: 1,
          duration: 0.35,
          ease: 'power3.out',
        })
      } else {
        gsap.to(span, {
          scaleX: 0,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        })
      }
    })
  }, [activeSection])

  // Smooth scroll with Lenis + GSAP micro-interaction
  const handleNavClick = useCallback(
    (href: string, linkEl?: HTMLElement | null) => {
      const id = href.slice(1)

      // Micro-interaction: quick scale pulse + orange flash
      if (linkEl) {
        gsap
          .timeline()
          .to(linkEl, {
            scale: 0.93,
            color: '#D4740E',
            duration: 0.06,
            ease: 'power2.in',
          })
          .to(linkEl, {
            scale: 1,
            duration: 0.14,
            color: '',
            ease: 'back.out(3)',
          })
      }

      // Smooth scroll via Lenis
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(`#${id}`, {
          offset: -85,
          duration: 1.8,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        // Fallback: native smooth scroll
        const target = document.getElementById(id)
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 85
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    },
    []
  )

  // Mobile menu animations
  const openMobileMenu = useCallback(() => {
    setMobileOpen(true)
    requestAnimationFrame(() => {
      const menu = mobileMenuRef.current
      const links = mobileLinksRef.current
      if (!menu || !links) return

      gsap.fromTo(
        menu,
        { x: '100%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        }
      )
      gsap.fromTo(
        links.children,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.15,
        }
      )
    })
  }, [])

  const closeMobileMenu = useCallback(() => {
    const menu = mobileMenuRef.current
    if (!menu) {
      setMobileOpen(false)
      return
    }
    gsap.to(menu, {
      x: '100%',
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => setMobileOpen(false),
    })
  }, [])

  const handleMobileNavClick = useCallback(
    (href: string) => {
      closeMobileMenu()
      setTimeout(() => {
        handleNavClick(href)
      }, 300)
    },
    [closeMobileMenu, handleNavClick]
  )

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#beranda')
          }}
          className="flex items-center gap-2.5"
        >
          <Image
            src="/images/Logo-CV-Efata.png"
            alt="Logo CV Efata Jaya Truss"
            width={56}
            height={56}
            className="h-16 w-40 pr-1 pb-3.5 object-contain"
          />
          <div className="flex flex-col leading-none">
            <span
              className="text-base font-extrabold tracking-tight text-slate-900"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Efata Jaya Truss
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
              Contractor & Trading
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const sectionId = link.href.slice(1)
            const isActive = activeSection === sectionId
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href, e.currentTarget)
                  }}
                  className={`nav-link relative block px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'text-brand-orange'
                    : 'text-black hover:text-slate-400'
                    }`}
                >
                  {link.label}
                  <span
                    ref={(el) => {
                      if (el) underlineRefs.current.set(sectionId, el)
                    }}
                    className="absolute bottom-0.5 left-4 right-4 h-0.5 origin-left rounded-full bg-brand-orange"
                    style={{
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-orange-dark hover:shadow-md active:scale-95 lg:flex"
        >
          <Phone className="h-4 w-4" />
          Hubungi Kami
        </a>

        {/* Mobile Toggle */}
        <button
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => (mobileOpen ? closeMobileMenu() : openMobileMenu())}
          className="relative z-[60] cursor-pointer rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-brown/20 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Slide-In Panel */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 z-50 flex h-full w-[280px] flex-col bg-white shadow-2xl lg:hidden"
          style={{ transform: 'translateX(100%)' }}
        >
          {/* Close button */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <span
              className="text-sm font-bold text-slate-900"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Menu
            </span>
            <button
              onClick={closeMobileMenu}
              aria-label="Tutup menu"
              className="cursor-pointer rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links */}
          <ul ref={mobileLinksRef} className="flex flex-col gap-1 px-4 pt-4">
            {navLinks.map((link) => {
              const sectionId = link.href.slice(1)
              const isActive = activeSection === sectionId
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleMobileNavClick(link.href)
                    }}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive
                      ? 'bg-orange-50 text-brand-orange'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    )}
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Mobile CTA */}
          <div className="mt-auto border-t border-slate-100 p-4">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-orange-dark"
            >
              <Phone className="h-4 w-4" />
              Hubungi Kami
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
