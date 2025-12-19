import { useState } from 'react';
import { LayoutDashboard, Users, FileText, DollarSign, LogOut, Menu, X, FileCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { Dashboard } from './Dashboard';
import { ClientesList } from './ClientesList';
import { PropostasList } from './PropostasList';
import { Financeiro } from './Financeiro';
import { ContratosList } from './ContratosList';

type MenuItem = 'dashboard' | 'clientes' | 'propostas' | 'contratos' | 'financeiro';

export function SistemaLayout() {
  const { user, logout } = useAuth();
  const { setShowSistema } = useNavigation();
  const [activeMenu, setActiveMenu] = useState<MenuItem>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    setShowSistema(false);
    window.history.pushState({}, '', '/');
  };

  const menuItems = [
    { id: 'dashboard' as MenuItem, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clientes' as MenuItem, label: 'Clientes', icon: Users },
    { id: 'propostas' as MenuItem, label: 'Propostas', icon: FileText },
    { id: 'contratos' as MenuItem, label: 'Contratos', icon: FileCheck },
    { id: 'financeiro' as MenuItem, label: 'Financeiro', icon: DollarSign },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'clientes':
        return <ClientesList />;
      case 'propostas':
        return <PropostasList />;
      case 'contratos':
        return <ContratosList />;
      case 'financeiro':
        return <Financeiro />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div>
              <h1 className="text-xl font-bold">JM Soluções</h1>
              <p className="text-sm text-gray-400">Sistema Interno</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1 text-center lg:text-left lg:ml-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeMenu)?.label}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user?.nome || 'Usuário'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.perfil || 'Usuário'}</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.nome?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="min-h-screen">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
