import { useSistema } from '../../contexts/SistemaContext';
import { TrendingUp, Users, FileText, DollarSign, Percent, Clock, FileCheck } from 'lucide-react';

export function Dashboard() {
  const { propostas, contratos, clientes } = useSistema();
  
  // Calcular estatísticas dinâmicas
  const totalClientes = clientes.length;
  const clientesNovosMes = clientes.filter(c => {
    const dataCadastro = new Date(c.dataCadastro);
    const hoje = new Date();
    return dataCadastro.getMonth() === hoje.getMonth() && dataCadastro.getFullYear() === hoje.getFullYear();
  }).length;
  
  const totalPropostas = propostas.length;
  const propostasPendentes = propostas.filter(p => p.status === 'em_analise' || p.status === 'enviada').length;
  const propostasAprovadas = propostas.filter(p => p.status === 'aprovada' || p.status === 'contratada').length;
  const taxaAprovacao = totalPropostas > 0 ? (propostasAprovadas / totalPropostas) * 100 : 0;
  
  const totalContratos = contratos.length;
  const contratosAtivos = contratos.filter(c => c.status === 'ativo').length;
  const valorTotalContratado = contratos.reduce((sum, c) => sum + c.valorContratado, 0);
  
  const receitaMes = propostas
    .filter(p => p.comissao && (p.status === 'aprovada' || p.status === 'contratada'))
    .reduce((sum, p) => sum + (p.comissao || 0), 0);
  
  const comissoesPendentes = propostas
    .filter(p => p.comissao && p.status === 'aprovada')
    .reduce((sum, p) => sum + (p.comissao || 0), 0) * 0.1; // 10% pendente
  
  const comissoesRecebidas = receitaMes - comissoesPendentes;

  const cards = [
    {
      title: 'Total de Clientes',
      value: totalClientes,
      change: `+${clientesNovosMes} este mês`,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Propostas Enviadas',
      value: totalPropostas,
      change: `${propostasPendentes} pendentes`,
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Contratos Ativos',
      value: contratosAtivos,
      change: `${totalContratos} no total`,
      icon: FileCheck,
      color: 'bg-purple-500'
    },
    {
      title: 'Taxa de Aprovação',
      value: `${taxaAprovacao.toFixed(1)}%`,
      change: `${propostasAprovadas} aprovadas`,
      icon: Percent,
      color: 'bg-indigo-500'
    },
    {
      title: 'Receita do Mês',
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receitaMes),
      change: `${comissoesPendentes > 0 ? `R$ ${comissoesPendentes.toFixed(2)} pendentes` : 'Tudo recebido'}`,
      icon: DollarSign,
      color: 'bg-yellow-500'
    },
    {
      title: 'Valor Contratado',
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(valorTotalContratado),
      change: `${totalContratos} contratos`,
      icon: FileCheck,
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral do sistema JM Soluções</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {card.change}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumo Financeiro</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Receita do Mês</span>
              <span className="text-lg font-bold text-green-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receitaMes)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valor Total Contratado</span>
              <span className="text-lg font-bold text-blue-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(valorTotalContratado)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-gray-600">Comissões Recebidas</span>
              <span className="text-lg font-bold text-blue-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(comissoesRecebidas)}
              </span>
            </div>
            {comissoesPendentes > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Comissões Pendentes
                </span>
                <span className="text-lg font-bold text-orange-600">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(comissoesPendentes)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Status das Propostas</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total de Propostas</span>
              <span className="text-lg font-bold text-gray-900">{totalPropostas}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Aprovadas</span>
              <span className="text-lg font-bold text-green-600">{propostasAprovadas}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pendentes</span>
              <span className="text-lg font-bold text-yellow-600">{propostasPendentes}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-gray-600">Taxa de Aprovação</span>
              <span className="text-lg font-bold text-purple-600">{taxaAprovacao.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-gray-600">Contratos Ativos</span>
              <span className="text-lg font-bold text-teal-600">{contratosAtivos}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
