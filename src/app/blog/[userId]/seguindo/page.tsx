'use client'

import { useEffect, useState } from 'react'
import { FaUserTimes } from 'react-icons/fa'
import { Tfollowers } from '@/types/Tfollowers'
import { useAuth } from '@/hooks/useAuth'
import { fetchFollowing, handleUnfollow } from '@/controller/followsController'
import Loading from '@/common/Loading'

export default function SeguindoPage() {
  const [following, setFollowing] = useState<Tfollowers[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    if (!userId) return;
    async function loadFollowing() {
      setLoading(true);
      const following = await fetchFollowing(userId);
      setFollowing(following);
      setLoading(false);
    }
    loadFollowing();
  }, [userId]);

  const handleUnfollowClick = async (followingId: number) => {
    try {
      await handleUnfollow(followingId);
      setFollowing((prev) => prev.filter((user) => user.userId !== followingId));
    } catch (error) {
      console.error("Erro ao deixar de seguir:", error);
    }
  };

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#00809D]">Seguindo{""} {following.length}</h1>
      <div className="space-y-4">
        {following.map((person: Tfollowers) => (
          <div
            key={person.userId}
            className="bg-white shadow-md space-x-3 rounded-lg p-4 border border-gray-100 
             flex flex-col sm:flex-row sm:items-center sm:justify-between 
             gap-3 sm:gap-0 hover:shadow-lg transition"
          >
            <div className="w-10 h-10 bg-[#FF7601] text-white rounded-full flex items-center justify-center text-lg font-bold">
              {person.fullname && person.fullname.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-[#1C1F2A] capitalize">{person.fullname}</h2>
              <p className="text-sm text-gray-500">@{person.user}</p>
            </div>
            <button
              onClick={() => handleUnfollowClick(person.userId)}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 
               text-white px-4 py-1 rounded text-sm transition w-full sm:w-auto hover:cursor-pointer"
            >
              <FaUserTimes className="text-base" />
              Deixar de seguir
            </button>
          </div>
        ))}
      </div>
    </div >
  )
}
