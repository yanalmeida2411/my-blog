'use client'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'

export default function BlogLayout({ children }: { children: React.ReactNode }) {

    const { fullname, userId } = useAuth();
    const router = useRouter();

    const currentPage = usePathname()
    const isActive = (href: string) => {
        // Destaca exato ou qualquer subrota
        return currentPage === href 
    }


    const handleLogout = async () => {
        try {
            await axios.post("https://my-blog-back-dzcr.onrender.com/logout", {}, { withCredentials: true });
            router.push("/login");
        } catch (err) {
            console.error(err);
        }
    };

    if (!userId) {
        // pode retornar null pois userId ainda não chegou
        return null;
    }

    const links = [
        { name: "Início", href: `/blog/${userId.toString()}` },
        /* { name: "Produtos", href: `/blog/${userId.toString()}/produtos` }, */
        { name: "Seguidores", href: `/blog/${userId.toString()}/seguidores` },
        { name: "Seguindo", href: `/blog/${userId.toString()}/seguindo` },
        { name: "Meus Posts", href: `/blog/${userId.toString()}/meusposts` },
    ];


    return (
        <div className="min-h-screen bg-[#F5F7FA] text-[#1C1F2A]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 h-16 bg-[#00809D]  px-6 flex items-center justify-between z-50">
                <h1 className="text-4xl font-bold text-white">BlogShop</h1>

                {/* <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full rounded px-3 py-1 border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7601]"
                    />
                    <button className="bg-[#FF7601] hover:bg-[#e66f00] text-white rounded px-3 py-1 transition">
                        Procurar
                    </button>
                </div> */}

                <div>
                    <button
                        onClick={handleLogout}
                        className="text-xl font-bold text-white hover:text-[#FF7601] transition hover:cursor-pointer"
                        title="Sair"
                    >
                        Sair
                    </button>
                </div>
            </nav>

            {/* Corpo do blog */}
            <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
                {/* Sidebar esquerda */}
                <aside className="fixed w-50 bg-[#00809D] h-screen p-4 hidden lg:block border-r border-gray-200">
                    {fullname ? (
                        <div className="flex items-center mb-4 space-x-3">
                            {/* Avatar com a primeira letra */}
                            <div className="w-10 h-10 bg-[#FF7601] text-white rounded-full flex items-center justify-center text-lg font-bold">
                                {fullname.charAt(0).toUpperCase()}
                            </div>
                            {/* Nome do usuário */}
                            <h2 className="font-semibold text-white">{fullname.charAt(0).toUpperCase() + fullname.slice(1)}</h2>
                        </div>
                    ) : (
                        <h2 className="mb-4 font-semibold">Usuário não autorizado</h2>
                    )}
                    <ul className="space-y-2 text-white">
                        {links.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`${isActive(item.href) ? 'bg-[#FF7601]' : null} block p-2 rounded hover:bg-[#FF7601] hover:text-white transition font-semibold `}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full flex p-2 rounded hover:bg-[#FF7601] hover:text-white transition hover:cursor-pointer font-semibold"
                            title="Sair"
                        >
                            Sair
                        </button>
                    </ul>

                </aside>

                {/* Feed de conteúdo */}
                <main className="flex-1 p-4 ml-60">
                    {children}
                </main>
            </div>
        </div>
    );
} 