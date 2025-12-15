import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

// Images des services (IDs alignés avec ServicesSection)
const serviceImages: Record<string, string> = {
  drontech: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200',
  aquascope: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200',
  ecoscan: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=1200',
  predictech: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=1200',
  skillnov: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200',
  smartflow: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200',
};

const ServiceDetail = () => {
  const params = useParams<{ serviceId?: string }>();
  const serviceId = params.serviceId;
  const { t } = useTranslation();

  // Liste des services avec ID, titre, description complète et features
  const services = t('services.items', { returnObjects: true }) as {
    id: string;
    title: string;
    fullDesc: string;
    features: string[];
  }[] || [
    { id: 'drontech', title: 'DronTech', fullDesc: 'Inspection complète par drone.', features: ['Surveillance aérienne', 'Inspection sécurité', 'Rapport détaillé'] },
    { id: 'aquascope', title: 'AquaScope', fullDesc: 'Inspection sous-marine avancée.', features: ['Cartographie sous-marine', 'Analyse qualité de l’eau', 'Inspection structurelle'] },
    { id: 'ecoscan', title: 'EcoScan', fullDesc: 'Audit énergétique pour vos installations.', features: ['Analyse consommation', 'Rapport optimisation', 'Conseils techniques'] },
    { id: 'predictech', title: 'PredicTech', fullDesc: 'Maintenance prédictive intelligente.', features: ['Surveillance équipement', 'Alertes automatiques', 'Rapports de maintenance'] },
    { id: 'skillnov', title: 'SkilNov', fullDesc: 'Formation technique et innovation.', features: ['Cours en ligne', 'Ateliers pratiques', 'Certifications'] },
    { id: 'smartflow', title: 'SmartFlow', fullDesc: 'Automatisation industrielle sur mesure.', features: ['Optimisation process', 'Gestion robotique', 'Tableaux de bord'] },
  ];

  if (!serviceId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">Service not found</h1>
      </div>
    );
  }

  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Service not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = serviceImages[serviceId] || '';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="industrial-overlay" />
        <div className="relative z-10 flex h-full items-center">
          <div className="section-container w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/#services"
                className="mb-6 inline-flex items-center gap-2 text-primary-foreground/80 transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-heading text-sm uppercase tracking-wider">
                  {t('services.title')}
                </span>
              </Link>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 h-1 bg-primary"
              />
              <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
                {service.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-32">
        <div className="section-container">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="mb-6 font-heading text-3xl font-bold text-foreground">
                {t('about.mission')}
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                {service.fullDesc}
              </p>

              {/* Features Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 rounded-lg bg-muted p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-28 rounded-2xl bg-accent p-8">
                <h3 className="mb-6 font-heading text-xl font-bold text-accent-foreground">
                  {t('services.requestQuote')}
                </h3>
                <p className="mb-6 text-accent-foreground/80">
                  {t('contact.subtitle')}
                </p>
                <Link
                  to="/#contact"
                  className="btn-primary block w-full text-center"
                >
                  {t('hero.cta.quote')}
                </Link>

                {/* Other Services */}
                <div className="mt-8 border-t border-accent-foreground/20 pt-8">
                  <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-accent-foreground">
                    {t('footer.ourServices')}
                  </h4>
                  <ul className="space-y-3">
                    {services
                      .filter((s) => s.id !== serviceId)
                      .slice(0, 4)
                      .map((s) => (
                        <li key={s.id}>
                          <Link
                            to={`/services/${s.id}`}
                            className="text-accent-foreground/70 transition-colors hover:text-primary-foreground"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default ServiceDetail;
