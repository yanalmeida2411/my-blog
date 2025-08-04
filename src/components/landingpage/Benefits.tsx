import { FaRegLightbulb, FaUsers, FaPenFancy } from 'react-icons/fa'

const benefits = [
  {
    icon: <FaRegLightbulb size={32} className="text-[#FF7601]" />,
    title: 'Compartilhe Suas Ideias',
    desc: 'Crie e publique conteúdos com facilidade usando uma plataforma feita para você.',
  },
  {
    icon: <FaUsers size={32} className="text-[#FF7601]" />,
    title: 'Construa Sua Comunidade',
    desc: 'Aproxime-se dos seus leitores e crie conexões reais com seu público.',
  },
  {
    icon: <FaPenFancy size={32} className="text-[#FF7601]" />,
    title: 'Design Personalizável',
    desc: 'Deixe o seu blog com a sua cara, sem precisar de conhecimento técnico.',
  },
]

export default function Beneficios() {
  return (
    <section id="beneficios" className="bg-white py-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#FF7601]">
          Por que usar o BlogShop?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-[#00809D] p-6 rounded-xl 
              shadow-lg hover:shadow-xl transition duration-300 border-1 border-[#FF7601]"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl text-white font-bold mb-2">{item.title}</h3>
              <p className="text-white">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
