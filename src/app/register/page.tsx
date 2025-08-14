'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Register from '@/components/form/Register'

const RegisterPage = () => {

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Image src="/wallpaper.jpg" alt="Logo do BlogShop"
        width={1000} height={1000} className="absolute w-screen h-screen -z-1 object-cover opacity-20" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-[#ff7801]">Crie sua conta</h2>
        <Register />
        <div className='flex flex-col items-center '>
          <p className="mt-6 text-md text-center text-[#00809D] ">
            Já tem uma conta?
            <br></br>
            <Link href="/login" className="text-2xl text-[#00809D] hover:underline font-bold">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage