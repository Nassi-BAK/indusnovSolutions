import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const services = t('services.items', { returnObjects: true }) as { id: string; title: string }[];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
     { icon: Twitter, href: 'https://x.com/Indusnov', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/indusnov-solutions/posts/?feedView=all', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/indusnov/', label: 'Instagram' },
  ];

  return (
    <footer className="bg-industrial-dark text-primary-foreground">
      {/* Main Footer */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center">
  <img src={logo} alt="Logo Indusnov" className="h-14 w-14 object-contain" />
</Link>
            <p className="mb-6 text-primary-foreground/70">{t('footer.description')}</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-heading text-lg font-bold uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/70 transition-colors hover:text-primary">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-primary-foreground/70 transition-colors hover:text-primary">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-primary-foreground/70 transition-colors hover:text-primary">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 font-heading text-lg font-bold uppercase tracking-wider">
              {t('footer.ourServices')}
            </h4>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <span className="text-primary-foreground/70 transition-colors hover:text-primary cursor-pointer">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 font-heading text-lg font-bold uppercase tracking-wider">
              {t('footer.contactUs')}
            </h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li>Technopark,Casablanca, Morocco</li>
              <li>+212 661-185357</li>
              <li>+212 522-750707</li>
              <li>contact@indusnov.com</li>
              <li>{t('contact.info.hours')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="section-container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-center text-sm text-primary-foreground/60">
            © {currentYear} Indusnov. {t('footer.rights')}.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-primary-foreground/60 transition-colors hover:text-primary">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-primary-foreground/60 transition-colors hover:text-primary">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 end-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;
