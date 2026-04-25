export const categories = ['All', 'Jalan & Aspal', 'Talud & Drainase', 'Perataan Tanah', 'Bangunan', 'Atap & Baja', 'Pagar & Komersial'] as const

export type Category = (typeof categories)[number]

export interface Project {
  src: string
  alt: string
  label: string
  category: Exclude<Category, 'All'>
  type: string
}

// Data utama yang tampil di halaman utama (portfolio section)
export const projects: Project[] = [
  {
    src: '/images/project-1.jpg',
    alt: 'Pengaspalan hotmix jalan raya',
    label: 'Pengaspalan Hotmix Jalan Raya',
    category: 'Jalan & Aspal',
    type: 'Pengaspalan Hotmix',
  },
  {
    src: '/images/project-2.jpg',
    alt: 'Pemasangan paving dan corblok',
    label: 'Pemasangan Paving & Corblok',
    category: 'Jalan & Aspal',
    type: 'Paving & Corblok',
  },
  {
    src: '/images/project-3.jpg',
    alt: 'Pembangunan talud penahan tanah',
    label: 'Pembangunan Talud Penahan Tanah',
    category: 'Talud & Drainase',
    type: 'Talud & Irigasi',
  },
  {
    src: '/images/project-4.jpg',
    alt: 'Perataan dan pemadatan lahan proyek',
    label: 'Perataan & Pemadatan Lahan',
    category: 'Perataan Tanah',
    type: 'Perataan Lahan',
  },
  {
    src: '/images/project-5.jpg',
    alt: 'Pembangunan rumah tinggal',
    label: 'Pembangunan Rumah Tinggal',
    category: 'Bangunan',
    type: 'Rumah Tinggal',
  },
  {
    src: '/images/project-6.jpg',
    alt: 'Pemasangan rangka baja ringan atap',
    label: 'Pemasangan Rangka Baja Ringan',
    category: 'Atap & Baja',
    type: 'Rangka Baja Ringan',
  },
]

// Data galeri lengkap per kategori (untuk halaman detail portofolio)
export const galleryData: Record<Exclude<Category, 'All'>, { title: string; description: string; images: { src: string; alt: string }[] }> = {
  'Jalan & Aspal': {
    title: 'Proyek Jalan & Aspal',
    description: 'Dokumentasi proyek pengaspalan hotmix, penetrasi jalan, pemasangan paving dan corblok yang telah kami kerjakan.',
    images: [
      { src: '/images/project-1.jpg', alt: 'Pengaspalan hotmix jalan raya' },
      { src: '/images/project-2.jpg', alt: 'Pemasangan paving dan corblok' },
      { src: '/images/project-7.jpg', alt: 'Penetrasi jalan desa' },
    ],
  },
  'Talud & Drainase': {
    title: 'Proyek Talud & Drainase',
    description: 'Dokumentasi proyek pembangunan talud penahan tanah, irigasi, drainase, dan sumur resapan.',
    images: [
      { src: '/images/project-3.jpg', alt: 'Pembangunan talud penahan tanah' },
      { src: '/images/project-8.jpg', alt: 'Pembangunan saluran irigasi' },
      { src: '/images/project-9.jpg', alt: 'Sistem drainase kawasan' },
    ],
  },
  'Perataan Tanah': {
    title: 'Proyek Perataan & Pemadatan Tanah',
    description: 'Dokumentasi proyek perataan lahan, pengurukan, dan pemadatan tanah untuk persiapan pembangunan.',
    images: [
      { src: '/images/project-4.jpg', alt: 'Perataan dan pemadatan lahan' },
      { src: '/images/project-10.jpg', alt: 'Pengurukan dan perataan area proyek' },
    ],
  },
  'Bangunan': {
    title: 'Proyek Gedung & Rumah Tinggal',
    description: 'Dokumentasi proyek pembangunan rumah tinggal, gudang, gedung pertemuan, pendopo, dan gereja.',
    images: [
      { src: '/images/project-5.jpg', alt: 'Pembangunan rumah tinggal' },
      { src: '/images/project-11.jpg', alt: 'Pembangunan gudang' },
      { src: '/images/project-12.jpg', alt: 'Pembangunan gedung pertemuan' },
    ],
  },
  'Atap & Baja': {
    title: 'Proyek Konstruksi Atap & Rangka Baja',
    description: 'Dokumentasi proyek pemasangan rangka baja ringan, roof covering, dan plafon PVC untuk berbagai bangunan.',
    images: [
      { src: '/images/project-6.jpg', alt: 'Pemasangan rangka baja ringan' },
      { src: '/images/project-13.jpg', alt: 'Instalasi roof covering' },
      { src: '/images/project-14.jpg', alt: 'Pemasangan plafon PVC' },
    ],
  },
  'Pagar & Komersial': {
    title: 'Proyek Pagar & Infrastruktur Komersial',
    description: 'Dokumentasi proyek pembuatan pagar rumah, pagar kantor, dan infrastruktur kawasan komersial.',
    images: [
      { src: '/images/project-15.jpg', alt: 'Pembuatan pagar rumah' },
      { src: '/images/project-16.jpg', alt: 'Pagar kawasan komersial' },
    ],
  },
}

// Helper: convert category name to URL slug
export function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'dan')
}

// Helper: convert URL slug back to category name
export function slugToCategory(slug: string): Exclude<Category, 'All'> | null {
  const map: Record<string, Exclude<Category, 'All'>> = {
    'jalan-dan-aspal': 'Jalan & Aspal',
    'talud-dan-drainase': 'Talud & Drainase',
    'perataan-tanah': 'Perataan Tanah',
    'bangunan': 'Bangunan',
    'atap-dan-baja': 'Atap & Baja',
    'pagar-dan-komersial': 'Pagar & Komersial',
  }
  return map[slug] || null
}
