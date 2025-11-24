import { CreditCard, MapPin, Car, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: CreditCard,
    title: 'Transformação de Limite em Pix',
    description: 'Transforme o limite do seu cartão em dinheiro na hora. Processo rápido, presencial e seguro, com Pix liberado imediatamente após a operação.',
    color: 'from-[#ffd700] to-[#ffed4e]',
    textColor: 'text-[#1a2847]'
  },
  {
    icon: MapPin,
    title: 'Atendimento Presencial e Personalizado',
    description: 'Nossos agentes atendem no local mais cômodo para o cliente, garantindo conforto, confiança e transparência em todo o processo. Vamos até você!',
    color: 'from-[#4a90e2] to-[#6ba3e8]',
    textColor: 'text-white'
  },
  {
    icon: Car,
    title: 'Soluções para Agências e Parceiros',
    description: 'A agência passa o cartão do cliente para a JM e fica livre de impostos e processos. Oferecemos as melhores taxas do mercado. Aumente suas vendas sem burocracia.',
    color: 'from-[#1a2847] to-[#2d3e5f]',
    textColor: 'text-white'
  },
  {
    icon: CheckCircle,
    title: 'Simulações e Condições Especiais',
    description: 'Aqui você sempre tem acesso às melhores taxas e condições personalizadas para o seu bolso e sua necessidade. Cobrimos qualquer simulação!',
    color: 'from-[#ff6b6b] to-[#ff8787]',
    textColor: 'text-white'
  }
];


export function Services() {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a2847] mb-3 sm:mb-4">
            Nossos Serviços
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] mx-auto rounded-full mb-3 sm:mb-4"></div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Soluções financeiras completas para atender suas necessidades
          </p>
        </div>

        {/* Cards de Serviços */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${service.color} p-6 sm:p-8 text-center`}>
                  <div className="inline-block p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-3 sm:mb-4">
                    <Icon className={`w-10 h-10 sm:w-12 sm:h-12 ${service.textColor}`} strokeWidth={2} />
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1a2847] mb-2 sm:mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
