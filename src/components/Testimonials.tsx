import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Professora',
    content: 'Consegui realizar o sonho da casa própria com o crédito consignado da JM. Atendimento impecável e taxas justas!',
    rating: 5,
    avatar: 'MS'
  },
  {
    name: 'João Santos',
    role: 'Empresário',
    content: 'Precisava de capital para expandir meu negócio. A equipe da JM foi rápida e eficiente. Recomendo!',
    rating: 5,
    avatar: 'JS'
  },
  {
    name: 'Ana Oliveira',
    role: 'Aposentada',
    content: 'Fiz a portabilidade do meu empréstimo e economizei muito! Processo simples e transparente.',
    rating: 5,
    avatar: 'AO'
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a2847] mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">
            Histórias reais de quem confiou na JM Soluções
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 relative border border-gray-100 hover:border-[#ffd700] transform hover:-translate-y-2"
            >
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-[#ffd700] to-[#ffed4e] p-3 rounded-xl shadow-lg">
                <Quote className="w-6 h-6 text-[#1a2847]" />
              </div>

              <div className="flex items-center gap-4 mb-6 mt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4a90e2] to-[#6ba3e8] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1a2847]">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#ffd700] fill-current" />
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffd700] via-[#ffed4e] to-[#ffd700] opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-[#1a2847] to-[#2d3e5f] text-white px-8 py-4 rounded-full shadow-lg">
            <p className="text-lg font-semibold">
              <span className="text-[#ffd700]">98%</span> de satisfação dos clientes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
