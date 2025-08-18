// src/hooks/usePostController.ts
import {
  createPost,
  deletePost,
  fetchMyPosts,
  getPosts,
} from "@/services/postService";
import { usePostStore } from "@/store/postStore";
import { TPost, TPostSchema } from "@/types/Tpost";

export const usePostController = () => {
  const fetchAllPosts = async (): Promise<TPost[]> => {
    try {
      return await getPosts();
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      return [];
    }
  };

  const fetchUserPosts = async (userId: number | null): Promise<TPost[]> => {
    if (!userId) return [];
    try {
      const posts = await getPosts();
      return posts.filter((post) => post.post_authorId === userId);
    } catch (error) {
      console.error("Erro ao buscar posts do usuário:", error);
      return [];
    }
  };

  const getMyPosts = async (userId: number | null): Promise<TPost[]> => {
    if (!userId) return [];
    try {
      return await fetchMyPosts(userId);
    } catch (error) {
      console.error("Erro ao buscar meus posts:", error);
      return [];
    }
  };

  const deleteUserPost = async (postId: number) => {
    try {
      await deletePost(postId);
      usePostStore.getState().removePost(postId);
    } catch (error) {
      console.error("Erro ao deletar o post:", error);
    }
  };

  const newPost = async (data: TPostSchema) => {
    try {
      return await createPost(data);
    } catch (error) {
      console.error("Erro ao criar post:", error);
      return null;
    }
  };

  return {
    fetchAllPosts,
    fetchUserPosts,
    getMyPosts,
    deleteUserPost,
    newPost,
  };
};
