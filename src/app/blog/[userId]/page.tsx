'use client'

import { useAuth } from "@/hooks/useAuth"
import { Tfollowers } from "@/types/Tfollowers"
import { postSchema, TPost, TPostSchema } from "@/types/Tpost"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FaUserCheck } from "react-icons/fa"

export default function Blog() {
    const { userId } = useAuth()
    const [posts, setPosts] = useState<TPost[]>([])
    const [followingIds, setFollowingIds] = useState<number[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TPostSchema>({
        resolver: zodResolver(postSchema),
    })

    const formatting = new Intl.DateTimeFormat('pt-BR')

    // Buscar posts
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get(`https://my-blog-back-dzcr.onrender.com/posts/`, { withCredentials: true })
                setPosts(response.data)
            } catch (error) {
                console.error("Erro ao buscar posts:", error)
            }
        }

        fetchPosts()
    }, [userId])

    // Buscar lista de quem sigo
    useEffect(() => {
        if (!userId) return;
        async function fetchFollowing() {
            try {
                const response = await axios.get<Tfollowers[]>(`https://my-blog-back-dzcr.onrender.com/follows/following/${userId}`, { withCredentials: true })
                const ids = response.data.map((user:Tfollowers) => user.userId) // extrai os IDs dos usuários seguidos
                setFollowingIds(ids)
            } catch (error) {
                console.error("Erro ao buscar seguindo:", error)
            }
        }
        fetchFollowing()
    }, [userId])

    // Criar post novo
    const handleCreatePost = async (data: TPostSchema) => {
        const response = await axios.post(
            "https://my-blog-back-dzcr.onrender.com/posts",
            {
                post_title: data.title,
                post_resume: data.resume,
                post_content: data.content,
            },
            { withCredentials: true }
        )

        setPosts([response.data, ...posts])
        reset()
    }

    // Seguir usuário
    const handleFollow = async (authorId: number) => {
        try {
            await axios.post(
                "https://my-blog-back-dzcr.onrender.com/follows/follow",
                { following_id: authorId },
                { withCredentials: true }
            )
            setFollowingIds((prev) => [...prev, authorId])
        } catch (error) {
            console.error("Erro ao seguir usuário:", error)
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#00809D]">Feed BlogShop</h1>
            <form
                onSubmit={handleSubmit(handleCreatePost)}
                className="w-1/2 bg-gray-50 flex flex-col shadow-md rounded-lg p-6 border-2 border-[#00809D] space-y-4"
            >
                <h2 className="text-2xl font-bold text-[#ff7801]">Nova postagem</h2>

                <input
                    {...register("title")}
                    type="text"
                    placeholder="Título"
                    className="w-full bg-white px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00809D]"
                />

                <textarea
                    {...register("resume")}
                    placeholder="Escreva um resumo..."
                    className="w-full bg-white px-4 py-2 border rounded resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#00809D]"
                />

                <textarea
                    {...register("content")}
                    placeholder="Escreva o conteúdo..."
                    className="w-full bg-white px-4 py-2 border rounded resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#00809D]"
                />

                <button
                    type="submit"
                    className="bg-[#ff7801] hover:bg-[#cf9d71] text-white px-4 py-2 rounded text-sm transition"
                >
                    Publicar
                </button>
            </form>

            {posts.map((post: TPost) => {
                const isFollowingAuthor = followingIds.includes(post.post_authorId)
                const isOwnPost = post.post_authorId === userId

                return (
                    <div
                        key={post.post_id}
                        className="bg-gray-50 shadow-md rounded-lg p-6 border-2 border-[#00809D] hover:shadow-lg transition"
                    >
                        <div className="bg-[#00809D] flex items-center space-x-3 rounded-2xl  w-fit p-2">
                            <div className="w-10 h-10 bg-[#ff7801] text-white rounded-full flex items-center justify-center text-lg font-bold">
                                {post.post_authorName?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-white">{post.post_authorName}</h1>
                                <p className="text-sm text-white">
                                    Publicado em {post.post_date && formatting.format(new Date(post.post_date))}
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold text-black mt-2">{post.post_title}</h2>

                        <p className="text-black font-semibold mt-5">{post.post_resume}</p>
                        <p className="text-black mt-5">{post.post_content}</p>

                        <div className="mt-4">
                            {!isOwnPost && (
                                isFollowingAuthor ? (
                                    <button className="flex items-center gap-2 bg-green-400 px-4 py-1 rounded text-sm transition">
                                        <FaUserCheck className="text-base" />
                                        Seguindo
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleFollow(post.post_authorId)}
                                        className="flex items-center gap-2 bg-[#ff7801] hover:cursor-pointer text-white px-4 py-1 rounded text-sm transition"
                                    >
                                        <FaUserCheck className="text-base" />
                                        Seguir
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
