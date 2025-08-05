'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const options = [
    { title: 'Home', href: 'home' },
    { title: 'Sobre', href: 'sobre' },
    { title: 'Planos', href: 'planos' },
    { title: 'Benefícios', href: 'beneficios' }
]

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false) // Fecha o menu ao clicar
        }
    };

    return (
        <header className="bg-[#00809de7] shadow w-full h-20 fixed top-0 z-50 flex items-center backdrop-blur-sm">
            <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <div className='flex items-center'>
                    <div className="w-12 h-12 flex justify-center">
                        <img
                            src="/world.png"
                            alt="Ilustração de produtos e blog"
                            className="w-full h-auto"
                        />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white ml-2">MyBlog</h1>
                </div>

                {/* Menu desktop */}
                <nav className="hidden md:flex">
                    <ul className="text-lg flex items-center space-x-8 text-white font-bold">
                        {options.map((option) => (
                            <li key={option.title}>
                                <button
                                    onClick={() => scrollToSection(option.href)}
                                    className="hover:text-[#FF7601] transition duration-200"
                                >
                                    {option.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Botões desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/login">
                        <button className="text-white hover:text-[#FF7601] font-bold transition">
                            Entrar
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="bg-[#FF7601] hover:bg-[#ff7801be] text-white px-4 py-2 rounded-lg font-semibold transition">
                            Cadastre-se
                        </button>
                    </Link>
                </div>

                {/* Botão mobile */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Menu mobile */}
            {menuOpen && (
                <div className="absolute top-20 left-0 w-full bg-[#00809de7] flex flex-col items-center space-y-4 py-4 md:hidden">
                    {options.map((option) => (
                        <button
                            key={option.title}
                            onClick={() => scrollToSection(option.href)}
                            className="text-white text-lg font-bold hover:cursor-pointer hover:text-[#FF7601] transition"
                        >
                            {option.title}
                        </button>
                    ))}
                    <Link href="/login" onClick={() => setMenuOpen(false)}>
                        <span className="text-white text-lg font-bold hover:text-[#FF7601] transition">
                            Entrar
                        </span>
                    </Link>
                    <Link href="/register" onClick={() => setMenuOpen(false)}>
                        <span className="bg-[#FF7601] hover:bg-[#ff7801be] text-white px-4 py-2 rounded-lg font-semibold transition">
                            Cadastre-se
                        </span>
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Navbar
