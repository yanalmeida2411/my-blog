import { useResponsive } from '@/hooks/useResponsive';
import React from 'react'
import { FiMenu, FiX } from 'react-icons/fi';

const BlogNavBar = () => {
    const { isDesktop, isExpanded, setIsExpanded } = useResponsive();
    return (
        <div>
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
        </div>
    )
}

export default BlogNavBar