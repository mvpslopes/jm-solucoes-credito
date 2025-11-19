import { useState } from 'react';
import { Send, Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    creditType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = '5531994760622';
    const message = `Olá! Meu nome é ${formData.name}.\n\nTelefone: ${formData.phone}\nWhatsApp: ${formData.whatsapp}\nTipo de Crédito: ${formData.creditType}\n\nMensagem: ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a2847] mb-4">
            Entre em Contato
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">
            Estamos prontos para atender você
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1a2847] mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1a2847] mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors"
                    placeholder="(11) 98888-8888"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1a2847] mb-2">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors"
                    placeholder="(11) 98888-8888"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2847] mb-2">
                  Tipo de Crédito *
                </label>
                <select
                  name="creditType"
                  required
                  value={formData.creditType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors bg-white"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Crédito Consignado">Crédito Consignado</option>
                  <option value="Empréstimo Pessoal">Empréstimo Pessoal</option>
                  <option value="Refinanciamento">Refinanciamento</option>
                  <option value="Portabilidade">Portabilidade de Crédito</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2847] mb-2">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors resize-none"
                  placeholder="Conte-nos mais sobre sua necessidade..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a2847] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" />
                Enviar mensagem
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1a2847] to-[#2d3e5f] rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>

              <div className="space-y-6">
                <a
                  href="https://wa.me/5531994760622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all group"
                >
                  <div className="bg-[#25D366] p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">WhatsApp</div>
                    <div className="text-gray-300">(31) 99476-0622</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="bg-[#4a90e2] p-3 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Telefone</div>
                    <div className="text-gray-300">(31) 99476-0622</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="bg-[#ff6b6b] p-3 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">E-mail</div>
                    <div className="text-gray-300">contato@jmsolucoes.com.br</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="bg-[#ffd700] p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#1a2847]" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Endereço</div>
                    <div className="text-gray-300">São Paulo - SP</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#ffd700] to-[#ffed4e] rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-[#1a2847] mb-4">
                Horário de Atendimento
              </h3>
              <div className="space-y-2 text-[#2d3e5f]">
                <p className="font-semibold">Segunda a Sexta:</p>
                <p className="text-lg">08:00 às 18:00</p>
                <p className="font-semibold mt-3">Sábado:</p>
                <p className="text-lg">08:00 às 12:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
