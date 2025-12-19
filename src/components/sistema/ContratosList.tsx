import { useState } from 'react';
import { useSistema } from '../../contexts/SistemaContext';
import { Contrato } from '../../types/sistema';
import { Search, Filter, Eye, FileText, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';

export function ContratosList() {
  const { contratos } = useSistema();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(null);

  const filteredContratos = contratos.filter(contrato => {
    const matchesSearch = 
      contrato.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.numeroContrato.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.banco.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || contrato.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'ativo':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Ativo' };
      case 'quitado':
        return { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Quitado' };
      case 'em_atraso':
        return { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Em Atraso' };
      case 'cancelado':
        return { color: 'bg-gray-100 text-gray-800', icon: XCircle, label: 'Cancelado' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: FileText, label: status };
    }
  };

  const statusOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'ativo', label: 'Ativo' },
    { value: 'quitado', label: 'Quitado' },
    { value: 'em_atraso', label: 'Em Atraso' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  const calcularProgresso = (contrato: Contrato) => {
    return (contrato.parcelasPagas / contrato.parcelas) * 100;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contratos</h1>
        <p className="text-gray-600 mt-2">Gestão de contratos de empréstimo ativos</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por cliente, número de contrato ou banco..."
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Contratos</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{contratos.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Contratos Ativos</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {contratos.filter(c => c.status === 'ativo').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total Contratado</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  contratos.reduce((sum, c) => sum + c.valorContratado, 0)
                )}
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContratos.map((contrato) => {
          const statusInfo = getStatusInfo(contrato.status);
          const StatusIcon = statusInfo.icon;
          const progresso = calcularProgresso(contrato);

          return (
            <div
              key={contrato.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedContrato(contrato)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{contrato.clienteNome}</h3>
                  <p className="text-sm text-gray-500">Contrato: {contrato.numeroContrato}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${statusInfo.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusInfo.label}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Banco:</span>
                  <span className="text-sm font-medium text-gray-900">{contrato.banco}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Valor Contratado:</span>
                  <span className="text-sm font-bold text-gray-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrato.valorContratado)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Parcela:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrato.valorParcela)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Parcelas:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {contrato.parcelasPagas} / {contrato.parcelas}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Valor Restante:</span>
                  <span className="text-sm font-bold text-orange-600">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrato.valorRestante)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progresso do Pagamento</span>
                  <span>{progresso.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
              </div>

              {contrato.proximaParcela && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Próxima Parcela</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {contrato.proximaParcela.numero}ª - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrato.proximaParcela.valor)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Vencimento: {new Date(contrato.proximaParcela.vencimento).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredContratos.length === 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Nenhum contrato encontrado</p>
        </div>
      )}

      {selectedContrato && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Detalhes do Contrato</h2>
              <button
                onClick={() => setSelectedContrato(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Número do Contrato</label>
                  <p className="text-gray-900 mt-1 font-semibold">{selectedContrato.numeroContrato}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Cliente</label>
                  <p className="text-gray-900 mt-1">{selectedContrato.clienteNome}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Banco</label>
                  <p className="text-gray-900 mt-1">{selectedContrato.banco}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Tipo de Empréstimo</label>
                  <p className="text-gray-900 mt-1 capitalize">{selectedContrato.tipoEmprestimo.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Valor Contratado</label>
                  <p className="text-gray-900 mt-1 font-semibold text-lg">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedContrato.valorContratado)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Taxa de Juros</label>
                  <p className="text-gray-900 mt-1">{selectedContrato.taxaJuros}% ao mês</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Valor da Parcela</label>
                  <p className="text-gray-900 mt-1 font-semibold">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedContrato.valorParcela)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Total de Parcelas</label>
                  <p className="text-gray-900 mt-1">{selectedContrato.parcelas}x</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Data de Contratação</label>
                  <p className="text-gray-900 mt-1">
                    {new Date(selectedContrato.dataContratacao).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Data de Vencimento</label>
                  <p className="text-gray-900 mt-1">
                    {new Date(selectedContrato.dataVencimento).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p className="mt-1">
                    {(() => {
                      const statusInfo = getStatusInfo(selectedContrato.status);
                      const StatusIcon = statusInfo.icon;
                      return (
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                      );
                    })()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Responsável</label>
                  <p className="text-gray-900 mt-1">{selectedContrato.responsavel}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Situação do Contrato</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Parcelas Pagas</p>
                    <p className="text-lg font-bold text-green-600">{selectedContrato.parcelasPagas}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Parcelas Restantes</p>
                    <p className="text-lg font-bold text-orange-600">{selectedContrato.parcelasRestantes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valor Total Pago</p>
                    <p className="text-lg font-bold text-green-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedContrato.valorTotalPago)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valor Restante</p>
                    <p className="text-lg font-bold text-orange-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedContrato.valorRestante)}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progresso do Pagamento</span>
                    <span>{calcularProgresso(selectedContrato).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${calcularProgresso(selectedContrato)}%` }}
                    />
                  </div>
                </div>
              </div>

              {selectedContrato.proximaParcela && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Próxima Parcela</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Parcela {selectedContrato.proximaParcela.numero} de {selectedContrato.parcelas}</p>
                      <p className="text-xl font-bold text-gray-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedContrato.proximaParcela.valor)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Vencimento</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(selectedContrato.proximaParcela.vencimento).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedContrato.observacoes && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Observações</label>
                  <p className="text-gray-900 mt-1">{selectedContrato.observacoes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
