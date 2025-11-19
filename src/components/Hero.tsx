import { useState } from 'react';
import { Simulator } from './Simulator';

export function Hero() {
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openSimulator = () => {
    setIsSimulatorOpen(true);
  };

  return (
    <section id="hero" className="relative min-h-screen flex justify-center px-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/fundo-site.png" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center pb-20 mt-32 md:mt-40">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Seu crédito,</span>
          <br />
          <span className="text-[#ffd700]">
            do seu jeito
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white mb-6 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          Empréstimos rápidos e seguros com as melhores condições para você.
        </p>
        <p className="text-lg md:text-xl text-[#ffd700] mb-12 max-w-3xl mx-auto font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Fale com a gente! Pix na hora
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={openSimulator}
            className="group bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a2847] px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-[#ffd700]/50 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-3">
              Simular agora
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          
          <button
            onClick={scrollToServices}
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 w-full sm:w-auto border border-white/20"
          >
            Conheça nossos serviços
          </button>
          
          <button
            onClick={scrollToContact}
            className="bg-white text-[#1a2847] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto shadow-lg"
          >
            Solicitar orçamento
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#ffd700] mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">+5000</div>
            <div className="text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Clientes atendidos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#ffd700] mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">24h</div>
            <div className="text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Aprovação rápida</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#ffd700] mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">100%</div>
            <div className="text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Digital</div>
          </div>
        </div>
      </div>
      <Simulator isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} />
    </section>
  );
}
