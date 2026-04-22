export const categories = ['All', 'Aspal', 'Kontraktor Aspal', 'Talud', 'Bahu Jalan'] as const

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
    alt: 'Pengaspalan jalan raya',
    label: 'Pengaspalan Jalan Raya',
    category: 'Aspal',
    type: 'Aspal / Portofolio',
  },
  {
    src: '/images/project-2.jpg',
    alt: 'Kontraktor aspal jalan',
    label: 'Kontraktor Aspal',
    category: 'Kontraktor Aspal',
    type: 'Kontraktor Aspal / Portofolio',
  },
  {
    src: '/images/project-3.jpg',
    alt: 'Pembangunan talud penahan tanah',
    label: 'Pembangunan Talud',
    category: 'Talud',
    type: 'Talud / Portofolio',
  },
  {
    src: '/images/project-4.jpg',
    alt: 'Perbaikan bahu jalan',
    label: 'Perbaikan Bahu Jalan',
    category: 'Bahu Jalan',
    type: 'Bahu Jalan / Portofolio',
  },
  {
    src: '/images/project-5.jpg',
    alt: 'Pengaspalan area parkir',
    label: 'Pengaspalan Area Parkir',
    category: 'Aspal',
    type: 'Aspal / Portofolio',
  },
  {
    src: '/images/project-6.jpg',
    alt: 'Pekerjaan kontraktor aspal',
    label: 'Pekerjaan Kontraktor Aspal',
    category: 'Kontraktor Aspal',
    type: 'Kontraktor Aspal / Portofolio',
  },
]

// Data galeri lengkap per kategori (untuk halaman detail portofolio)
export const galleryData: Record<Exclude<Category, 'All'>, { title: string; description: string; images: { src: string; alt: string }[] }> = {
  Aspal: {
    title: 'Proyek Aspal',
    description: 'Dokumentasi proyek pengaspalan jalan, area parkir, dan infrastruktur lainnya yang telah kami kerjakan.',
    images: [
      { src: '/images/project-1.jpg', alt: 'Pengaspalan jalan raya' },
      { src: '/images/project-5.jpg', alt: 'Pengaspalan area parkir' },
      { src: '/images/project-7.jpg', alt: 'Proyek aspal jalan desa' },
    ],
  },
  'Kontraktor Aspal': {
    title: 'Proyek Kontraktor Aspal',
    description: 'Dokumentasi proyek kontraktor aspal untuk jalan raya, area parkir, dan infrastruktur lainnya yang telah kami kerjakan.',
    images: [
      { src: '/images/project-2.jpg', alt: 'Kontraktor aspal jalan raya' },
      { src: '/images/project-6.jpg', alt: 'Pekerjaan kontraktor aspal' },
      { src: '/images/project-8.jpg', alt: 'Kontraktor aspal area gudang' },
    ],
  },
  Talud: {
    title: 'Proyek Talud',
    description: 'Dokumentasi proyek pembangunan talud penahan tanah untuk stabilisasi lereng dan perkuatan tebing.',
    images: [
      { src: '/images/project-3.jpg', alt: 'Pembangunan talud penahan tanah' },
      { src: '/images/project-9.jpg', alt: 'Talud beton bertulang' },
    ],
  },
  'Bahu Jalan': {
    title: 'Proyek Bahu Jalan',
    description: 'Dokumentasi proyek perbaikan dan pembangunan bahu jalan untuk meningkatkan keselamatan dan kenyamanan pengguna jalan.',
    images: [
      { src: '/images/project-4.jpg', alt: 'Perbaikan bahu jalan' },
      { src: '/images/project-7.jpg', alt: 'Pembangunan bahu jalan baru' },
    ],
  },
}

// Helper: convert category name to URL slug
export function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-')
}

// Helper: convert URL slug back to category name
export function slugToCategory(slug: string): Exclude<Category, 'All'> | null {
  const map: Record<string, Exclude<Category, 'All'>> = {
    aspal: 'Aspal',
    'kontraktor-aspal': 'Kontraktor Aspal',
    talud: 'Talud',
    'bahu-jalan': 'Bahu Jalan',
  }
  return map[slug] || null
}
