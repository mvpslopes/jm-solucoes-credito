import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Benefits } from './components/Benefits';
import { CTA } from './components/CTA';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

function App() {
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
      <CTA />
      <Testimonials />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
