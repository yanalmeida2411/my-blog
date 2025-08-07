'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaUserCheck, FaUserTimes } from 'react-icons/fa'
import { Tfollowers } from '@/types/Tfollowers'
import { useAuth } from '@/hooks/useAuth'

export default function SeguindoPage() {
  const [following, setFollowing] = useState<Tfollowers[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()


  useEffect(() => {
    if (!userId) return;
    async function fetchFollowing() {
      try {
        const response = await axios.get<Tfollowers[]>(`https://my-blog-back-dzcr.onrender.com/follows/following/${userId}`, { withCredentials: true });
        setFollowing(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários seguidos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFollowing()
  }, [userId])

  const handleUnfollow = async (followingId: number) => {
    try {
      await axios.post<Tfollowers[]>(
        "https://my-blog-back-dzcr.onrender.com/follows/unfollow",
        { following_id: followingId },
        { withCredentials: true }
      );
      setFollowing((prev) => prev.filter((user) => user.userId !== followingId));
    } catch (error) {
      console.error("Erro ao deixar de seguir:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#00809D]"></div>
      </div>
    )
  }

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
            {/* Texto do usuário */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-[#1C1F2A] capitalize">{person.fullname}</h2>
              <p className="text-sm text-gray-500">@{person.user}</p>
            </div>

            {/* Botão de unfollow */}
            <button
              onClick={() => handleUnfollow(person.userId)}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 
               text-white px-4 py-1 rounded text-sm transition w-full sm:w-auto"
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
