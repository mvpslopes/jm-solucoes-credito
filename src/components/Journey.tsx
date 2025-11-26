import { PlayCircle } from 'lucide-react';

const journeyVideos = [
  {
    title: 'Vídeo Institucional',
    description: 'Conheça a Jornada JM, nossos valores e como transformamos limites em oportunidades.',
    url: 'https://player.vimeo.com/video/1140442126?title=0&byline=0&portrait=0',
  },
  {
    title: 'Vídeo para Viagens',
    description: 'Planeje viagens sem aperto: veja como antecipar o limite do cartão em Pix pode ajudar.',
    url: 'https://player.vimeo.com/video/1140442293?title=0&byline=0&portrait=0',
  },
  {
    title: 'Vídeo para Agência',
    description: 'Parceiros comerciais contam como a JM simplifica vendas com soluções rápidas.',
    url: 'https://player.vimeo.com/video/1140442218?title=0&byline=0&portrait=0',
  },
];

export function Journey() {
  return (
    <section id="journey" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#1a2847]/10 text-[#1a2847] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <PlayCircle className="w-4 h-4" />
            Jornada JM
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a2847] mb-3">
            Conheça o nosso trabalho em vídeo
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Entenda nossa missão, valores e o modelo de trabalho que nos tornou referência em soluções financeiras acessíveis, confiáveis e eficientes.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {journeyVideos.map((video) => (
            <article
              key={video.url}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 pointer-events-none" />
                <iframe
                  src={video.url}
                  title={video.title}
                  className="w-full h-[420px] object-cover"
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-[#1a2847] mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm flex-1">{video.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

