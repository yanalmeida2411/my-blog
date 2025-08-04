'use client'

export default function Footer() {
  return (
    <footer className="bg-[#00809D] text-white py-6 font-bold">
      <div className="text-center text-sm">
        © {new Date().getFullYear()} BlogShop. Todos os direitos reservados.
      </div>
    </footer>
  )
}
