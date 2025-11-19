import { useState } from 'react';
import { X, Calculator, DollarSign, Calendar, TrendingUp, MessageCircle } from 'lucide-react';

interface SimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Simulator({ isOpen, onClose }: SimulatorProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tipoCredito: '',
    valor: '',
    prazo: '',
    renda: ''
  });
  const [resultado, setResultado] = useState<{
    parcela: number;
    taxaMensal: number;
    taxaAnual: number;
    totalPagar: number;
    cet: number;
  } | null>(null);

  // Taxas de exemplo (ajustar conforme necessário)
  const taxas = {
    consignado: { mensal: 1.5, anual: 19.56 },
    pessoal: { mensal: 3.5, anual: 51.11 },
    cartao: { mensal: 4.5, anual: 69.59 }
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
    const tipo = formData.tipoCredito as keyof typeof taxas;

    if (!valor || !prazo || !tipo) return;

    const taxa = taxas[tipo];
    const taxaMensal = taxa.mensal / 100;
    
    // Cálculo de parcela: PMT = PV * [i * (1+i)^n] / [(1+i)^n - 1]
    const parcela = valor * (taxaMensal * Math.pow(1 + taxaMensal, prazo)) / (Math.pow(1 + taxaMensal, prazo) - 1);
    const totalPagar = parcela * prazo;
    const cet = taxa.anual;

    setResultado({
      parcela: parcela,
      taxaMensal: taxa.mensal,
      taxaAnual: taxa.anual,
      totalPagar: totalPagar,
      cet: cet
    });
    setStep(2);
  };

  const enviarWhatsApp = () => {
    const phoneNumber = '5531994760622';
    const mensagem = `Olá! Gostaria de simular um empréstimo:\n\n` +
      `Tipo: ${formData.tipoCredito}\n` +
      `Valor: R$ ${parseFloat(formData.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` +
      `Prazo: ${formData.prazo} meses\n` +
      `Renda: R$ ${parseFloat(formData.renda).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\n` +
      (resultado ? `Simulação:\n` +
      `Parcela: R$ ${resultado.parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` +
      `Taxa: ${resultado.taxaMensal}% ao mês\n` +
      `Total: R$ ${resultado.totalPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\n` : '') +
      `Gostaria de mais informações!`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetar = () => {
    setFormData({
      tipoCredito: '',
      valor: '',
      prazo: '',
      renda: ''
    });
    setResultado(null);
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#1a2847] to-[#2d3e5f] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#ffd700] to-[#ffed4e] p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-[#1a2847]" />
            </div>
            <h2 className="text-2xl font-bold">Simulador de Crédito</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#ffd700] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); calcular(); }} className="space-y-6">
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
                >
                  <option value="">Selecione o tipo</option>
                  <option value="consignado">Crédito Consignado</option>
                  <option value="pessoal">Empréstimo Pessoal</option>
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
                    min="6"
                    max="84"
                    placeholder="Ex: 24"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffd700] outline-none transition-colors"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Mínimo: 6 meses | Máximo: 84 meses</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2847] mb-2">
                  Renda Mensal (R$) *
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="renda"
                    value={formData.renda}
                    onChange={handleChange}
                    required
                    min="1000"
                    step="100"
                    placeholder="Ex: 3000"
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
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <p className="text-gray-300 text-sm mb-2">Valor da Parcela</p>
                    <p className="text-3xl font-bold text-[#ffd700]">
                      R$ {resultado?.parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <p className="text-gray-300 text-sm mb-2">Taxa de Juros</p>
                    <p className="text-3xl font-bold text-[#ffd700]">
                      {resultado?.taxaMensal}% a.m.
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {resultado?.taxaAnual.toFixed(2)}% a.a. (CET)
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <p className="text-gray-300 text-sm mb-2">Total a Pagar</p>
                    <p className="text-3xl font-bold text-[#ffd700]">
                      R$ {resultado?.totalPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <p className="text-gray-300 text-sm mb-2">Valor Solicitado</p>
                    <p className="text-3xl font-bold text-[#ffd700]">
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
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={enviarWhatsApp}
                  className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Enviar por WhatsApp
                </button>
                <button
                  onClick={resetar}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-[#1a2847] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                >
                  Nova Simulação
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

