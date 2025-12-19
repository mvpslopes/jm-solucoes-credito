import { useState } from 'react';
import { useSistema } from '../../contexts/SistemaContext';
import { useAuth } from '../../contexts/AuthContext';
import { mockClientes } from '../../data/mockData';
import { Proposta } from '../../types/sistema';
import { X, Save, Send } from 'lucide-react';

interface NovaPropostaProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function NovaProposta({ onClose, onSuccess }: NovaPropostaProps) {
  const { addProposta, propostas } = useSistema();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    clienteId: '',
    valorSolicitado: '',
    taxaJuros: '2.5',
    parcelas: '24',
    banco: '',
    tipoEmprestimo: 'cartao_credito' as 'cartao_credito' | 'consignado' | 'pessoal',
    observacoes: '',
    status: 'rascunho' as 'rascunho' | 'enviada'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const clienteSelecionado = mockClientes.find(c => c.id === formData.clienteId);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.clienteId) {
      newErrors.clienteId = 'Selecione um cliente';
    }
    if (!formData.valorSolicitado || parseFloat(formData.valorSolicitado) <= 0) {
      newErrors.valorSolicitado = 'Valor deve ser maior que zero';
    }
    if (!formData.banco) {
      newErrors.banco = 'Selecione um banco';
    }
    if (!formData.taxaJuros || parseFloat(formData.taxaJuros) <= 0) {
      newErrors.taxaJuros = 'Taxa de juros inválida';
    }
    if (!formData.parcelas || parseInt(formData.parcelas) <= 0) {
      newErrors.parcelas = 'Número de parcelas inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calcularValorParcela = () => {
    if (!formData.valorSolicitado || !formData.taxaJuros || !formData.parcelas) return 0;
    
    const valor = parseFloat(formData.valorSolicitado);
    const taxa = parseFloat(formData.taxaJuros) / 100;
    const numParcelas = parseInt(formData.parcelas);
    
    if (taxa === 0) {
      return valor / numParcelas;
    }
    
    const valorParcela = valor * (taxa * Math.pow(1 + taxa, numParcelas)) / (Math.pow(1 + taxa, numParcelas) - 1);
    return valorParcela;
  };

  const handleSubmit = (enviar: boolean) => {
    if (!validate()) return;

    const novoId = `P${String(propostas.length + 1).padStart(3, '0')}`;
    const hoje = new Date().toISOString().split('T')[0];
    
    const novaProposta: Proposta = {
      id: novoId,
      clienteId: formData.clienteId,
      clienteNome: clienteSelecionado?.nome || '',
      valorSolicitado: parseFloat(formData.valorSolicitado),
      taxaJuros: parseFloat(formData.taxaJuros),
      parcelas: parseInt(formData.parcelas),
      valorParcela: calcularValorParcela(),
      banco: formData.banco,
      tipoEmprestimo: formData.tipoEmprestimo,
      status: enviar ? 'enviada' : 'rascunho',
      dataEnvio: enviar ? hoje : undefined,
      observacoes: formData.observacoes || undefined,
      responsavel: user?.nome || 'Sistema',
      dataCriacao: hoje,
      ultimaAtualizacao: hoje
    };

    addProposta(novaProposta);
    onSuccess?.();
    onClose();
  };

  const bancos = ['Banco do Brasil', 'Itaú', 'Bradesco', 'Santander', 'Nubank', 'Inter', 'C6 Bank', 'Original'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Nova Proposta</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cliente <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.clienteId}
              onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.clienteId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecione um cliente</option>
              {mockClientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome} - CPF: {cliente.cpf}
                </option>
              ))}
            </select>
            {errors.clienteId && <p className="text-red-500 text-sm mt-1">{errors.clienteId}</p>}
            {clienteSelecionado && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Renda:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(clienteSelecionado.renda)} | 
                  <strong> Score:</strong> {clienteSelecionado.score} | 
                  <strong> Limite Atual:</strong> {clienteSelecionado.limiteCartaoAtual ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(clienteSelecionado.limiteCartaoAtual) : 'N/A'}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor Solicitado (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.valorSolicitado}
                onChange={(e) => setFormData({ ...formData, valorSolicitado: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.valorSolicitado ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0,00"
              />
              {errors.valorSolicitado && <p className="text-red-500 text-sm mt-1">{errors.valorSolicitado}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banco <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.banco}
                onChange={(e) => setFormData({ ...formData, banco: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.banco ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione um banco</option>
                {bancos.map(banco => (
                  <option key={banco} value={banco}>{banco}</option>
                ))}
              </select>
              {errors.banco && <p className="text-red-500 text-sm mt-1">{errors.banco}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taxa de Juros (% ao mês) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.taxaJuros}
                onChange={(e) => setFormData({ ...formData, taxaJuros: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.taxaJuros ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.taxaJuros && <p className="text-red-500 text-sm mt-1">{errors.taxaJuros}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Parcelas <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={formData.parcelas}
                onChange={(e) => setFormData({ ...formData, parcelas: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.parcelas ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.parcelas && <p className="text-red-500 text-sm mt-1">{errors.parcelas}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Empréstimo
              </label>
              <select
                value={formData.tipoEmprestimo}
                onChange={(e) => setFormData({ ...formData, tipoEmprestimo: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="cartao_credito">Cartão de Crédito</option>
                <option value="consignado">Consignado</option>
                <option value="pessoal">Pessoal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor da Parcela (Calculado)
              </label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                <p className="text-lg font-semibold text-gray-900">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calcularValorParcela())}
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Adicione observações sobre esta proposta..."
            />
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Salvar como Rascunho
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar Proposta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
