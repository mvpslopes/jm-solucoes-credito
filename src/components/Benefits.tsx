import { TrendingDown, Zap, Headphones, ShieldCheck, LifeBuoy, CreditCard, MapPin } from 'lucide-react';

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
  },
  {
    icon: Zap,
    title: 'Aprovação rápida',
    description: 'Resposta em até 24 horas'
  },
  {
    icon: Headphones,
    title: 'Atendimento especializado',
    description: 'Equipe dedicada ao seu sucesso'
  },
  {
    icon: ShieldCheck,
    title: 'Processo simples e seguro',
    description: 'Documentação 100% digital'
  }
];

export function Benefits() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a2847] mb-4">
            Por Que Escolher a JM?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border-2 border-gray-100 hover:border-[#ffd700] transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-gradient-to-br from-[#ffd700] to-[#ffed4e] p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[#1a2847]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a2847] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#1a2847] to-[#2d3e5f] rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            Mais de 5.000 clientes satisfeitos
          </h3>
          <p className="text-xl text-gray-300 mb-6">
            Confiança e credibilidade em cada atendimento
          </p>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-8 h-8 text-[#ffd700] fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
