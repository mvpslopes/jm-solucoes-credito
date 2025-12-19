import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  showSistema: boolean;
  setShowSistema: (show: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [showSistema, setShowSistema] = useState(false);

  return (
    <NavigationContext.Provider value={{ showSistema, setShowSistema }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation deve ser usado dentro de um NavigationProvider');
  }
  return context;
}
