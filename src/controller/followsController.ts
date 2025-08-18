import {
  useFetchFollowers,
  useFetchFollowing,
  useHandleFollow,
  useHandleUnfollow,
} from "@/services/followsService";

export const useFollowersController = (userId: number | null) => {
  const fetchFollowers = async (): Promise<any[]> => {
    if (!userId) return [];
    try {
      return await useFetchFollowers(userId);
    } catch (error) {
      console.error("Erro ao buscar seguidores:", error);
      return [];
    }
  };

  const fetchFollowing = async (): Promise<any[]> => {
    if (!userId) return [];
    try {
      return await useFetchFollowing(userId);
    } catch (error) {
      console.error("Erro ao buscar seguindo:", error);
      return [];
    }
  };

  const handleFollow = async (followingId: number) => {
    try {
      return await useHandleFollow(followingId);
    } catch (error) {
      console.error("Erro ao seguir usuário:", error);
      throw error;
    }
  };

  const handleUnfollow = async (followingId: number) => {
    try {
      return await useHandleUnfollow(followingId);
    } catch (error) {
      console.error("Erro ao deixar de seguir:", error);
      throw error;
    }
  };

  return {
    fetchFollowers,
    fetchFollowing,
    handleFollow,
    handleUnfollow,
  };
};
