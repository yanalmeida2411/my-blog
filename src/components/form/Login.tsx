'use client'

import { loginSchema, TLoginSchema } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FaLock, FaUser } from "react-icons/fa"
import { useLogin } from "@/controller/userController"

export default function Login() {

  const { handleLogin } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const [seePassword, setSeePassword] = useState<boolean>(false)

  const onSubmit = async (data: TLoginSchema) => {
    await handleLogin(data, reset);
  };

  return (
    <>
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
        <div className="relative flex items-center">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            {...register('password')}
            type={seePassword ? "text" : "password"}
            placeholder="Senha"
            className="w-full bg-white text-black rounded-lg py-3 pl-10 pr-4 outline-none border border-[#00809D] focus:ring-2 focus:ring-[#00809D]"
          />
          <div onClick={() => setSeePassword(!seePassword)}
            className='absolute right-5 text-lg text-gray-400'>
            {seePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
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
    </>
  )
}