
export default function Sobre() {
  return (
    <section
      id="sobre"
      className="py-20 bg-white text-white flex items-center min-h-screen w-full"
    >

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 relative w-1/2 items-center">
        <div className="absolute bg-[#00809D] p-10 rounded-lg left-0 border-2 border-[#FF7601]">
          <h2 className="text-4xl font-bold mb-6">O que é o <span className="text-[#FF7601]">MyShop </span>?</h2>
          <p className="text-lg leading-relaxed mb-6">
            O <span className="text-[#FF7601] font-bold">MyBlog</span> é uma plataforma que permite que criadores de conteúdo
            compartilhem suas ideias, histórias e se conectem diretamente com sua audiência.
            Com ferramentas simples e práticas, você tem tudo para criar um espaço único para sua voz.
          </p>
          <p className="text-lg leading-relaxed">
            Ideal para freelancers, influenciadores, escritores ou qualquer pessoa que deseja ter um canal direto com seu público.
          </p>
        </div>

      </div>
    </section>
  )
}