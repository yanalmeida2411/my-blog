import {
  fetchFollowers,
  fetchFollowing,
  handleUnfollow,
  handleFollow,
} from "@/services/followsService";

export const useFollowersController = (userId: number | null) => {
  const getFollowers = async (): Promise<any[]> => {
    if (!userId) return [];
    try {
      return await fetchFollowers(userId);
    } catch (error) {
      console.error("Erro ao buscar seguidores:", error);
      return [];
    }
  };

  const getFollowing = async (): Promise<any[]> => {
    if (!userId) return [];
    try {
      return await fetchFollowing(userId);
    } catch (error) {
      console.error("Erro ao buscar seguindo:", error);
      return [];
    }
  };

  const newFollow = async (followingId: number) => {
    try {
      return await handleFollow(followingId);
    } catch (error) {
      console.error("Erro ao seguir usuário:", error);
      throw error;
    }
  };

  const newUnfollow = async (followingId: number) => {
    try {
      return await handleUnfollow(followingId);
    } catch (error) {
      console.error("Erro ao deixar de seguir:", error);
      throw error;
    }
  };

  return {
    getFollowers,
    getFollowing,
    newFollow,
    newUnfollow,
  };
};
