import { DollarSign, MapPin, FileText, Rocket, Handshake, Globe, CheckCircle, Users, Wrench } from 'lucide-react';
import { useState } from 'react';

export function Partner() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const dados = {
      tipo: 'parceiro',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      message: formData.message || 'Sem mensagem adicional'
    };

    try {
      const response = await fetch('/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('Cadastro enviado com sucesso! Entraremos em contato em breve.');
        
        // Limpa o formulário
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          message: ''
        });

        // Remove a mensagem de sucesso após 5 segundos
        setTimeout(() => setSubmitMessage(''), 5000);
      } else {
        setSubmitMessage('Erro ao enviar cadastro. Tente novamente ou entre em contato pelo WhatsApp.');
      }
    } catch (error) {
      setSubmitMessage('Erro ao enviar cadastro. Tente novamente ou entre em contato pelo WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: 'Renda extra real',
      description: 'Comissões acima da média do mercado'
    },
    {
      icon: MapPin,
      title: 'Atendimento na sua cidade',
      description: 'Sem precisar viajar'
    },
    {
      icon: FileText,
      title: 'Zero investimento inicial',
      description: 'Você só precisa de tempo e comprometimento'
    },
    {
      icon: Rocket,
      title: 'Treinamento completo',
      description: 'Para começar do jeito certo'
    },
    {
      icon: Handshake,
      title: 'Suporte direto da equipe JM',
      description: 'Durante todo o processo'
    },
    {
      icon: Globe,
      title: 'Representante fixo',
      description: 'Possibilidade de se tornar representante fixo da cidade'
    }
  ];

  return (
    <section id="partner" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a2847] mb-3 sm:mb-4">
            Seja um Parceiro Local JM
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] mx-auto rounded-full mb-3 sm:mb-4"></div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Ganhe Renda Extra Atendendo Sua Cidade
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mt-3 sm:mt-4 px-2">
            Torne-se um representante autorizado da JM, atenda clientes da sua região e receba comissões por cada negociação concluída.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
          {/* Benefícios */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1a2847] mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-[#ffd700] to-[#ffed4e] p-1.5 sm:p-2 rounded-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a2847]" />
              </div>
              O que o Parceiro Local ganha
            </h3>
            <p className="text-base sm:text-lg font-semibold text-[#1a2847] mb-4 sm:mb-6">
              Benefícios exclusivos para novos colaboradores:
            </p>
            
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#ffd700]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-[#ffd700] to-[#ffed4e] p-3 rounded-xl flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#1a2847]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1a2847] mb-2">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Como Funciona */}
          <div>
            <h3 className="text-3xl font-bold text-[#1a2847] mb-8 flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#ffd700] to-[#ffed4e] p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-[#1a2847]" />
              </div>
              Como funciona ser um Parceiro JM
            </h3>
            
            <div className="space-y-6">
              {[
                'Você se cadastra na plataforma',
                'Nossa equipe entra em contato e faz o treinamento rápido',
                'Você começa a atender clientes da sua cidade (presencial)',
                'A JM faz toda a parte operacional e financeira',
                'Você recebe comissão a cada atendimento concluído'
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg">
                  <div className="bg-gradient-to-br from-[#1a2847] to-[#2d3e5f] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-lg pt-2">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] rounded-2xl p-6 text-center">
              <p className="text-2xl font-bold text-[#1a2847]">
                Simples, seguro e lucrativo
              </p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-gradient-to-br from-[#1a2847] to-[#2d3e5f] rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-[#ffd700] to-[#ffed4e] p-3 rounded-full mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Quer representar a JM na sua cidade?
              </h3>
              <p className="text-xl text-gray-300">
                Preencha o formulário abaixo e venha fazer parte da nossa equipe!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-gray-400 focus:border-[#ffd700] focus:bg-white/20 outline-none transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-gray-400 focus:border-[#ffd700] focus:bg-white/20 outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Telefone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-gray-400 focus:border-[#ffd700] focus:bg-white/20 outline-none transition-colors"
                    placeholder="(31) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-gray-400 focus:border-[#ffd700] focus:bg-white/20 outline-none transition-colors"
                    placeholder="Sua cidade"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Mensagem (opcional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-gray-400 focus:border-[#ffd700] focus:bg-white/20 outline-none transition-colors resize-none"
                  placeholder="Conte-nos mais sobre você e por que quer ser um parceiro JM..."
                ></textarea>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-xl ${
                  submitMessage.includes('sucesso') 
                    ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                    : 'bg-red-100 text-red-800 border-2 border-red-300'
                }`}>
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a2847] px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-[#ffd700]/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#1a2847] border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Quero ser um Parceiro Local JM
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

