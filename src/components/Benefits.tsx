import { CreditCard, TrendingDown, MapPin } from 'lucide-react';

const benefits = [
  {
    icon: CreditCard,
    title: 'Troque limite do cartão por PIX',
    description: 'Converta o limite do seu cartão em dinheiro via PIX de forma rápida e segura'
  },
  {
    icon: TrendingDown,
    title: 'Menor taxa do mercado',
    description: 'As melhores condições e taxas competitivas para você'
  },
  {
    icon: MapPin,
    title: 'Atendimento rápido e presencial',
    description: 'Atendimento presencial na região do DDD 31'
  }
];

export function Benefits() {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a2847] mb-3 sm:mb-4">
            Por Que Escolher a JM?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] mx-auto rounded-full"></div>
        </div>

        {/* Benefícios com ícones */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-[#ffd700] transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 bg-gradient-to-br from-[#ffd700] to-[#ffed4e] p-2 sm:p-3 rounded-xl">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a2847]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1a2847] mb-1 sm:mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 bg-gradient-to-r from-[#1a2847] to-[#2d3e5f] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Mais de 5.000 clientes satisfeitos
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6">
            Confiança e credibilidade em cada atendimento
          </p>
          <div className="flex justify-center gap-1 sm:gap-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#ffd700] fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
