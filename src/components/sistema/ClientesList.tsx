import { useState } from 'react';
import { useSistema } from '../../contexts/SistemaContext';
import { Cliente } from '../../types/sistema';
import { NovoCliente } from './NovoCliente';
import { Search, Plus, Eye, Edit, Phone, Mail, MapPin } from 'lucide-react';

export function ClientesList() {
  const { clientes } = useSistema();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [showNovoCliente, setShowNovoCliente] = useState(false);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpf.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'inativo':
        return 'bg-gray-100 text-gray-800';
      case 'bloqueado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-2">Gerenciamento de clientes cadastrados</p>
        </div>
        <button 
          onClick={() => setShowNovoCliente(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renda</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{cliente.nome}</div>
                    <div className="text-sm text-gray-500">{cliente.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.cpf}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cliente.telefone}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {cliente.endereco.cidade}, {cliente.endereco.estado}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cliente.renda)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      cliente.score >= 800 ? 'bg-green-100 text-green-800' :
                      cliente.score >= 700 ? 'bg-blue-100 text-blue-800' :
                      cliente.score >= 600 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {cliente.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cliente.status)}`}>
                      {cliente.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedCliente(cliente)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver detalhes"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Editar">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCliente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Detalhes do Cliente</h2>
                <button
                  onClick={() => setSelectedCliente(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                    <p className="text-gray-900 mt-1">{selectedCliente.nome}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">CPF</label>
                    <p className="text-gray-900 mt-1">{selectedCliente.cpf}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900 mt-1 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {selectedCliente.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Telefone</label>
                    <p className="text-gray-900 mt-1 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {selectedCliente.telefone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Data de Nascimento</label>
                    <p className="text-gray-900 mt-1">
                      {new Date(selectedCliente.dataNascimento).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Renda Mensal</label>
                    <p className="text-gray-900 mt-1">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedCliente.renda)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Score</label>
                    <p className="text-gray-900 mt-1">{selectedCliente.score}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCliente.status)}`}>
                        {selectedCliente.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Endereço</label>
                  <p className="text-gray-900 mt-1">
                    {selectedCliente.endereco.rua}, {selectedCliente.endereco.numero}
                    {selectedCliente.endereco.complemento && ` - ${selectedCliente.endereco.complemento}`}
                    <br />
                    {selectedCliente.endereco.bairro} - {selectedCliente.endereco.cidade}/{selectedCliente.endereco.estado}
                    <br />
                    CEP: {selectedCliente.endereco.cep}
                  </p>
                </div>

                {selectedCliente.limiteCartaoAtual && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Limite do Cartão</label>
                      <p className="text-gray-900 mt-1">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedCliente.limiteCartaoAtual)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Banco do Cartão</label>
                      <p className="text-gray-900 mt-1">{selectedCliente.bancoCartao}</p>
                    </div>
                  </div>
                )}

                {selectedCliente.observacoes && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Observações</label>
                    <p className="text-gray-900 mt-1">{selectedCliente.observacoes}</p>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Cadastrado em {new Date(selectedCliente.dataCadastro).toLocaleDateString('pt-BR')} por {selectedCliente.criadoPor}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNovoCliente && (
        <NovoCliente
          onClose={() => setShowNovoCliente(false)}
          onSuccess={() => {
            setShowNovoCliente(false);
            // A lista será atualizada automaticamente pelo contexto
          }}
        />
      )}
    </div>
  );
}
