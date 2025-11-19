import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '5531994760622';
  const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços de crédito.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl hover:shadow-[#25D366]/50 transform hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
        1
      </span>
    </a>
  );
}

