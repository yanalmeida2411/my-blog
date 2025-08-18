'use client'

import Loading from "@/common/Loading"
import PostForm from "@/components/blog/PostForm"
import { fetchFollowing, handleFollow } from "@/controller/followsController"
import { fetchAllPosts } from "@/controller/postController"
import { useAuth } from "@/hooks/useAuth"
import { usePostStore } from "@/store/postStore"
import { TPost } from "@/types/Tpost"
import { formatting } from "@/utils/dateFormat"
import { useEffect, useState } from "react"
import { FaUserCheck } from "react-icons/fa"

export default function Blog() {
    const { userId } = useAuth()
    const { posts } = usePostStore()
    const [followingIds, setFollowingIds] = useState<number[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPosts() {
            setLoading(true);
            const allPosts = await fetchAllPosts();
            usePostStore.getState().setPosts(allPosts);
            setLoading(false);
        }
        loadPosts();
    }, []);

    useEffect(() => {
        if (!userId) return;
        async function loadFollowing() {
            const following = await fetchFollowing(userId);
            const ids = following.map(f => f.userId);
            setFollowingIds(ids);
        }
        loadFollowing();
    }, [userId]);


    const handleFollowUser = async (authorId: number) => {
        try {
            await handleFollow(authorId); // controller
            setFollowingIds((prev) => [...prev, authorId]);
        } catch (error) {
            console.error("Erro ao seguir usuário:", error);
        }
    };

    if (loading) return <Loading />

    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#00809D]">Feed BlogShop</h1>

            <PostForm />

            {/* Lista de posts */}
            <div className="space-y-6">
                {posts.map((post: TPost) => {
                    const isFollowingAuthor = followingIds.includes(post.post_authorId)
                    const isOwnPost = post.post_authorId === userId

                    return (
                        <div
                            key={post.post_id}
                            className="bg-gray-50 shadow-md rounded-lg p-4 md:p-6 border-2 border-[#00809D] hover:shadow-lg transition"
                        >
                            <div className="bg-[#00809D] flex items-center space-x-3 rounded-2xl w-fit p-2">
                                <div className="w-10 h-10 bg-[#ff7801] text-white rounded-full flex items-center justify-center text-lg font-bold">
                                    {post.post_authorName?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h1 className="text-lg md:text-xl font-semibold text-white capitalize">{post.post_authorName}</h1>
                                    <p className="text-sm text-white">
                                        Publicado em {post.post_date && formatting.format(new Date(post.post_date))}
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-xl md:text-2xl font-semibold text-black mt-2">{post.post_title}</h2>

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
                                            onClick={() => handleFollowUser(post.post_authorId)}
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
        </div>
    )
}