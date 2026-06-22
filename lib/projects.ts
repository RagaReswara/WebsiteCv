export const categories = ['All', 'Aspal', 'Talud', 'Drainase', 'Perataan Tanah', 'Cor Beton', 'Rangka Atap', 'Proyek Lainnya'] as const

export type Category = (typeof categories)[number]

export interface Project {
  src: string
  alt: string
  label: string
  category: Exclude<Category, 'All'>
  type: string
}

export interface ProgressGroup {
  title: string
  description: string
  thumbnail: string
  phases: {
    label: string
    src?: string
    alt?: string
    images?: {
      src: string
      alt: string
    }[]
  }[]
}

// Data utama yang tampil di halaman utama (portfolio section)
export const projects: Project[] = [
  {
    src: '/images/drainase-3.jpg',
    alt: 'Pemasangan saluran u-ditch beton menggunakan excavator untuk drainase desa',
    label: 'Pemasangan Saluran U-Ditch Beton',
    category: 'Drainase',
    type: 'Sistem Drainase',
  },
  {
    src: '/images/project-1.jpg',
    alt: 'Proses penghamparan aspal hotmix jalan desa',
    label: 'Penghamparan Aspal Hotmix',
    category: 'Aspal',
    type: 'Pengaspalan Hotmix',
  },
  {
    src: '/images/project-2.jpg',
    alt: 'Pemadatan aspal dengan mesin roller SAKAI',
    label: 'Pemadatan Aspal dengan Roller',
    category: 'Aspal',
    type: 'Pemadatan Aspal',
  },
  {
    src: '/images/project-7.jpg',
    alt: 'Proses pengaspalan jalan dengan finisher dan pekerja',
    label: 'Pengaspalan Jalan dengan Finisher',
    category: 'Aspal',
    type: 'Pengaspalan Jalan',
  },
  {
    src: '/images/talud-2.jpg',
    alt: 'Persiapan material batu sungai dan pengerjaan pondasi talud',
    label: 'Pembangunan Talud Penahan Tanah',
    category: 'Talud',
    type: 'Talud & Irigasi',
  },
  {
    src: '/images/drainase-1.jpg',
    alt: 'Pemasangan buis beton dan pengerjaan drainase air desa',
    label: 'Sistem Drainase Air Desa',
    category: 'Drainase',
    type: 'Sistem Drainase',
  },
  {
    src: '/images/perataan-1.jpg',
    alt: 'Perataan jalan desa menggunakan excavator',
    label: 'Perataan & Pemadatan Lahan',
    category: 'Perataan Tanah',
    type: 'Perataan Lahan',
  },
  {
    src: '/images/cor-beton-1.jpg',
    alt: 'Penuangan beton segar dari truk molen ke jalan desa',
    label: 'Pengecoran Beton Jalan Desa',
    category: 'Cor Beton',
    type: 'Cor Beton & Semen',
  },
  {
    src: '/images/rangka-hasil-1.jpg',
    alt: 'Hasil akhir interior — plafon PVC dekoratif dengan motif kayu dan lampu downlight terpasang rapi',
    label: 'Pemasangan Rangka Baja Ringan',
    category: 'Rangka Atap',
    type: 'Rangka Baja Ringan',
  },
  {
    src: '/images/lainnya-5.jpg',
    alt: 'Konstruksi jembatan penghubung desa / box culvert dengan penyangga bambu',
    label: 'Konstruksi Jembatan & Infrastruktur',
    category: 'Proyek Lainnya',
    type: 'Proyek Infrastruktur',
  },
  {
    src: '/images/aspal-9.jpg',
    alt: 'Tim pekerja melakukan penghamparan aspal jalan desa',
    label: 'Penghamparan Aspal Jalan Desa',
    category: 'Aspal',
    type: 'Pengaspalan Jalan',
  },
  {
    src: '/images/talud-3.jpg',
    alt: 'Struktur dinding talud penahan tanah di samping lahan pertanian',
    label: 'Pembangunan Talud Penahan Tanah Lahan Tani',
    category: 'Talud',
    type: 'Talud & Irigasi',
  },
]

