import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = t('testimonials.items', { returnObjects: true }) as {
    name: string;
    company: string;
    text: string;
    rating: number;
  }[];

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  return (
    <section id="testimonials" className="bg-secondary py-20 lg:py-32">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
            {t('nav.testimonials')}
          </span>
          <h2 className="section-title">{t('testimonials.title')}</h2>
          <p className="section-subtitle mx-auto">{t('testimonials.subtitle')}</p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl bg-card p-8 shadow-lg md:p-12"
            >
              {/* Quote Icon */}
              <Quote className="absolute -start-4 -top-4 h-12 w-12 text-primary opacity-20 md:h-16 md:w-16" />

              {/* Rating */}
              <div className="mb-6 flex justify-center gap-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="mb-8 text-center text-lg italic text-muted-foreground md:text-xl">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="text-center">
                <div className="mb-1 font-heading text-lg font-bold text-foreground">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-sm text-primary">{testimonials[currentIndex].company}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute start-0 top-1/2 -translate-x-4 -translate-y-1/2 rounded-full bg-card p-3 shadow-lg transition-all hover:bg-primary hover:text-primary-foreground md:-translate-x-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute end-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-card p-3 shadow-lg transition-all hover:bg-primary hover:text-primary-foreground md:translate-x-12"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
