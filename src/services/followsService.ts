import { Tfollowers } from "@/types/Tfollowers";
import axios from "axios";

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

export const useHandleFollow = async (followingId: number) => {
  const response = await axios.post(
    "https://my-blog-back-dzcr.onrender.com/follows/follow",
    { following_id: followingId },
    { withCredentials: true }
  );
  return response.data;
};
