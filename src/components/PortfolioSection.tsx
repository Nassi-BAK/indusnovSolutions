import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    category: 'welding',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600',
    title: 'Structure Aéronautique',
  },
  {
    id: 2,
    category: 'machining',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600',
    title: 'Pièces de Précision',
  },
  {
    id: 3,
    category: 'construction',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600',
    title: 'Charpente Métallique',
  },
  {
    id: 4,
    category: 'automation',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=600',
    title: 'Ligne Robotisée',
  },
  {
    id: 5,
    category: 'welding',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    title: 'Soudure TIG Inox',
  },
  {
    id: 6,
    category: 'construction',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600',
    title: 'Bâtiment Industriel',
  },
];

const PortfolioSection = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filters = t('portfolio.filters', { returnObjects: true }) as Record<string, string>;

  const filteredItems =
    activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="bg-background py-20 lg:py-32">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
            {t('nav.portfolio')}
          </span>
          <h2 className="section-title">{t('portfolio.title')}</h2>
          <p className="section-subtitle mx-auto">{t('portfolio.subtitle')}</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {Object.entries(filters).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`rounded-full px-6 py-2 font-heading text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                activeFilter === key
                  ? 'bg-primary text-primary-foreground shadow-primary'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(item.image)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-industrial-dark/90 via-industrial-dark/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="p-6">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-primary">
                      {filters[item.category]}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-primary-foreground">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-industrial-dark/95 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute end-4 top-4 rounded-full bg-primary p-2 text-primary-foreground"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src={selectedImage}
                alt="Project"
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioSection;
