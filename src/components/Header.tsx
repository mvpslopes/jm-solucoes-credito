import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a2847]/95 backdrop-blur-md border-b border-[#1a2847]/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img 
              src="/Logo JM.png" 
              alt="JM Soluções em Créditos" 
              className="h-12 sm:h-14 md:h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-[#ffd700] transition-colors font-medium"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-[#ffd700] transition-colors font-medium"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-[#ffd700] transition-colors font-medium"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-white hover:text-[#ffd700] transition-colors font-medium"
            >
              Benefícios
            </button>
            <button
              onClick={() => scrollToSection('journey')}
              className="text-white hover:text-[#ffd700] transition-colors font-medium"
            >
              Jornada JM
            </button>
            <button
              onClick={() => scrollToSection('partner')}
              className="text-white hover:text-[#ffd700] transition-colors font-medium"
            >
              Seja nosso Parceiro
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-[#ffd700] transition-colors font-medium"
            >
              Contato
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('simulator');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a2847] px-6 py-2 rounded-full font-bold hover:shadow-lg hover:shadow-[#ffd700]/50 transition-all"
            >
              Simular Agora
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col gap-4 pt-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white hover:text-[#ffd700] transition-colors text-left font-medium"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-[#ffd700] transition-colors text-left font-medium"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-white hover:text-[#ffd700] transition-colors text-left font-medium"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-white hover:text-[#ffd700] transition-colors text-left font-medium"
              >
                Benefícios
              </button>
              <button
                onClick={() => scrollToSection('journey')}
                className="text-white hover:text-[#ffd700] transition-colors text-left font-medium"
              >
                Jornada JM
              </button>
              <button
                onClick={() => scrollToSection('partner')}
                className="text-white hover:text-[#ffd700] transition-colors text-left font-medium"
              >
                Seja nosso Parceiro
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-[#ffd700] transition-colors text-left font-medium"
              >
                Contato
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('simulator');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
                className="bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a2847] px-6 py-3 rounded-full font-bold text-center mt-2"
              >
                Simular Agora
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

