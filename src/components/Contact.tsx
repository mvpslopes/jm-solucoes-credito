import { useState } from 'react';
import { Send, Phone, MessageCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const dados = {
      tipo: 'contato',
      name: formData.name,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      message: formData.message || 'Sem mensagem'
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
        setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Limpa o formulário
        setFormData({
          name: '',
          phone: '',
          whatsapp: '',
          message: ''
        });

        // Remove a mensagem de sucesso após 5 segundos
        setTimeout(() => setSubmitMessage(''), 5000);
      } else {
        setSubmitMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.');
      }
    } catch (error) {
      setSubmitMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a2847] mb-3 sm:mb-4">
            Entre em Contato
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] mx-auto rounded-full mb-3 sm:mb-4"></div>
          <p className="text-gray-600 text-base sm:text-lg">
            Estamos prontos para atender você
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors text-[#1a2847] placeholder:text-gray-400"
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
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors text-[#1a2847] placeholder:text-gray-400"
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
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors text-[#1a2847] placeholder:text-gray-400"
                    placeholder="(11) 98888-8888"
                  />
                </div>
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors resize-none text-[#1a2847] placeholder:text-gray-400"
                  placeholder="Conte-nos mais sobre sua necessidade..."
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
                className="w-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a2847] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#1a2847] border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar mensagem
                  </>
                )}
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
