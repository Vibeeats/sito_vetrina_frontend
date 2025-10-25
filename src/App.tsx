import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import Modules from './components/Modules';
import Why from './components/Why';
import Kpi from './components/Kpi';
import Cta from './components/Cta';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <Modules />
        <Why />
        <Kpi />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
