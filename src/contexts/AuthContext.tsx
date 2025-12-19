import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  nome: string;
  perfil: 'admin' | 'vendedor' | 'financeiro';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciais fictícias
const USUARIOS = {
  'webert@jmsolucoesmg.com.br': {
    senha: 'jm2025',
    nome: 'Webert',
    perfil: 'admin' as const
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Verifica se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return null;
  });

  const login = (email: string, senha: string): boolean => {
    const usuario = USUARIOS[email as keyof typeof USUARIOS];
    
    if (usuario && usuario.senha === senha) {
      const userData: User = {
        email,
        nome: usuario.nome,
        perfil: usuario.perfil
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
