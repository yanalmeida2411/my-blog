export default function Sobre() {
  return (
    <section
      id="sobre"
      className="py-20 bg-white text-white flex items-center min-h-screen w-full"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex justify-center">
        <div className="bg-[#00809D] p-6 sm:p-10 rounded-lg border-2 border-[#FF7601] w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
            O que é o <span className="text-[#FF7601]">MyBlog </span>?
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-6 text-center">
            O <span className="text-[#FF7601] font-bold">MyBlog</span> é uma plataforma que permite que criadores de conteúdo
            compartilhem suas ideias, histórias e se conectem diretamente com sua audiência.
            Com ferramentas simples e práticas, você tem tudo para criar um espaço único para sua voz.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-center">
            Ideal para freelancers, influenciadores, escritores ou qualquer pessoa que deseja ter um canal direto com seu público.
          </p>
        </div>
      </div>
    </section>
  )
}
