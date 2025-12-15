import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';
import { Link as ScrollLink } from 'react-scroll';

const slides = [hero1, hero2, hero3];

const HeroCarousel = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = t('hero.slides', { returnObjects: true }) as { title: string; subtitle: string }[];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide]})` }}
          />
          <div className="industrial-overlay" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="section-container w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 h-1 bg-primary"
              />
              <h1 className="mb-6 font-heading text-5xl font-bold uppercase tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
                {heroSlides[currentSlide]?.title}
              </h1>
              <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl lg:text-2xl">
                {heroSlides[currentSlide]?.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/#services" className="btn-primary">
                  {t('hero.cta.services')}
                </Link>
                <ScrollLink
  to="contact"   // id de la section contact
  smooth
  duration={500}
  className="btn-secondary cursor-pointer"
>
  {t('hero.cta.quote')}
</ScrollLink>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute start-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-primary-foreground/10 p-3 backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-primary-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute end-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-primary-foreground/10 p-3 backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-primary-foreground" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-10 bg-primary'
                : 'w-2 bg-primary-foreground/50 hover:bg-primary-foreground'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="h-12 w-6 rounded-full border-2 border-primary-foreground/50 p-1">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroCarousel;
