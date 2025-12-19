import { useState } from 'react';
import { useSistema } from '../../contexts/SistemaContext';
import { useAuth } from '../../contexts/AuthContext';
import { TransacaoFinanceira } from '../../types/sistema';
import { X, Save } from 'lucide-react';

interface NovaTransacaoProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function NovaTransacao({ onClose, onSuccess }: NovaTransacaoProps) {
  const { addTransacao, transacoes, propostas, clientes } = useSistema();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    tipo: 'receita' as 'receita' | 'despesa',
    categoria: '',
    descricao: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    propostaId: '',
    clienteId: '',
    formaPagamento: 'pix' as 'dinheiro' | 'pix' | 'transferencia' | 'cartao',
    status: 'confirmada' as 'pendente' | 'confirmada' | 'cancelada',
    observacoes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categoriasReceita = ['Comissão', 'Venda', 'Serviço', 'Outros'];
  const categoriasDespesa = ['Marketing', 'Infraestrutura', 'Salários', 'Aluguel', 'Fornecedores', 'Impostos', 'Outros'];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.categoria.trim()) {
      newErrors.categoria = 'Categoria é obrigatória';
    }
    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }
    if (!formData.valor || parseFloat(formData.valor) <= 0) {
      newErrors.valor = 'Valor deve ser maior que zero';
    }
    if (!formData.data) {
      newErrors.data = 'Data é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const novoId = `T${String(transacoes.length + 1).padStart(3, '0')}`;
    const hoje = new Date().toISOString().split('T')[0];
    
    const novaTransacao: TransacaoFinanceira = {
      id: novoId,
      tipo: formData.tipo,
      categoria: formData.categoria,
      descricao: formData.descricao.trim(),
      valor: parseFloat(formData.valor),
      data: formData.data,
      propostaId: formData.propostaId || undefined,
      clienteId: formData.clienteId || undefined,
      formaPagamento: formData.formaPagamento,
      status: formData.status,
      observacoes: formData.observacoes.trim() || undefined,
      criadoPor: user?.nome || 'Sistema',
      dataCriacao: hoje
    };

    addTransacao(novaTransacao);
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Nova Transação</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Transação <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipo: 'receita', categoria: '' })}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
                  formData.tipo === 'receita'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Receita
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipo: 'despesa', categoria: '' })}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
                  formData.tipo === 'despesa'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Despesa
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.categoria ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione uma categoria</option>
                {(formData.tipo === 'receita' ? categoriasReceita : categoriasDespesa).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.valor ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0,00"
              />
              {errors.valor && <p className="text-red-500 text-sm mt-1">{errors.valor}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.data ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.data && <p className="text-red-500 text-sm mt-1">{errors.data}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forma de Pagamento
              </label>
              <select
                value={formData.formaPagamento}
                onChange={(e) => setFormData({ ...formData, formaPagamento: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pix">PIX</option>
                <option value="transferencia">Transferência</option>
                <option value="cartao">Cartão</option>
                <option value="dinheiro">Dinheiro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="confirmada">Confirmada</option>
                <option value="pendente">Pendente</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.descricao ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Descreva a transação..."
            />
            {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proposta (Opcional)
              </label>
              <select
                value={formData.propostaId}
                onChange={(e) => setFormData({ ...formData, propostaId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Nenhuma</option>
                {propostas.map(proposta => (
                  <option key={proposta.id} value={proposta.id}>
                    {proposta.id} - {proposta.clienteNome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cliente (Opcional)
              </label>
              <select
                value={formData.clienteId}
                onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Nenhum</option>
                {clientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Adicione observações sobre a transação..."
            />
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Salvar Transação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
