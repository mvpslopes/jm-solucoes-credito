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

export default App;
