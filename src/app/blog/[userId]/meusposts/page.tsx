'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { TPost } from '@/types/Tpost'
import { useAuth } from '@/hooks/useAuth'

export default function MeusPostsPage() {
  const [myPosts, setMyPosts] = useState<TPost[]>([])
  const { userId } = useAuth()

  const formatting = new Intl.DateTimeFormat('pt-BR');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(`https://my-blog-back-dzcr.onrender.com/posts/author/${userId}`,
          { withCredentials: true })
        setMyPosts(response.data)
      } catch (error) {
        console.error("Erro ao buscar posts:", error)
      }
    }

    fetchPosts()
  }, [userId])

  const handleDeletePost = async (id: number) => {

    try {
      const response = await axios.delete(`https://my-blog-back-dzcr.onrender.com/posts/${id}`,
        { withCredentials: true })
      setMyPosts(prevPosts => prevPosts.filter(post => post.post_id !== id))
    } catch (error) {
      console.error("Erro ao deletar o post:", error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#00809D]">Meus Posts</h1>

      {myPosts.length === 0 ? (
        <p className="text-gray-500">Você ainda não publicou nenhum post.</p>
      ) : (
        myPosts.map((post: TPost) => (
          <div
            key={post.post_id}
            className="bg-white shadow-md rounded-lg p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-[#1C1F2A]">
              {post.post_title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-2">
              Publicado em{" "}
              {post.post_date
                ? formatting.format(new Date(post.post_date))
                : "Data inválida"}
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              {post.post_resume}
            </p>
            <p className="text-sm sm:text-base text-gray-700 mt-3 sm:mt-5">
              {post.post_content}
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleDeletePost(post.post_id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition hover:cursor-pointer w-full sm:w-auto"
              >
                Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>

  )
}