import { usePostStore } from '@/store/postStore'
import { TPost } from '@/types/Tpost'
import { formatting } from '@/utils/dateFormat'
import React from 'react'

const MyProfile = () => {
    const { posts } = usePostStore()
    return (
        <div>
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

export default MyProfile