export function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPartner = () => {
    document.getElementById('partner')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSimulator = () => {
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
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
      <div className="relative z-10 max-w-5xl mx-auto text-center pb-20 pt-16 px-4 sm:px-6 mt-16 sm:mt-24 md:mt-32">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
          <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Transforme o limite do seu cartão em Pix
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] px-2">
          Atendimento confiável, presencial e com liberação do Pix imediatamente.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-[#ffd700] mb-8 sm:mb-12 max-w-3xl mx-auto font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-2">
          Fale com a gente! Pix na hora
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-2">
          <button
            onClick={scrollToSimulator}
            className="group bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a2847] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold shadow-2xl hover:shadow-[#ffd700]/50 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              Simular agora
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          
          <button
            onClick={scrollToServices}
            className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white/20 transition-all duration-300 w-full sm:w-auto border border-white/20"
          >
            Conheça nossos serviços
          </button>
          
          <button
            onClick={scrollToPartner}
            className="bg-white text-[#1a2847] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto shadow-lg"
          >
            Seja nosso Parceiro
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto px-2">
          <div className="text-center flex flex-col items-center justify-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ffd700] mb-1 sm:mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">+5000</div>
            <div className="text-xs sm:text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Clientes atendidos</div>
          </div>
          <div className="text-center flex flex-col items-center justify-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ffd700] mb-1 sm:mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight">
              <span className="block">Aprovação</span>
              <span className="block">imediata</span>
            </div>
            <div className="text-xs sm:text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Pix enviado na hora</div>
          </div>
          <div className="text-center flex flex-col items-center justify-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ffd700] mb-1 sm:mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">100%</div>
            <div className="text-xs sm:text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Digital</div>
          </div>
        </div>
      </div>
    </section>
  );
}
