import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Antônio Carlos',
    content: 'Eu estava desempregado, contas acumulando, e a cabeça a mil. A JM me acolheu, explicou tudo com paciência e me ajudou a respirar de novo. Foi como tirar um peso enorme das costas. Hoje sou cliente fiel.',
    rating: 5,
    avatar: 'AC'
  },
  {
    name: 'Larissa Mendes',
    content: 'Eu não tinha mais para onde correr. Ao mesmo tempo que precisava do dinheiro, morria de medo de ser enganada. A JM me passou confiança desde o primeiro minuto. No fim, tudo deu certo e consegui reorganizar minha vida.',
    rating: 5,
    avatar: 'LM'
  },
  {
    name: 'Juliana Souza',
    content: 'Fui muito bem atendida e o Pix saiu na hora! Equipe muito prestativa.',
    rating: 5,
    avatar: 'JS'
  }
];

export function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a2847] mb-3 sm:mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] mx-auto rounded-full mb-3 sm:mb-4"></div>
          <p className="text-gray-600 text-base sm:text-lg">
            Histórias reais de quem confiou na JM Soluções
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 md:p-8 relative border border-gray-100 hover:border-[#ffd700] transform hover:-translate-y-2"
            >
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-[#ffd700] to-[#ffed4e] p-3 rounded-xl shadow-lg">
                <Quote className="w-6 h-6 text-[#1a2847]" />
              </div>

              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 mt-2 sm:mt-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#4a90e2] to-[#6ba3e8] rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl shadow-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#ff6b6b]">{testimonial.name}</h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 italic">
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
