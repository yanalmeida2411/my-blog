'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaUserCheck, FaUserTimes } from 'react-icons/fa'
import { Tfollowers } from '@/types/Tfollowers'
import { useAuth } from '@/hooks/useAuth'

export default function SeguindoPage() {
  const [following, setFollowing] = useState<Tfollowers[]>([])
  const { userId } = useAuth()

  useEffect(() => {
    if (!userId) return;
    async function fetchFollowing() {
      try {
        const response = await axios.get(`http://localhost:3001/follows/following/${userId}`, { withCredentials: true });
        setFollowing(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários seguidos:', error)
      }
    }

    fetchFollowing()
  }, [userId])

  const handleUnfollow = async (followingId: number) => {
    try {
      await axios.post(
        "http://localhost:3001/follows/unfollow",
        { following_id: followingId },
        { withCredentials: true }
      );
      setFollowing((prev) => prev.filter((user) => user.userId !== followingId));
    } catch (error) {
      console.error("Erro ao deixar de seguir:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#00809D]">Seguindo</h1>

      <div className="space-y-4">
        {following.map((person: Tfollowers) => (
          <div
            key={person.userId}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-100 flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <h2 className="text-lg font-semibold text-[#1C1F2A]">{person.fullname}</h2>
              <p className="text-sm text-gray-500">@{person.user}</p>
            </div>
            <div className='flex space-x-5'>
              {/* <button className="flex items-center gap-2 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded text-sm transition">
                <FaUserCheck className="text-base" />
                Seguindo
              </button> */}
              <button
                onClick={() => handleUnfollow(person.userId)}
                className="flex items-center gap-2 hover:cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm transition"
              >
                <FaUserTimes className="text-base" />
                Deixar de seguir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
