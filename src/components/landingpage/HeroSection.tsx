import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
    return (
        <>
            <section
                id="home"
                className="relative text-white min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between px-4 sm:px-6 md:px-12 lg:px-20"
            >
                {/* Imagem de fundo cobrindo toda a tela */}
                <Image
                    src="/wallpaper-man-business.avif"
                    alt="Logo do BlogShop"
                    fill
                    priority
                    className="absolute inset-0 w-full h-full object-cover object-center -z-10 opacity-85"
                />

                {/* Texto */}
                <div className="max-w-xl mb-12 md:mb-0 text-center md:text-left px-2 sm:px-6 mt-20 sm:mt-28 md:mt-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        Conecte-se{" "}
                        <span className="text-[#FF7601]">ao Mundo</span>
                    </h1>
                    <p className="text-base sm:text-lg mb-8 font-bold">
                        Um espaço feito para você compartilhar suas ideias, histórias e se conectar com sua audiência através do seu próprio blog
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center sm:justify-start justify-center">
                        <Link href="/register">
                            <button className="bg-[#FF7601] hover:bg-[#ff7801c0] hover:cursor-pointer text-white px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto">
                                Criar Conta Grátis
                            </button>
                        </Link>
                        <a
                            href="#beneficios"
                            className="text-white hover:text-[#FF7601] hover:cursor-pointer font-bold text-lg"
                        >
                            Ver Benefícios
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection
