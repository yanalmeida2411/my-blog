import {
  useCreatePost,
  useDeletePost,
  useFetchMyPosts,
  useGetPost,
} from "@/services/postService";
import { usePostStore } from "@/store/postStore";
import { TPost, TPostSchema } from "@/types/Tpost";

export const fetchAllPosts = async (): Promise<TPost[]> => {
  try {
    return await useGetPost();
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return [];
  }
};

export const fetchUserPosts = async (
  userId: number | null
): Promise<TPost[]> => {
  if (!userId) return [];

  try {
    const posts = await useGetPost();
    const myPosts = posts.filter(
      (post: TPost) => post.post_authorId === userId
    );
    return myPosts;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return [];
  }
};

export const deleteUserPost = async (postId: number) => {
  try {
    await useDeletePost(postId); // chama a API
    usePostStore.getState().removePost(postId); // atualiza o store
  } catch (error) {
    console.error("Erro ao deletar o post:", error);
  }
};

export const fetchMyPosts = async (userId: number | null) => {
  try {
    const posts = await useFetchMyPosts(userId);
    return posts;
  } catch (error) {
    console.error("Erro ao buscar meus posts:", error);
    return [];
  }
};

export const createPost = async (data: TPostSchema) => {
  try {
    return await useCreatePost(data);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return null;
  }
};
