'use client'
import { useState } from 'react'

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: 'Camiseta Tech',
      descricao: 'Camiseta feita com tecido tecnológico e respirável.',
      preco: 89.9,
    },
    {
      id: 2,
      nome: 'Mochila Reforçada',
      descricao: 'Ideal para viagens, resistente à água e com vários compartimentos.',
      preco: 199.99,
    },
    {
      id: 3,
      nome: 'Headset Gamer',
      descricao: 'Áudio 7.1 surround com cancelamento de ruído.',
      preco: 349.0,
    },
  ])

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')

  const handleAddProduto = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome || !descricao || !preco) return

    const novoProduto = {
      id: produtos.length + 1,
      nome,
      descricao,
      preco: parseFloat(preco),
    }

    setProdutos([novoProduto, ...produtos])
    setNome('')
    setDescricao('')
    setPreco('')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#00809D]">Meus Produtos</h1>

      {/* 🛒 Formulário de novo produto */}
      <form
        onSubmit={handleAddProduto}
        className="bg-white shadow-md rounded-lg p-6 border border-gray-100 space-y-4"
      >
        <h2 className="text-xl font-semibold text-[#1C1F2A]">Novo Produto</h2>

        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF7601]"
        />

        <textarea
          placeholder="Descrição do produto"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full px-4 py-2 border rounded resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#FF7601]"
        ></textarea>

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF7601]"
        />

        <button
          type="submit"
          className="bg-[#FF7601] hover:bg-[#e66f00] text-white px-4 py-2 rounded text-sm transition"
        >
          Adicionar Produto
        </button>
      </form>

      {/* 🧾 Lista de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-[#1C1F2A]">{produto.nome}</h2>
            <p className="text-gray-600 mb-2 text-sm">{produto.descricao}</p>
            <p className="text-[#FF7601] font-bold mb-4 text-base">
              R$ {produto.preco.toFixed(2)}
            </p>

            <div className="flex gap-2">
              <button className="bg-[#FF7601] hover:bg-[#e66f00] text-white px-3 py-1 rounded text-sm">
                Ver
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}