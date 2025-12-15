import '@/i18n';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroCarousel />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
