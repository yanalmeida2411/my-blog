'use client'

import { useAuth } from "@/hooks/useAuth"
import { TPost } from "@/types/Tpost"
import axios from "axios"
import { useEffect, useState } from "react"

export default function MeuPerfil() {
  const { userId, fullname } = useAuth()
  const [posts, setPosts] = useState<TPost[]>([])
  const [loading, setLoading] = useState(true)

  const formatting = new Intl.DateTimeFormat('pt-BR')

  useEffect(() => {
    async function fetchPosts() {
      if (!userId) return
      setLoading(true)
      try {
        const response = await axios.get(`https://my-blog-back-dzcr.onrender.com/posts/`, { withCredentials: true })
        // filtrar só posts do usuário logado
        const meusPosts = response.data.filter((post: TPost) => post.post_authorId === userId)
        setPosts(meusPosts)
      } catch (error) {
        console.error("Erro ao buscar posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [userId])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#00809D]"></div>
      </div>
    )
  }

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

      {/* Lista dos meus posts */}
      <section className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Você ainda não publicou nenhum post.</p>
        ) : (
          posts.map((post: TPost) => (
            <article
              key={post.post_id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold text-[#00809D] mb-2">{post.post_title}</h2>
              <p className="text-black font-semibold mb-4">{post.post_resume}</p>
              <p className="text-black mb-4">{post.post_content}</p>
              <small className="text-gray-500">
                Publicado em {post.post_date && formatting.format(new Date(post.post_date))}
              </small>
            </article>
          ))
        )}
      </section>
    </div>
  )
}
