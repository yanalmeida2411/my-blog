'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Tfollowers } from '@/types/Tfollowers'
import Loading from '@/common/Loading'
import { fetchFollowers } from '@/controller/followsController'

export default function SeguidoresPage() {
  const [seguidores, setSeguidores] = useState<Tfollowers[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    if (!userId) return;

    async function loadFollowers() {
      setLoading(true);
      const seguidores = await fetchFollowers(userId);
      setSeguidores(seguidores);
      setLoading(false);
    }
    loadFollowers();
  }, [userId]);

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#00809D]">Seguidores{" "}{seguidores.length}</h1>
      <div className="space-y-4">
        {seguidores.map((seguidor: Tfollowers) => (
          <div
            key={seguidor.userId}
            className="bg-white shadow-md space-x-3 rounded-lg p-4 border border-gray-100 
             flex flex-col sm:flex-row sm:items-center sm:justify-between 
             gap-3 sm:gap-0 hover:shadow-lg transition"
          >
            <div className="w-10 h-10 bg-[#FF7601] text-white rounded-full flex items-center justify-center text-lg font-bold">
              {seguidor.fullname && seguidor.fullname.charAt(0).toUpperCase()}
            </div>
            {/* Texto do seguidor */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-[#1C1F2A] capitalize">{seguidor.fullname}</h2>
              <p className="text-sm text-gray-500">@{seguidor.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
