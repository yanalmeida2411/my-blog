'use client'

import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiLogOut, FiHome, FiUsers, FiUserCheck, FiFileText } from 'react-icons/fi'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const { fullname , userId } = useAuth()
  const router = useRouter()

  const currentPage = usePathname()
  const isActive = (href: string) => currentPage === href

  const handleLogout = async () => {
    try {
      await axios.post('https://my-blog-back-dzcr.onrender.com/logout', {}, { withCredentials: true })
      router.push('/login')
    } catch (err) {
      console.error(err)
    }
  }

  const [isExpanded, setIsExpanded] = useState(false) // mobile começa reduzido

  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024)
      if (window.innerWidth >= 1024) setIsExpanded(true)
      else setIsExpanded(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!userId) return null

  const links = [
    { name: 'Início', href: `/blog/${userId.toString()}`, icon: <FiHome size={20} /> },
    { name: 'Seguidores', href: `/blog/${userId.toString()}/seguidores`, icon: <FiUsers size={20} /> },
    { name: 'Seguindo', href: `/blog/${userId.toString()}/seguindo`, icon: <FiUserCheck size={20} /> },
    { name: 'Meus Posts', href: `/blog/${userId.toString()}/meusposts`, icon: <FiFileText size={20} /> },
  ]

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1C1F2A] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 w-full h-16 bg-[#00809D] px-4 sm:px-6 flex items-center justify-between z-50">
        <h1 className="text-2xl sm:text-4xl font-bold text-white">BlogShop</h1>

        {!isDesktop && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white focus:outline-none"
            aria-label={isExpanded ? 'Reduzir sidebar' : 'Expandir sidebar'}
          >
            {isExpanded ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        )}
      </nav>

      <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside
          className={`
            fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[#00809D] border-r border-gray-200 p-4 flex flex-col
            transition-all duration-300 ease-in-out z-40
            ${isDesktop ? 'w-60' : isExpanded ? 'w-44' : 'w-16'}
          `}
        >
          <div
            className={`mb-6 flex items-center justify-center
              ${isExpanded || isDesktop ? 'justify-start space-x-3' : 'flex-col'}
            `}
          >
            <div className="w-10 h-10 bg-[#FF7601] text-white rounded-full flex items-center justify-center text-lg font-bold">
              {fullname && fullname.charAt(0).toUpperCase()}
            </div>
            {(isExpanded || isDesktop) && (
              <h2 className="font-semibold text-white capitalize whitespace-nowrap">{fullname}</h2>
            )}
          </div>

          <ul className="flex flex-col flex-grow space-y-2 text-white">
            {links.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 rounded p-2 hover:bg-[#FF7601] hover:text-white transition font-semibold whitespace-nowrap
                    ${isActive(item.href) ? 'bg-[#FF7601]' : ''}
                    ${!isExpanded && !isDesktop ? 'justify-center' : ''}
                  `}
                  title={!isExpanded && !isDesktop ? item.name : undefined}
                >
                  {item.icon}
                  {(isExpanded || isDesktop) && <span>{item.name}</span>}
                </Link>
              </li>
            ))}

            <button
              onClick={handleLogout}
              className={`mt-auto flex items-center gap-3 p-2 rounded hover:bg-[#FF7601] hover:text-white transition font-semibold
                ${!isExpanded && !isDesktop ? 'justify-center' : ''}
              `}
              title="Sair"
            >
              <FiLogOut size={20} />
              {(isExpanded || isDesktop) && 'Sair'}
            </button>
          </ul>
        </aside>

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
