import { Tfollowers } from "@/types/Tfollowers";
import axios from "axios";

export const fetchFollowers = async (userId: number | null): Promise<Tfollowers[]> => {
  if (!userId) return [];
  const response = await axios.get<Tfollowers[]>(
    `https://my-blog-back-dzcr.onrender.com/follows/followers/${userId}`,
    { withCredentials: true }
  );
  return response.data;
};

export const fetchFollowing = async (userId: number | null): Promise<Tfollowers[]> => {
  if (!userId) return [];
  const response = await axios.get<Tfollowers[]>(
    `https://my-blog-back-dzcr.onrender.com/follows/following/${userId}`,
    { withCredentials: true }
  );
  return response.data;
};

export const handleUnfollow = async (followingId: number) => {
  const response = await axios.post(
    "https://my-blog-back-dzcr.onrender.com/follows/unfollow",
    { following_id: followingId },
    { withCredentials: true }
  );
  return response.data;
};

export const handleFollow = async (followingId: number) => {
  const response = await axios.post(
    "https://my-blog-back-dzcr.onrender.com/follows/follow",
    { following_id: followingId },
    { withCredentials: true }
  );
  return response.data;
};
