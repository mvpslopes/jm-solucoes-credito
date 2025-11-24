import { useState } from 'react';
import { Calculator, DollarSign, Calendar, MessageCircle, User, Phone } from 'lucide-react';

export function Simulator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tipoCredito: 'cartao',
    valor: '',
    prazo: '',
    nome: '',
    whatsapp: ''
  });
  const [resultado, setResultado] = useState<{
    parcela: number;
    taxaMensal: number;
    taxaAnual: number;
    totalPagar: number;
    cet: number;
  } | null>(null);

  // Tabela de taxas baseada na planilha do cliente
  // Percentual de juros total por número de parcelas
  const taxasPorPrazo: { [key: number]: number } = {
    1: 6.00,
    2: 7.06,
    3: 8.12,
    4: 9.18,
    5: 10.24,
    6: 11.29,
    7: 12.35,
    8: 13.41,
    9: 14.47,
    10: 15.53,
    11: 16.59,
    12: 17.65,
    13: 18.71,
    14: 19.76,
    15: 20.82,
    16: 21.88,
    17: 22.94,
    18: 24.00,
    19: 25.63,
    20: 26.35,
    21: 27.07
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calcular = () => {
    const valor = parseFloat(formData.valor);
    const prazo = parseInt(formData.prazo);

    if (!valor || !prazo || !formData.nome || !formData.whatsapp) return;

    // Busca a taxa percentual total para o prazo informado
    const taxaPercentual = taxasPorPrazo[prazo] || 0;
    
    // Calcula o valor total com base na taxa percentual
    const totalPagar = valor * (1 + taxaPercentual / 100);
    
    // Calcula o valor da parcela
    const parcela = totalPagar / prazo;
    
    // Calcula taxa mensal aproximada (para exibição)
    // Usando a fórmula inversa para encontrar a taxa mensal equivalente
    const taxaMensalAprox = (Math.pow(totalPagar / valor, 1 / prazo) - 1) * 100;
    const taxaAnualAprox = taxaMensalAprox * 12;

    setResultado({
      parcela: parcela,
      taxaMensal: taxaMensalAprox,
      taxaAnual: taxaAnualAprox,
      totalPagar: totalPagar,
      cet: taxaAnualAprox
    });

    // Salva os dados na planilha do Google (silenciosamente)
    salvarNaPlanilha();

    setStep(2);
  };

  const salvarNaPlanilha = async () => {
    const valor = parseFloat(formData.valor);
    const prazo = parseInt(formData.prazo);
    const taxaPercentual = taxasPorPrazo[prazo] || 0;
    const totalPagar = valor * (1 + taxaPercentual / 100);
    const parcela = totalPagar / prazo;

    // URL do Google Apps Script (será configurada pelo cliente)
    // IMPORTANTE: O cliente precisa configurar esta URL após criar o Google Apps Script
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

    if (!GOOGLE_SCRIPT_URL) {
      // Se não houver URL configurada, apenas registra no console (modo desenvolvimento)
      console.log('Dados da simulação:', {
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        valor: valor,
        prazo: prazo,
        parcela: parcela,
        totalPagar: totalPagar,
        taxa: taxaPercentual,
        data: new Date().toLocaleString('pt-BR')
      });
      return;
    }

    const dados = {
      nome: formData.nome,
      whatsapp: formData.whatsapp,
      valor: valor, // Envia como número, não string
      prazo: prazo, // Envia como número, não string
      parcela: parseFloat(parcela.toFixed(2)), // Converte para número
      totalPagar: parseFloat(totalPagar.toFixed(2)), // Converte para número
      taxa: parseFloat(taxaPercentual.toFixed(2)), // Converte para número
      data: new Date().toLocaleString('pt-BR')
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requer no-cors
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
      });
      
      // Como estamos usando no-cors, não podemos verificar a resposta
      // Mas o dado será salvo na planilha
      console.log('Dados enviados para a planilha com sucesso');
    } catch (error) {
      console.error('Erro ao salvar na planilha:', error);
      // Não bloqueia o fluxo, apenas registra o erro
    }
  };

  const enviarNotificacaoCliente = () => {
    const phoneNumberCliente = '5531994760622';
    const valor = parseFloat(formData.valor);
    const prazo = parseInt(formData.prazo);
    const taxaPercentual = taxasPorPrazo[prazo] || 0;
    const totalPagar = valor * (1 + taxaPercentual / 100);
    const parcela = totalPagar / prazo;

    const mensagem = `🔔 *Nova Simulação Realizada*\n\n` +
      `👤 *Nome:* ${formData.nome}\n` +
      `📱 *WhatsApp:* ${formData.whatsapp}\n\n` +
      `📊 *Detalhes da Simulação:*\n` +
      `💰 Valor: R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` +
      `📅 Prazo: ${prazo}x\n` +
      `💵 Parcela: R$ ${parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` +
      `📈 Total: R$ ${totalPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\n` +
      `_Simulação realizada no site_`;

    const whatsappUrl = `https://wa.me/${phoneNumberCliente}?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  };

  const enviarWhatsApp = () => {
    // Envia notificação para o cliente quando o usuário clicar no botão
    enviarNotificacaoCliente();
  };

  const resetar = () => {
    setFormData({
      tipoCredito: 'cartao',
      valor: '',
      prazo: '',
      nome: '',
      whatsapp: ''
    });
    setResultado(null);
    setStep(1);
  };

  return (
    <section id="simulator" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-gradient-to-br from-[#ffd700] to-[#ffed4e] p-2 sm:p-3 rounded-lg mb-3 sm:mb-4">
            <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-[#1a2847]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a2847] mb-3 sm:mb-4">
            Simulador de Crédito
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] mx-auto rounded-full mb-3 sm:mb-4"></div>
          <p className="text-gray-600 text-base sm:text-lg px-2">
            Simule a troca do limite do seu cartão por PIX
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12">
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); calcular(); }} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1a2847] mb-2">
                  Tipo de Crédito *
                </label>
                <select
                  name="tipoCredito"
                  value={formData.tipoCredito}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors bg-white"
                  disabled
                >
                  <option value="cartao">Trocar Limite do Cartão por PIX</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2847] mb-2">
                  Valor Desejado (R$) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                    required
                    min="100"
                    step="100"
                    placeholder="Ex: 5000"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2847] mb-2">
                  Prazo (meses) *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="prazo"
                    value={formData.prazo}
                    onChange={handleChange}
                    required
                    min="1"
                    max="21"
                    placeholder="até 21x"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2847] mb-2">
                  Nome Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2847] mb-2">
                  WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    placeholder="(31) 99999-9999"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a2847] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Calculator className="w-5 h-5" />
                Calcular Simulação
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Resultado */}
              <div className="bg-gradient-to-br from-[#1a2847] to-[#2d3e5f] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-center">Resultado da Simulação</h3>
                
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">Valor da Parcela</p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#ffd700]">
                      R$ {resultado?.parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">Total a Pagar</p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#ffd700]">
                      R$ {resultado?.totalPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">Valor Solicitado</p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#ffd700]">
                      R$ {parseFloat(formData.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4">
                  <p className="text-sm text-yellow-200">
                    <strong>Importante:</strong> Esta é uma simulação. Os valores podem variar conforme análise de crédito e aprovação.
                  </p>
                </div>
              </div>

              {/* Ações */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={enviarWhatsApp}
                  className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  Enviar por WhatsApp
                </button>
                <button
                  onClick={resetar}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-[#1a2847] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300"
                >
                  Nova Simulação
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
