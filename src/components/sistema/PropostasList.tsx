import { useState } from 'react';
import { useSistema } from '../../contexts/SistemaContext';
import { Proposta } from '../../types/sistema';
import { NovaProposta } from './NovaProposta';
import { Search, Plus, Eye, Filter, CheckCircle, Clock, XCircle, FileText } from 'lucide-react';

export function PropostasList() {
  const { propostas } = useSistema();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [selectedProposta, setSelectedProposta] = useState<Proposta | null>(null);
  const [showNovaProposta, setShowNovaProposta] = useState(false);

  const filteredPropostas = propostas.filter(proposta => {
    const matchesSearch = 
      proposta.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposta.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposta.banco.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || proposta.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'aprovada':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Aprovada' };
      case 'contratada':
        return { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Contratada' };
      case 'em_analise':
        return { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Em Análise' };
      case 'enviada':
        return { color: 'bg-purple-100 text-purple-800', icon: FileText, label: 'Enviada' };
      case 'rascunho':
        return { color: 'bg-gray-100 text-gray-800', icon: FileText, label: 'Rascunho' };
      case 'rejeitada':
        return { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejeitada' };
      case 'cancelada':
        return { color: 'bg-gray-100 text-gray-800', icon: XCircle, label: 'Cancelada' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: FileText, label: status };
    }
  };

  const statusOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'rascunho', label: 'Rascunho' },
    { value: 'enviada', label: 'Enviada' },
    { value: 'em_analise', label: 'Em Análise' },
    { value: 'aprovada', label: 'Aprovada' },
    { value: 'contratada', label: 'Contratada' },
    { value: 'rejeitada', label: 'Rejeitada' },
    { value: 'cancelada', label: 'Cancelada' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Propostas</h1>
          <p className="text-gray-600 mt-2">Gerenciamento de propostas de empréstimo</p>
        </div>
        <button 
          onClick={() => setShowNovaProposta(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nova Proposta
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por cliente, ID ou banco..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banco</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPropostas.map((proposta) => {
                const statusInfo = getStatusInfo(proposta.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={proposta.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{proposta.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{proposta.clienteNome}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proposta.valorSolicitado)}
                      </div>
                      {proposta.valorAprovado && (
                        <div className="text-xs text-green-600">
                          Aprovado: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proposta.valorAprovado)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proposta.banco}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proposta.responsavel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {proposta.dataEnvio 
                        ? new Date(proposta.dataEnvio).toLocaleDateString('pt-BR')
                        : new Date(proposta.dataCriacao).toLocaleDateString('pt-BR')
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedProposta(proposta)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver detalhes"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProposta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Detalhes da Proposta</h2>
                <button
                  onClick={() => setSelectedProposta(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">ID da Proposta</label>
                    <p className="text-gray-900 mt-1 font-semibold">{selectedProposta.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Cliente</label>
                    <p className="text-gray-900 mt-1">{selectedProposta.clienteNome}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Valor Solicitado</label>
                    <p className="text-gray-900 mt-1">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedProposta.valorSolicitado)}
                    </p>
                  </div>
                  {selectedProposta.valorAprovado && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Valor Aprovado</label>
                      <p className="text-green-600 mt-1 font-semibold">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedProposta.valorAprovado)}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Banco</label>
                    <p className="text-gray-900 mt-1">{selectedProposta.banco}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tipo de Empréstimo</label>
                    <p className="text-gray-900 mt-1 capitalize">{selectedProposta.tipoEmprestimo.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Taxa de Juros</label>
                    <p className="text-gray-900 mt-1">{selectedProposta.taxaJuros}% ao mês</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Parcelas</label>
                    <p className="text-gray-900 mt-1">{selectedProposta.parcelas}x</p>
                  </div>
                  {selectedProposta.valorParcela && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Valor da Parcela</label>
                      <p className="text-gray-900 mt-1">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedProposta.valorParcela)}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1">
                      {(() => {
                        const statusInfo = getStatusInfo(selectedProposta.status);
                        const StatusIcon = statusInfo.icon;
                        return (
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        );
                      })()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Responsável</label>
                    <p className="text-gray-900 mt-1">{selectedProposta.responsavel}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Data de Criação</label>
                    <p className="text-gray-900 mt-1">
                      {new Date(selectedProposta.dataCriacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  {selectedProposta.dataEnvio && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Data de Envio</label>
                      <p className="text-gray-900 mt-1">
                        {new Date(selectedProposta.dataEnvio).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                  {selectedProposta.dataAprovacao && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Data de Aprovação</label>
                      <p className="text-green-600 mt-1 font-semibold">
                        {new Date(selectedProposta.dataAprovacao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                  {selectedProposta.dataVencimento && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Data de Vencimento</label>
                      <p className="text-gray-900 mt-1">
                        {new Date(selectedProposta.dataVencimento).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                </div>

                {selectedProposta.comissao && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <label className="text-sm font-medium text-gray-700">Comissão</label>
                    <p className="text-blue-600 mt-1 font-semibold text-lg">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedProposta.comissao)}
                    </p>
                  </div>
                )}

                {selectedProposta.observacoes && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Observações</label>
                    <p className="text-gray-900 mt-1">{selectedProposta.observacoes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showNovaProposta && (
        <NovaProposta
          onClose={() => setShowNovaProposta(false)}
          onSuccess={() => {
            setShowNovaProposta(false);
            // A lista será atualizada automaticamente pelo contexto
          }}
        />
      )}
    </div>
  );
}
