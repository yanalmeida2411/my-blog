'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'
import { TPost } from '@/types/Tpost'
import { Tfollowers } from '@/types/Tfollowers'

export default function SeguidoresPage() {
  const [seguidores, setSeguidores] = useState<Tfollowers[]>([])
  const { userId } = useAuth()

  useEffect(() => {
    if (!userId) return;
    async function fetchSeguidores() {
      try {

        const response = await axios.get(
          `http://localhost:3001/follows/followers/${userId}`,
          {
            withCredentials: true,
          }
        )
        setSeguidores(response.data)
      } catch (error) {
        console.error('Erro ao buscar seguidores:', error)
      }
    }

    fetchSeguidores()
  }, [userId])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#00809D]">Seguidores</h1>

      <div className="space-y-4">
        {seguidores.map((seguidor: Tfollowers) => (
          <div
            key={seguidor.userId}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-100 flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <h2 className="text-lg font-semibold text-[#1C1F2A]">{seguidor.fullname}</h2>
              <p className="text-sm text-gray-500">@{seguidor.user}</p>
            </div>

            <button className="bg-[#FF7601] hover:bg-[#e66f00] text-white px-4 py-1 rounded text-sm transition">
              Ver perfil
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}