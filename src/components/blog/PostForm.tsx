import { usePostController } from '@/controller/postController'
import { usePostStore } from '@/store/postStore'
import { postSchema, TPostSchema } from '@/types/Tpost'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

const PostForm = () => {
    const { posts, setPosts } = usePostStore()

    const { createPost } = usePostController()

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<TPostSchema>({
        resolver: zodResolver(postSchema),
    })

    const handleCreatePost = async (data: TPostSchema) => {
        const newPost = await createPost(data);
        if (newPost) {
            setPosts([newPost, ...posts]);
            reset();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleCreatePost)}
            className="w-full sm:w-11/12 lg:w-1/2 bg-gray-50 flex flex-col shadow-md rounded-lg p-4 sm:p-6 border-2 border-[#00809D] space-y-4"
        >
            <h2 className="text-xl sm:text-2xl font-bold text-[#ff7801]">Nova postagem</h2>

            <input
                {...register("title")}
                type="text"
                placeholder="Título"
                className="w-full bg-white px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00809D]"
            />

            <textarea
                {...register("resume")}
                placeholder="Escreva um resumo..."
                className="w-full bg-white px-4 py-2 border rounded resize-none h-28 sm:h-24 focus:outline-none focus:ring-2 focus:ring-[#00809D]"
            />

            <textarea
                {...register("content")}
                placeholder="Escreva o conteúdo..."
                className="w-full bg-white px-4 py-2 border rounded resize-none h-32 sm:h-24 focus:outline-none focus:ring-2 focus:ring-[#00809D]"
            />

            <button
                type="submit"
                className="bg-[#ff7801] hover:bg-[#cf9d71] hover:cursor-pointer text-white px-4 py-2 rounded text-sm transition"
            >
                Publicar
            </button>
        </form>
    )
}

export default PostForm