'use client'

export default function Footer() {
  return (
    <footer className="bg-[#00809D] text-white py-6 font-bold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm">
        © {new Date().getFullYear()} BlogShop. Todos os direitos reservados.
      </div>
    </footer>
  )
}
