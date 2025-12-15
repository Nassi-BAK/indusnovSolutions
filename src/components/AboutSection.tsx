import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Lightbulb, Users, Award } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Lightbulb,
  Users,
  Award,
};

const AboutSection = () => {
  const { t } = useTranslation();
  const values = t('about.values', { returnObjects: true }) as {
    icon: string;
    title: string;
    description: string;
  }[];
  const stats = t('about.stats', { returnObjects: true }) as {
    value: string;
    label: string;
  }[];

  return (
    <section id="about" className="bg-background py-20 lg:py-32">
      <div className="section-container">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              {t('nav.about')}
            </span>
            <h2 className="section-title">{t('about.title')}</h2>
            <p className="mb-6 text-lg text-muted-foreground">{t('about.subtitle')}</p>
            <p className="mb-8 text-muted-foreground leading-relaxed">{t('about.description')}</p>

            {/* Mission */}
            <div className="relative border-s-4 border-primary ps-6">
              <h3 className="mb-2 font-heading text-xl font-bold text-foreground">
                {t('about.mission')}
              </h3>
              <p className="text-muted-foreground">{t('about.missionText')}</p>
            </div>
          </motion.div>

          {/* Right - Values Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => {
              const IconComponent = iconMap[value.icon] || Shield;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary">
                    <IconComponent className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h4 className="mb-2 font-heading text-lg font-bold text-foreground">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid gap-8 rounded-2xl bg-accent p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-12"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="mb-2 block font-heading text-4xl font-bold text-primary-foreground lg:text-5xl"
              >
                {stat.value}
              </motion.span>
              <span className="text-sm font-medium uppercase tracking-wider text-primary-foreground/80">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
