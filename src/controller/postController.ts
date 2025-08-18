// src/hooks/usePostController.ts
import {
  useCreatePost,
  useDeletePost,
  useFetchMyPosts,
  useGetPost,
} from "@/services/postService";
import { usePostStore } from "@/store/postStore";
import { TPost, TPostSchema } from "@/types/Tpost";

export const usePostController = () => {
  const fetchAllPosts = async (): Promise<TPost[]> => {
    try {
      return await useGetPost();
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      return [];
    }
  };

  const fetchUserPosts = async (userId: number | null): Promise<TPost[]> => {
    if (!userId) return [];
    try {
      const posts = await useGetPost();
      return posts.filter((post) => post.post_authorId === userId);
    } catch (error) {
      console.error("Erro ao buscar posts do usuário:", error);
      return [];
    }
  };

  const fetchMyPosts = async (userId: number | null): Promise<TPost[]> => {
    if (!userId) return [];
    try {
      return await useFetchMyPosts(userId);
    } catch (error) {
      console.error("Erro ao buscar meus posts:", error);
      return [];
    }
  };

  const deleteUserPost = async (postId: number) => {
    try {
      await useDeletePost(postId);
      usePostStore.getState().removePost(postId);
    } catch (error) {
      console.error("Erro ao deletar o post:", error);
    }
  };

  const createPost = async (data: TPostSchema) => {
    try {
      return await useCreatePost(data);
    } catch (error) {
      console.error("Erro ao criar post:", error);
      return null;
    }
  };

  return {
    fetchAllPosts,
    fetchUserPosts,
    fetchMyPosts,
    deleteUserPost,
    createPost,
  };
};
