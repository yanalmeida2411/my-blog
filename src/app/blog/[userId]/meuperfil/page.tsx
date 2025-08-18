'use client'

import Loading from "@/common/Loading"
import MyProfile from "@/components/blog/MyProfile"
import { usePostController } from "@/controller/postController"
import { useAuth } from "@/hooks/useAuth"
import { usePostStore } from "@/store/postStore"
import { useEffect, useState } from "react"

export default function MeuPerfil() {
  const { userId, fullname } = useAuth()
  const { posts, setPosts } = usePostStore()
  const [loading, setLoading] = useState(false)

  // Hook customizado
  const { fetchUserPosts } = usePostController()

  useEffect(() => {
    if (!userId) return
    async function loadPosts() {
      setLoading(true)
      const myPosts = await fetchUserPosts(userId)
      setPosts(myPosts)
      setLoading(false)
    }
    loadPosts()
  }, [userId]) // dependências corretas

  if (loading) return (<Loading />)

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-gray-50 min-h-screen space-y-8">
      {/* Header perfil */}
      <header className="flex items-center gap-6 mb-10 bg-white p-6 rounded-lg shadow">
        <div className="w-28 h-28 bg-[#ff7801] text-white rounded-full flex items-center justify-center text-6xl font-bold">
          {fullname && fullname.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-semibold capitalize text-[#00809D]">
            {fullname}
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Meu Perfil</p>
        </div>
      </header>
      <MyProfile />
    </div>
  )
}
