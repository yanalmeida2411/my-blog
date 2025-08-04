'use client'

import React from 'react'
import Link from 'next/link'

const options = [
    { title: 'Home', href: 'home' },
    { title: 'Sobre', href: 'sobre' },
    { title: 'Planos', href: 'planos' },
    { title: 'Benefícios', href: 'beneficios' }
]

const Navbar = () => {
    const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
    return (
        <header className="bg-[#00809de7] shadow w-full h-20 fixed top-0 z-50 flex items-center backdrop-blur-sm">
            <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className='flex items-center'>
                    <div className="w-15 h-15 flex justify-center">
                        <img
                            src="/world.png"
                            alt="Ilustração de produtos e blog"
                            className="max-w-md w-full"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-white">MyBlog</h1>
                </div>

                <nav>
                    <ul className="text-lg hidden md:flex items-center space-x-8 text-white font-bold">
                        {options.map((option) => (
                            <li key={option.title}>
                                <button  onClick={()=>scrollToSection(option.href)}
                                    className="hover:text-[#FF7601] transition duration-200 hover:cursor-pointer"
                                >
                                    {option.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/login">
                        <button className="text-white hover:text-[#FF7601] hover:cursor-pointer font-bold transition">
                            Entrar
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="bg-[#FF7601] hover:bg-[#ff7801be] text-white hover:cursor-pointer px-4 py-2 rounded-lg font-semibold transition">
                            Cadastre-se
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar