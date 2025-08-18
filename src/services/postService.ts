import { Tfollowers } from "@/types/Tfollowers";
import { TPost } from "@/types/Tpost";
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

export const useFetchFollowers = async (userId: number | null) => {
  if (!userId) return [];

  const response = await axios.get(
    `https://my-blog-back-dzcr.onrender.com/follows/followers/${userId}`,
    { withCredentials: true }
  );
  return response.data;
};

export const useFetchFollowing = async (userId: number | null) => {
  const response = await axios.get<Tfollowers[]>(
    `https://my-blog-back-dzcr.onrender.com/follows/following/${userId}`,
    { withCredentials: true }
  );
  return response.data;
};

export const useHandleUnfollow = async (followingId: number) => {
  const response = await axios.post(
    "https://my-blog-back-dzcr.onrender.com/follows/unfollow",
    { following_id: followingId },
    { withCredentials: true }
  );
  return response.data;
};
