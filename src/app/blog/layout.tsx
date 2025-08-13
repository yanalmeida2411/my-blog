'use client'

import BlogAside from '@/components/blog/BlogAside'
import BlogNavBar from '@/components/blog/BlogNavBar'
import { useAuth } from '@/hooks/useAuth'
import { useResponsive } from '@/hooks/useResponsive'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const { userId } = useAuth();
  const { isDesktop, isExpanded, setIsExpanded } = useResponsive();

  if (!userId) return null

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1C1F2A] overflow-x-hidden">
      <BlogNavBar />

      <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <BlogAside />

        {/* Conteúdo principal */}
        <main
          className={`flex-1 p-4 transition-all duration-300 ease-in-out
            ${isDesktop ? 'ml-60' : isExpanded ? 'ml-44' : 'ml-16'}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  )
}