import { TPost, TPostSchema } from "@/types/Tpost";
import axios from "axios";

export const useGetPost = async () => {
  const response = await axios.get<TPost[]>(
    `https://my-blog-back-dzcr.onrender.com/posts/`,
    { withCredentials: true }
  );

  return response.data;
};

export const useDeletePost = async (postId: number) => {
  const response = await axios.delete(
    `https://my-blog-back-dzcr.onrender.com/posts/${postId}`,
    { withCredentials: true }
  );

  return response.data;
};

export const useFetchMyPosts = async (
  userId: number | null
): Promise<TPost[]> => {
  const response = await axios.get(
    `https://my-blog-back-dzcr.onrender.com/posts/author/${userId}`,
    { withCredentials: true }
  );
  return response.data;
};

export const useCreatePost = async (data: TPostSchema) => {
  const response = await axios.post(
    "https://my-blog-back-dzcr.onrender.com/posts",
    {
      post_title: data.title,
      post_resume: data.resume,
      post_content: data.content,
    },
    { withCredentials: true }
  );
  return response.data;
};
