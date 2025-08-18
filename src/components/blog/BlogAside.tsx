import { blogLinks } from '@/constants/asideLink';
import { useLogout } from '@/controller/userController';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/useResponsive';
import { Tlinks } from '@/types/Tlinks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { FiLogOut } from 'react-icons/fi';

const BlogAside = () => {
    const { fullname, userId } = useAuth();
    const { isDesktop, isExpanded } = useResponsive();
    const currentPage = usePathname()
    const { handleLogout } = useLogout();
    const links: Tlinks[] = blogLinks(userId)
    const isActive = (href: string) => currentPage === href

    return (
        < div >
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
                    {links.map((item: Tlinks) => (
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
                        className={`mt-auto flex items-center gap-3 p-2 rounded hover:bg-[#FF7601] hover:cursor-pointer hover:text-white transition font-semibold
                ${!isExpanded && !isDesktop ? 'justify-center' : ''}
              `}
                        title="Sair"
                    >
                        <FiLogOut size={20} />
                        {(isExpanded || isDesktop) && 'Sair'}
                    </button>
                </ul>
            </aside>
        </div >
    )
}

export default BlogAside