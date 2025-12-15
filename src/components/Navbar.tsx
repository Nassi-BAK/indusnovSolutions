import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    setIsLangDropdownOpen(false);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/#about', label: t('nav.about') },
    { to: '/#services', label: t('nav.services') },
    { to: '/#contact', label: t('nav.contact') },
  ];

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const handleNavClick = (to: string) => {
    setIsMobileMenuOpen(false);
    if (to.includes('#')) {
      const id = to.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed start-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-industrial-dark/95 shadow-lg backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex h-20 items-center justify-between">
          {/* Logo only */}
          <Link to="/" className="flex items-center">
  <img src={logo} alt="Logo Indusnov" className="h-14 w-14 object-contain" />
</Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => handleNavClick(link.to)}
                className="relative font-body text-sm font-medium uppercase tracking-wider text-primary-foreground/80 transition-colors hover:text-orange-500"
              >
                {link.label}
                <span className="absolute -bottom-1 start-0 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 rounded-md bg-orange-500/10 px-3 py-2 text-orange-500 transition-colors hover:bg-orange-500/20"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm uppercase">{i18n.language}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute end-0 top-full mt-2 min-w-[150px] overflow-hidden rounded-md bg-card shadow-lg"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-muted ${
                        i18n.language === lang.code ? 'bg-orange-500/10 text-orange-500' : 'text-foreground'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-md p-2 text-orange-500 lg:hidden"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-orange-500/20 lg:hidden"
          >
            <div className="flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className="font-body text-sm font-medium uppercase tracking-wider text-primary-foreground/80 transition-colors hover:text-orange-500"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`rounded-md px-4 py-2 text-sm ${
                      i18n.language === lang.code
                        ? 'bg-orange-500 text-white'
                        : 'bg-orange-500/10 text-orange-500'
                    }`}
                  >
                    {lang.flag} {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
