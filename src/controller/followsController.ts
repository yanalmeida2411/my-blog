import {
  useFetchFollowers,
  useFetchFollowing,
  useHandleFollow,
  useHandleUnfollow,
} from "@/services/followsService";

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

export const handleFollow = async (followingId: number) => {
  try {
    return await useHandleFollow(followingId);
  } catch (error) {
    console.error("Erro ao seguir usuário:", error);
    throw error;
  }
};
