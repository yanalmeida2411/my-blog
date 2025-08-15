import { useGetPost } from "@/services/postService";
import { TPost } from "@/types/Tpost";

export const fetchUserPosts = async (userId: number | null): Promise<TPost[]> => {
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
