import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#1a2847] to-[#0f1829] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          <div>
            <div className="mb-4 sm:mb-6">
              <img 
                src="/Logo JM.png" 
                alt="JM Soluções em Créditos" 
                className="h-16 sm:h-18 md:h-20 w-auto"
              />
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Transformando sonhos em realidade através de soluções financeiras inteligentes e personalizadas.
            </p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#ffd700]">Serviços</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#ffd700] transition-colors">
                  Crédito Consignado
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#ffd700] transition-colors">
                  Empréstimo Pessoal
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#ffd700] transition-colors">
                  Refinanciamento
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#ffd700] transition-colors">
                  Portabilidade de Crédito
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-[#ffd700]">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#4a90e2]" />
                <span className="text-gray-400">(31) 99476-0622</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#ff6b6b]" />
                <span className="text-gray-400">contato@jmsolucoes.com.br</span>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-4 text-gray-300">Redes Sociais</h5>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="bg-white/10 p-3 rounded-lg hover:bg-[#ffd700] hover:text-[#1a2847] transition-all transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/10 p-3 rounded-lg hover:bg-[#ffd700] hover:text-[#1a2847] transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/10 p-3 rounded-lg hover:bg-[#ffd700] hover:text-[#1a2847] transition-all transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              {currentYear} JM Soluções em Créditos — Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#ffd700] transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-[#ffd700] transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0f1a] py-4">
        <p className="text-center text-sm text-gray-500">
          Desenvolvido com tecnologia e segurança
        </p>
      </div>
    </footer>
  );
}
