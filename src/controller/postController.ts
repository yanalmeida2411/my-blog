import {
  useDeletePost,
  useFetchFollowers,
  useFetchFollowing,
  useFetchMyPosts,
  useGetPost,
  useHandleUnfollow,
} from "@/services/postService";
import { usePostStore } from "@/store/postStore";
import { TPost } from "@/types/Tpost";

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

export const fetchFollowers = async (userId: number | null) => {
  if (!userId) return [];

  try {
    return await useFetchFollowers(userId);
  } catch (error) {
    console.error("Erro ao buscar seguidores:", error);
    return [];
  }
};

export const fetchFollowing = async (userId: number | null) => {
  if (!userId) return [];

  try {
    return await useFetchFollowing(userId);
  } catch (error) {
    console.error("Erro ao buscar seguindo:", error);
    return [];
  }
};

export const handleUnfollow = async (followingId: number) => {
  try {
    return await useHandleUnfollow(followingId);
  } catch (error) {
    console.error("Erro ao deixar de seguir:", error);
    throw error; 
  }
};