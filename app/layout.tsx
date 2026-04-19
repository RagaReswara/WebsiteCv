import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import LenisProvider from '@/components/lenis-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-heading' })

export const metadata = {
  title: 'CV Efata Jaya Truss — Kontraktor Truss Baja Terpercaya di Yogyakarta',
  description:
    'CV Efata Jaya Truss adalah kontraktor truss baja terpercaya di Sleman, Yogyakarta. Spesialis desain, fabrikasi, dan instalasi rangka atap baja ringan & galvanis untuk rumah, gedung, dan proyek komersial.',
  openGraph: {
    title: 'CV Efata Jaya Truss — Kontraktor Truss Baja Terpercaya',
    description:
      'Spesialis desain, fabrikasi & instalasi rangka atap baja di Yogyakarta. 15+ tahun pengalaman.',
    locale: 'id_ID',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#D4740E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${inter.className} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