// Data galeri lengkap per kategori (untuk halaman detail portofolio)
export const galleryData: Record<Exclude<Category, 'All'>, { title: string; description: string; images: { src: string; alt: string; section?: string }[]; progressGroups?: ProgressGroup[] }> = {
  'Aspal': {
    title: 'Proyek Aspal',
    description: 'Dokumentasi proyek pengaspalan hotmix, pemadatan jalan, dan penghamparan aspal yang telah kami kerjakan.',
    images: [
      { src: '/images/project-1.jpg', alt: 'Penghamparan aspal hotmix jalan desa' },
      { src: '/images/project-2.jpg', alt: 'Pemadatan aspal dengan mesin roller' },
      { src: '/images/project-7.jpg', alt: 'Pengaspalan jalan dengan finisher dan pekerja' },
      { src: '/images/aspal-4.jpg', alt: 'Pengaspalan jalan malam hari dengan finisher' },
      { src: '/images/aspal-5.jpg', alt: 'Mobilisasi alat berat finisher di malam hari' },
      { src: '/images/aspal-6.jpg', alt: 'Proses penghamparan aspal siang hari dengan tim pekerja' },
      { src: '/images/aspal-7.jpg', alt: 'Pemadatan aspal dengan roller' },
      { src: '/images/aspal-8.jpg', alt: 'Proses perataan aspal hotmix di area pemukiman warga' },
      { src: '/images/aspal-9.jpg', alt: 'Tim pekerja melakukan penghamparan aspal jalan desa' },
      { src: '/images/aspal-10.jpg', alt: 'Pekerja merapikan pengaspalan jalan perkotaan' },
      { src: '/images/aspal-11.jpg', alt: 'Penyemprotan lapis perekat (prime coat) cairan aspal' },
    ],
  },
  'Talud': {
    title: 'Proyek Talud & Irigasi',
    description: 'Dokumentasi proyek pembangunan talud penahan tanah serta sistem saluran irigasi beton.',
    images: [
      { src: '/images/talud-2.jpg', alt: 'Persiapan material batu sungai dan pengerjaan pondasi talud', section: 'Konstruksi Talud Penahan Tanah' },
      { src: '/images/talud-3.jpg', alt: 'Struktur dinding talud penahan tanah di samping lahan pertanian', section: 'Konstruksi Talud Penahan Tanah' },
      { src: '/images/talud-4.jpg', alt: 'Pembangunan talud saluran air panjang dengan batu sungai', section: 'Konstruksi Talud Penahan Tanah' },
      { src: '/images/talud-5.jpg', alt: 'Plesteran dan perapian bagian atas dinding talud jalan', section: 'Konstruksi Talud Penahan Tanah' },
      { src: '/images/irigasi-1.jpg', alt: 'Saluran irigasi beton panjang melintasi kawasan persawahan', section: 'Konstruksi Saluran Irigasi' },
      { src: '/images/irigasi-2.jpg', alt: 'Konstruksi saluran irigasi beton modular di area perkebunan', section: 'Konstruksi Saluran Irigasi' },
      { src: '/images/irigasi-3.jpg', alt: 'Saluran irigasi pertanian dengan dinding beton', section: 'Konstruksi Saluran Irigasi' },
      { src: '/images/irigasi-5.jpg', alt: 'Pekerja merakit dan menyemen dinding batu saluran irigasi', section: 'Konstruksi Saluran Irigasi' },
    ],
  },
  'Drainase': {
    title: 'Proyek Drainase',
    description: 'Dokumentasi proyek pembangunan saluran drainase air, gorong-gorong beton, dan sumur resapan.',
    images: [
      { src: '/images/drainase-1.jpg', alt: 'Pemasangan buis beton dan pengerjaan drainase air desa' },
      { src: '/images/drainase-2.jpg', alt: 'Konstruksi gorong-gorong dan pipa drainase bawah tanah' },
      { src: '/images/drainase-3.jpg', alt: 'Pemasangan saluran u-ditch beton menggunakan excavator untuk drainase desa' },
    ],
  },
  'Perataan Tanah': {
    title: 'Proyek Perataan & Pemadatan Tanah',
    description: 'Dokumentasi proyek perataan lahan, pengurukan, dan pemadatan tanah untuk persiapan pembangunan.',
    images: [
      { src: '/images/perataan-1.jpg', alt: 'Perataan jalan desa menggunakan excavator' },
      { src: '/images/perataan-2.jpg', alt: 'Pekerjaan pengurukan dan pemadatan tanah lahan proyek' },
    ],
  },
  'Cor Beton': {
    title: 'Proyek Cor Beton',
    description: 'Dokumentasi proyek pengecoran jalan beton (corblok), pelataran, halaman, dan konstruksi cor beton lainnya.',
    images: [
      { src: '/images/cor-beton-1.jpg', alt: 'Penuangan beton segar dari truk molen ke jalan desa' },
      { src: '/images/cor-beton-2.jpg', alt: 'Perataan dan finishing permukaan cor beton jalan kampung' },
      { src: '/images/cor-beton-3.jpg', alt: 'Tim pekerja mengerjakan pengecoran beton dengan molen portable' },
    ],
  },
  'Rangka Atap': {
    title: 'Proyek Konstruksi Atap & Rangka Baja',
    description: 'Dokumentasi proyek pemasangan rangka baja ringan, roof covering, dan plafon PVC untuk berbagai bangunan.',
    images: [

    ],
    progressGroups: [
      {
        title: 'Renovasi Atap & Plafon Gedung',
        description: 'Proses renovasi total atap dan pemasangan plafon PVC dekoratif pada gedung serbaguna.',
        thumbnail: '/images/rangka-hasil-1.jpg',
        phases: [
          /*
          {
            label: 'Sebelum',
            images: [
              { src: '/images/rangka-before-1.jpg', alt: 'Kondisi bangunan sebelum renovasi atap — tampak luar gedung dengan atap lama' }
            ]
          },
          */
          {
            label: 'Proses',
            images: [
              { src: '/images/rangka-proses-1.jpg', alt: 'Proses pengerjaan - interior gedung dengan rangka atap terbuka dan scaffolding terpasang' }
            ]
          },
          {
            label: 'Selesai',
            images: [
              { src: '/images/rangka-hasil-1.jpg', alt: 'Hasil akhir interior - plafon PVC dekoratif dengan motif kayu dan lampu downlight terpasang rapi' },
              { src: '/images/rangka-before-1.jpg', alt: 'Hasil akhir tampak luar - atap gedung selesai direnovasi' }
            ]
          }
        ],
      },
    ],
  },
  'Proyek Lainnya': {
    title: 'Proyek Lainnya & Pagar',
    description: 'Dokumentasi berbagai proyek pembuatan pagar rumah, pagar kantor, serta infrastruktur pendukung lainnya.',
    images: [
      { src: '/images/lainnya-3.jpg', alt: 'Pekerjaan galian tanah untuk pembuatan sumur resapan' },
      { src: '/images/lainnya-4.jpg', alt: 'Pemasangan buis beton modular untuk konstruksi sumur resapan' },
      { src: '/images/lainnya-5.jpg', alt: 'Konstruksi jembatan penghubung desa / box culvert dengan penyangga bambu' },
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
    'aspal': 'Aspal',
    'talud': 'Talud',
    'drainase': 'Drainase',
    'perataan-tanah': 'Perataan Tanah',
    'cor-beton': 'Cor Beton',
    'rangka-atap': 'Rangka Atap',
    'proyek-lainnya': 'Proyek Lainnya',
  }
  return map[slug] || null
}
