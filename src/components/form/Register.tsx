'use client'
import { useRegister } from '@/controller/userController'
import { registerSchema, TRegisterSchema } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TRegisterSchema>({
        resolver: zodResolver(registerSchema),
    })

    const { handleRegister } = useRegister()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const onSubmit = async (data: TRegisterSchema) => {
        handleRegister(data)
        reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        {...register('fullname')}
                        type="text"
                        placeholder="Nome completo"
                        className="w-full bg-white text-black rounded-lg py-3 pl-10 pr-4 outline-none border border-[#00809D] focus:ring-2 focus:ring-[#00809D]"
                    />
                </div>
                {errors.fullname && (
                    <p className="text-red-600 text-sm font-bold">{`${errors.fullname.message}`}</p>
                )}
                <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        {...register('user')}
                        type="text"
                        placeholder="Usuário"
                        className="w-full bg-white text-black rounded-lg py-3 pl-10 pr-4 outline-none border border-[#00809D] focus:ring-2 focus:ring-[#00809D]"
                    />
                </div>
                {errors.user && (
                    <p className="text-red-600 text-sm font-bold">{`${errors.user.message}`}</p>
                )}
                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="E-mail"
                        className="w-full bg-white text-black rounded-lg py-3 pl-10 pr-4 outline-none border border-[#00809D] focus:ring-2 focus:ring-[#00809D]"
                    />
                </div>
                {errors.email && (
                    <p className="text-red-600 text-sm font-bold">{`${errors.email.message}`}</p>
                )}
                <div className="relative flex items-center">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        {...register('password')}
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        className="w-full bg-white text-black rounded-lg py-3 pl-10 pr-4 outline-none border border-[#00809D] focus:ring-2 focus:ring-[#00809D]"
                    />
                    <div onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-5 text-lg text-gray-400'>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </div>
                </div>
                {errors.password && (
                    <p className="text-red-600 text-sm font-bold">{`${errors.password.message}`}</p>
                )}
                <div className="relative flex items-center">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        {...register('confirmPassword')}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirmar Senha"
                        className="w-full bg-white text-black rounded-lg py-3 pl-10 pr-4 outline-none border border-[#00809D] focus:ring-2 focus:ring-[#00809D]"
                    />
                    <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-5 text-lg text-gray-400'>
                        {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </div>
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-600 text-sm font-bold">{`${errors.confirmPassword.message}`}</p>
                )}
                <div className='flex space-x-5 items-center'>
                    <button
                        type="submit"
                        className="w-1/2 bg-[#ff7801] hover:bg-[#ff7801ab] hover:cursor-pointer text-white font-semibold py-3 rounded-lg transition"
                    >
                        Cadastrar
                    </button>
                    <Link href={'/'} className='w-1/2 text-center bg-[#00809D] text-white px-5 py-3 rounded-lg hover:bg-[#00809dad] transition font-bold'>
                        Home
                    </Link>
                </div>
            </form>
        </>
    )
}

export default Register