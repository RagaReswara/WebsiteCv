'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
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
        infoRef.current,
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

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi'
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi'
    } else if (!/^[\d+\-() ]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Nomor telepon tidak valid'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Format email tidak valid'
    }
    if (!formData.message.trim()) newErrors.message = 'Pesan wajib diisi'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    // Simulate submit
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
    setFormData({ name: '', phone: '', email: '', message: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  return (
    <section
      id="kontak"
      ref={sectionRef}
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Title */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Kontak
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Hubungi Kami Sekarang
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-500">
            Konsultasikan kebutuhan proyek aspal Anda. Tim kami siap membantu
            dengan respon cepat.
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Contact Form */}
          <div ref={formRef} className="flex-1 opacity-0">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Send className="h-7 w-7 text-green-600" />
                </div>
                <h3
                  className="text-xl font-bold text-slate-900"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Pesan Terkirim!
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Terima kasih! Tim kami akan segera menghubungi Anda.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 cursor-pointer rounded-lg bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-orange-dark"
                >
                  Kirim Pesan Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama Anda"
                    className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange ${
                      errors.name
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 bg-white'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08xx-xxxx-xxxx"
                    className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange ${
                      errors.phone
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 bg-white'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange ${
                      errors.email
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 bg-white'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ceritakan kebutuhan proyek Anda..."
                    className={`w-full resize-none rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange ${
                      errors.message
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 bg-white'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition-all hover:bg-brand-orange-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info + Map */}
          <div ref={infoRef} className="flex flex-1 flex-col gap-6 opacity-0">
            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10">
                  <MapPin className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Alamat</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                    Jl. Agrowisata Jl. Klelen Raya, Kloler, Trimulyo, Kec. Sleman, Kabupaten Sleman, Daerah Istimewa Yogyakarta
                    <br/>
                    55513
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10">
                  <Phone className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Telepon / WhatsApp</p>
                  <a
                    href="https://wa.me/6285868426690"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-sm text-brand-orange hover:underline"
                  >
                    +62 858-6842-6690
                  </a>
                  <a
                    href="https://wa.me/6282227196772"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-sm text-brand-orange hover:underline"
                  >
                    +62 822-2719-6772
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10">
                  <Mail className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Email</p>
                  <a
                    href="mailto:info@efatajayatruss.com"
                    className="mt-0.5 block text-sm text-brand-orange hover:underline"
                  >
                    info@efatajayatruss.com
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="flex-1 overflow-hidden rounded-xl border border-slate-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.6!2d110.3539474!3d-7.6726669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5fc6e7e4a42b%3A0xdad295a88b033d51!2sCV.%20Efata%20Jaya%20Truss%20(%20Aspal%2C%20Kontraktor%20%26%20Konstruksi%20)!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi CV Efata Jaya Truss - Sleman, Yogyakarta"
                className="min-h-70 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
