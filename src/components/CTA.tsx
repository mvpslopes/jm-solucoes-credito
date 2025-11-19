import { ArrowRight, Sparkles } from 'lucide-react';

export function CTA() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-r from-[#ffd700] via-[#ffed4e] to-[#ffd700] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-6">
          <Sparkles className="w-16 h-16 text-[#1a2847] animate-bounce" strokeWidth={2} />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-[#1a2847] mb-6">
          Simule seu crédito agora mesmo
        </h2>

        <p className="text-xl md:text-2xl text-[#2d3e5f] mb-10 max-w-2xl mx-auto leading-relaxed">
          Preencha o formulário e receba uma proposta personalizada em minutos
        </p>

        <button
          onClick={scrollToContact}
          className="group bg-gradient-to-r from-[#1a2847] to-[#2d3e5f] text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-[#1a2847]/50 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-4"
        >
          Quero simular
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
        </button>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-[#1a2847] mb-2">1</div>
            <div className="text-sm font-semibold text-[#2d3e5f]">Preencha o formulário</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-[#1a2847] mb-2">2</div>
            <div className="text-sm font-semibold text-[#2d3e5f]">Análise em 24h</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-[#1a2847] mb-2">3</div>
            <div className="text-sm font-semibold text-[#2d3e5f]">Crédito aprovado</div>
          </div>
        </div>
      </div>
    </section>
  );
}
