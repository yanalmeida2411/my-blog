'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Loading from '@/common/Loading'
import Login from '@/components/form/Login'
import { useLoadingStore } from '@/store/loadingStore'

const LoginPage = () => {
  const { loading } = useLoadingStore()
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <Image src="/wallpaper.jpg" alt="Logo do BlogShop"
          width={1000} height={1000} className="absolute w-screen h-screen -z-1 object-cover opacity-20 " />
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {loading ? (<Loading />) : (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center text-[#ff7801]">Login</h2>
              <Login />
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
          )}
        </div>
      </main>
    </>
  )
}

export default LoginPage