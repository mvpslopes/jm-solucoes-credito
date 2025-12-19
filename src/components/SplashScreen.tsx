import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Anima a barra de progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40); // Atualiza a cada 40ms para completar em ~2 segundos

    // Simula o carregamento inicial
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Aguarda a animação de fade out antes de chamar onFinish
      setTimeout(() => {
        onFinish();
      }, 500); // Tempo da animação de fade out
    }, 2000); // Tempo que a splash screen fica visível (2 segundos)

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-[#1a2847] via-[#152238] to-[#0f1829] flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Efeitos de fundo animados reduzidos */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Círculo flutuante único */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ffd700]/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="flex flex-col items-center justify-center relative z-10">
        {/* Logo JM com animação de entrada */}
        <div 
          className={`mb-6 transition-all duration-700 ${
            logoLoaded 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-90'
          }`}
        >
          <img 
            src="/Logo JM.png" 
            alt="JM Soluções em Créditos" 
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain drop-shadow-lg"
            onLoad={() => {
              setTimeout(() => setLogoLoaded(true), 100);
            }}
          />
        </div>
        
        {/* Indicador de carregamento */}
        <div className="w-40 sm:w-48 md:w-56 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#ffd700] via-[#ffed4e] to-[#ffd700] rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

    </div>
  );
}

