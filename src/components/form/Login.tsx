'use client'
import { FaLock, FaUser } from 'react-icons/fa'
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { loginSchema, TLoginSchema } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Login() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: TLoginSchema) => {
        try {
            // Axios precisa ter withCredentials para enviar e receber cookies
            const response = await axios.post(
                "https://my-blog-back-dzcr.onrender.com/login",
                {
                    email: data.email,
                    password: data.password,
                },
                { withCredentials: true }
            );

            const { userId } = response.data;

            router.push(`blog/${userId}`);
        } catch (err) {
            console.error(err);
        }

        reset();
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <Image src="/wallpaper.jpg" alt="Logo do BlogShop"
                width={1000} height={1000} className="absolute w-screen h-screen -z-1 object-cover opacity-20 " />
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#ff7801]">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* E-mail */}
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            {...register('email')}
                            type="text"
                            placeholder="Email"
                            className="w-full bg-white text-black rounded-lg py-3 pl-10 pr-4 outline-none border border-[#00809D] focus:ring-2 focus:ring-[#00809D]"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-600 text-sm font-bold">{`${errors.email.message}`}</p>
                    )}
                    {/* Senha */}
                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Senha"
                            className="w-full bg-white text-black rounded-lg py-3 pl-10 pr-4 outline-none border border-[#00809D] focus:ring-2 focus:ring-[#00809D]"
                        />
                    </div>
                    {errors.password && (
                        <p className="text-red-600 text-sm font-bold">{`${errors.password.message}`}</p>
                    )}

                    {/* Botão */}
                    <div className='flex space-x-5 items-center'>
                        <button
                            type="submit"
                            className="w-1/2 bg-[#ff7801] hover:bg-[#ff7801ab] hover:cursor-pointer text-white font-semibold py-3 rounded-lg transition"
                        >
                            Entrar
                        </button>
                        <Link href={'/'} className='w-1/2 text-center bg-[#00809D] text-white px-5 py-3 rounded-lg hover:bg-[#00809dad] transition font-bold'>
                            Home
                        </Link>
                    </div>

                </form>
                <div className='flex flex-col items-center '>
                    <p className="mt-6 text-md text-center text-[#00809D]">
                        Ainda não tem uma conta?
                        <br></br>
                        <Link href="/register" className=" text-2xl text-[#00809D] hover:underline font-bold ">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}