import { createContext, useContext, useState, ReactNode } from 'react';
import { Proposta, Contrato, Cliente, TransacaoFinanceira } from '../types/sistema';
import { mockPropostas, mockContratos, mockClientes, mockTransacoes } from '../data/mockData';

interface SistemaContextType {
  propostas: Proposta[];
  contratos: Contrato[];
  clientes: Cliente[];
  transacoes: TransacaoFinanceira[];
  addProposta: (proposta: Proposta) => void;
  updateProposta: (id: string, proposta: Partial<Proposta>) => void;
  addContrato: (contrato: Contrato) => void;
  updateContrato: (id: string, contrato: Partial<Contrato>) => void;
  addCliente: (cliente: Cliente) => void;
  updateCliente: (id: string, cliente: Partial<Cliente>) => void;
  addTransacao: (transacao: TransacaoFinanceira) => void;
  updateTransacao: (id: string, transacao: Partial<TransacaoFinanceira>) => void;
}

const SistemaContext = createContext<SistemaContextType | undefined>(undefined);

export function SistemaProvider({ children }: { children: ReactNode }) {
  const [propostas, setPropostas] = useState<Proposta[]>(mockPropostas);
  const [contratos, setContratos] = useState<Contrato[]>(mockContratos);
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
  const [transacoes, setTransacoes] = useState<TransacaoFinanceira[]>(mockTransacoes);

  const addProposta = (proposta: Proposta) => {
    setPropostas([...propostas, proposta]);
  };

  const updateProposta = (id: string, updates: Partial<Proposta>) => {
    setPropostas(propostas.map(p => 
      p.id === id ? { ...p, ...updates, ultimaAtualizacao: new Date().toISOString().split('T')[0] } : p
    ));
  };

  const addContrato = (contrato: Contrato) => {
    setContratos([...contratos, contrato]);
  };

  const updateContrato = (id: string, updates: Partial<Contrato>) => {
    setContratos(contratos.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  const addCliente = (cliente: Cliente) => {
    setClientes([...clientes, cliente]);
  };

  const updateCliente = (id: string, updates: Partial<Cliente>) => {
    setClientes(clientes.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  const addTransacao = (transacao: TransacaoFinanceira) => {
    setTransacoes([...transacoes, transacao]);
  };

  const updateTransacao = (id: string, updates: Partial<TransacaoFinanceira>) => {
    setTransacoes(transacoes.map(t => 
      t.id === id ? { ...t, ...updates } : t
    ));
  };

  return (
    <SistemaContext.Provider value={{ 
      propostas, 
      contratos,
      clientes,
      transacoes,
      addProposta, 
      updateProposta,
      addContrato,
      updateContrato,
      addCliente,
      updateCliente,
      addTransacao,
      updateTransacao
    }}>
      {children}
    </SistemaContext.Provider>
  );
}

export function useSistema() {
  const context = useContext(SistemaContext);
  if (context === undefined) {
    throw new Error('useSistema deve ser usado dentro de um SistemaProvider');
  }
  return context;
}
