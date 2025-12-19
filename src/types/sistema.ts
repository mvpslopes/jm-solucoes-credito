// Tipos e interfaces para o Sistema de Controle Interno JM Soluções

export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  endereco: {
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  renda: number;
  score: number;
  limiteCartaoAtual?: number;
  bancoCartao?: string;
  observacoes?: string;
  dataCadastro: string;
  status: 'ativo' | 'inativo' | 'bloqueado';
  criadoPor: string;
}

export interface Proposta {
  id: string;
  clienteId: string;
  clienteNome: string;
  valorSolicitado: number;
  valorAprovado?: number;
  taxaJuros: number;
  parcelas: number;
  valorParcela?: number;
  banco: string;
  tipoEmprestimo: 'cartao_credito' | 'consignado' | 'pessoal';
  status: 'rascunho' | 'enviada' | 'em_analise' | 'aprovada' | 'rejeitada' | 'cancelada' | 'contratada';
  dataEnvio?: string;
  dataAprovacao?: string;
  dataVencimento?: string;
  observacoes?: string;
  responsavel: string;
  comissao?: number;
  dataCriacao: string;
  ultimaAtualizacao: string;
}

export interface TransacaoFinanceira {
  id: string;
  tipo: 'receita' | 'despesa';
  categoria: string;
  descricao: string;
  valor: number;
  data: string;
  propostaId?: string;
  clienteId?: string;
  formaPagamento: 'dinheiro' | 'pix' | 'transferencia' | 'cartao';
  status: 'pendente' | 'confirmada' | 'cancelada';
  observacoes?: string;
  criadoPor: string;
  dataCriacao: string;
}

export interface DashboardStats {
  totalClientes: number;
  clientesNovosMes: number;
  totalPropostas: number;
  propostasPendentes: number;
  propostasAprovadas: number;
  taxaAprovacao: number;
  receitaMes: number;
  receitaAno: number;
  comissoesPendentes: number;
  comissoesRecebidas: number;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: 'admin' | 'vendedor' | 'financeiro';
  ativo: boolean;
}

export interface Contrato {
  id: string;
  propostaId: string;
  clienteId: string;
  clienteNome: string;
  numeroContrato: string;
  valorContratado: number;
  taxaJuros: number;
  parcelas: number;
  valorParcela: number;
  banco: string;
  tipoEmprestimo: 'cartao_credito' | 'consignado' | 'pessoal';
  dataContratacao: string;
  dataVencimento: string;
  status: 'ativo' | 'quitado' | 'em_atraso' | 'cancelado';
  parcelasPagas: number;
  parcelasRestantes: number;
  valorTotalPago: number;
  valorRestante: number;
  proximaParcela?: {
    numero: number;
    valor: number;
    vencimento: string;
  };
  responsavel: string;
  observacoes?: string;
}
