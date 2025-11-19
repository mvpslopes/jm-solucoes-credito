import { Shield, Users, Heart } from 'lucide-react';

export function About() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a2847] mb-4">
            Sobre Nós
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              A <span className="font-bold text-[#1a2847]">JM Soluções em Créditos</span> trabalha com atendimento humanizado e soluções financeiras personalizadas.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Atuamos com ética, transparência e foco em oferecer as melhores condições de crédito para nossos clientes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nossa missão é facilitar o acesso ao crédito de forma responsável, com processos simplificados e atendimento especializado.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#f8f9fa] to-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-[#ffd700] to-[#ffed4e] p-3 rounded-xl">
                <Shield className="w-8 h-8 text-[#1a2847]" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#1a2847] mb-2">Segurança</h3>
                <p className="text-gray-600">Processos seguros e transparentes em todas as etapas.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#f8f9fa] to-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-[#4a90e2] to-[#6ba3e8] p-3 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#1a2847] mb-2">Experiência</h3>
                <p className="text-gray-600">Anos de experiência no mercado financeiro.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#f8f9fa] to-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-[#ff6b6b] to-[#ff8787] p-3 rounded-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#1a2847] mb-2">Humanização</h3>
                <p className="text-gray-600">Atendimento personalizado e próximo ao cliente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
