import Image from 'next/image'
import { FaCheckCircle } from 'react-icons/fa'

export default function Plans() {
    return (
        <section id="planos" className=" w-full py-20 min-h-screen flex items-center justify-end ">
            <Image src="/global2.jpg" alt="Logo do BlogShop"
                width={1000} height={1000} className="absolute w-screen h-screen -z-1 object-cover" />
            <div className="max-w-4xl mx-auto text-center ">
                <div className="bg-[#ffffffe0] backdrop-blur-sm rounded-xl shadow-lg p-10 border-2 border-[#FF7601]">
                    <h3 className="text-3xl font-bold text-[#FF7601] mb-4">Gratuito para sempre</h3>
                    <p className="text-lg text-[#00809D] mb-10 font-semibold">
                        Acreditamos que todo criador merece uma chance de crescer — por isso,<br /> o MyBlog é
                        <span className="text-[#FF7601] font-bold"> 100% gratuito</span>.
                    </p>
                    <ul className="text-left text-[#00809D] font-semibold space-y-4">
                        <li className="flex items-center gap-3">
                            <FaCheckCircle className="text-[#FF7601]" />
                            Crie e publique seus posts ilimitadamente
                        </li>
                        <li className="flex items-center gap-3">
                            <FaCheckCircle className="text-[#FF7601]" />
                            Personalize seu blog do seu jeito
                        </li>
                        <li className="flex items-center gap-3">
                            <FaCheckCircle className="text-[#FF7601]" />
                            Compartilhe suas histórias e conquiste seguidores
                        </li>
                        <li className="flex items-center gap-3">
                            <FaCheckCircle className="text-[#FF7601]" />
                            Suporte via e-mail
                        </li>
                    </ul>

                    <div className="mt-8">
                        <a
                            href="/register"
                            className="bg-[#FF7601] hover:bg-[#ff7801c0] text-white font-bold px-6 py-3 rounded-lg transition"
                        >
                            Começar Gratuitamente
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}