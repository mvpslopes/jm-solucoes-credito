import { Wallet, DollarSign, RefreshCw, ArrowRightLeft } from 'lucide-react';

const services = [
  {
    icon: Wallet,
    title: 'Crédito Consignado',
    description: 'Empréstimo com desconto direto em folha de pagamento, taxas reduzidas e prazos longos.',
    color: 'from-[#ffd700] to-[#ffed4e]',
    textColor: 'text-[#1a2847]'
  },
  {
    icon: DollarSign,
    title: 'Empréstimo Pessoal',
    description: 'Crédito rápido e descomplicado para realizar seus projetos e objetivos pessoais.',
    color: 'from-[#4a90e2] to-[#6ba3e8]',
    textColor: 'text-white'
  },
  {
    icon: RefreshCw,
    title: 'Refinanciamento',
    description: 'Renegocie suas dívidas com condições melhores e parcelas que cabem no seu bolso.',
    color: 'from-[#1a2847] to-[#2d3e5f]',
    textColor: 'text-white'
  },
  {
    icon: ArrowRightLeft,
    title: 'Portabilidade de Crédito',
    description: 'Transfira seu empréstimo para nossa instituição e ganhe taxas mais competitivas.',
    color: 'from-[#ff6b6b] to-[#ff8787]',
    textColor: 'text-white'
  }
];

export function Services() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a2847] mb-4">
            Nossos Serviços
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Soluções financeiras completas para atender suas necessidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${service.color} p-8 text-center`}>
                  <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                    <Icon className={`w-12 h-12 ${service.textColor}`} strokeWidth={2} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a2847] mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
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
