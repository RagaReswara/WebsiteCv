'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { categoryToSlug } from '@/lib/projects'

export default function PortfolioIndex() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the first category (Aspal) by default
    router.replace(`/portofolio/${categoryToSlug('Aspal')}`)
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1E2A35]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
        <p className="text-sm text-slate-400">Memuat portofolio...</p>
      </div>
    </div>
  )
}
