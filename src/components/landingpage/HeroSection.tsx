import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
    return (
        <>
            <section
                id="home"
                className=" text-white min-h-screen flex flex-col md:flex-row items-center justify-between"
            >
                <Image src="/wallpaper-man-business.avif" alt="Logo do BlogShop"
                 width={1000} height={1000} className="absolute w-screen h-screen -z-1 object-cover  translate-y-10 " />
                <div className="max-w-xl mb-12 md:mb-0 text-center px-6 mt-25">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white ">
                        Conecte-se {" "}<span className="text-[#FF7601]">ao Mundo</span>
                    </h1>
                    <p className="text-lg text-white mb-8 font-bold">
                        Um espaço feito para você compartilhar suas ideias, histórias e se conectar com sua audiência através do seu próprio blog
                    </p>

                    <div className="flex gap-4 items-center justify-center">
                        <Link href="/register">
                            <button className="bg-[#FF7601] hover:bg-[#ff7801c0] text-white hover:cursor-pointer px-6 py-3 rounded-lg font-semibold transition">
                                Criar Conta Grátis
                            </button>
                        </Link>
                        <a href="#beneficios" className="text-white hover:text-[#FF7601] font-bold text-lg">
                            Ver Benefícios
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection