import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { SistemaProvider } from './contexts/SistemaContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Benefits } from './components/Benefits';
import { Simulator } from './components/Simulator';
import { CTA } from './components/CTA';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Partner } from './components/Partner';
import { Journey } from './components/Journey';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { SistemaLayout } from './components/sistema/SistemaLayout';
import { Login } from './components/sistema/Login';
import { SplashScreen } from './components/SplashScreen';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const { showSistema, setShowSistema } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se há parâmetro na URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('sistema') === 'true') {
      setShowSistema(true);
    }

    // Listener para o botão do footer
    const handleButtonClick = (e: Event) => {
      e.preventDefault();
      setShowSistema(true);
    };

    const button = document.getElementById('btn-acesso-sistema');
    if (button) {
      button.addEventListener('click', handleButtonClick);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleButtonClick);
      }
    };
  }, [setShowSistema]);

  // Se ainda está carregando, mostra a splash screen
  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  // Se não está autenticado e quer ver o sistema, mostra login
  if (showSistema && !isAuthenticated) {
    return <Login />;
  }

  // Se está autenticado, mostra o sistema
  if (showSistema && isAuthenticated) {
    return <SistemaLayout />;
  }

  // Site público padrão
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="benefits">
        <Benefits />
      </div>
      <Journey />
      <div id="simulator">
        <Simulator />
      </div>
      <CTA />
      <Testimonials />
      <div id="partner">
        <Partner />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <SistemaProvider>
          <AppContent />
        </SistemaProvider>
      </NavigationProvider>
    </AuthProvider>
  );
}

export default App;
