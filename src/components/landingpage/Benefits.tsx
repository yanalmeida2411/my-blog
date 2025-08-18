import { benefitsLink } from '@/constants/benefitsLink'

export default function Beneficios() {
  return (
    <section
      id="beneficios"
      className="bg-white py-16 sm:py-20 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 text-[#FF7601]">
          Por que usar o BlogShop?
        </h2>

        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {benefitsLink.map((item, index) => (
            <div
              key={index}
              className="bg-[#00809D] p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-[#FF7601] text-center sm:text-left"
            >
              <div className="mb-4 flex justify-center sm:justify-start">{item.icon}</div>
              <h3 className="text-lg sm:text-xl text-white font-bold mb-2">{item.title}</h3>
              <p className="text-sm sm:text-base text-white">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
