import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const services = t('services.items', { returnObjects: true }) as { id: string; title: string }[];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // بيانات EmailJS
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE,   // SERVICE ID
        import.meta.env.VITE_EMAILJS_TEMPLATE,  // TEMPLATE ID
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC     // PUBLIC KEY
      )
      .then(() => {
        toast({
          title: t('contact.form.success'),
          description: 'We will contact you shortly.',
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  const contactInfo = [
    { icon: MapPin, label: 'Technopark, Casablanca, Morocco' },
    { icon: Phone, label: '+212 661-185357' },
    { icon: Phone, label: '+212 522-750707' },
    { icon: Mail, label: 'contact@indusnov.com' },
    { icon: Clock, label: t('contact.info.hours') },
  ];

  return (
    <section id="contact" className="bg-background py-20 lg:py-32">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              {t('nav.contact')}
            </span>
            <h2 className="section-title">{t('contact.title')}</h2>
            <p className="section-subtitle mb-10">{t('contact.subtitle')}</p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="pt-2">
                    <p className="text-foreground">{info.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-card p-8 shadow-lg">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t('contact.form.service')}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground"
                  >
                    <option value="">{t('contact.form.selectService')}</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {t('contact.form.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-foreground"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>{t('contact.form.sending')}</span>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>{t('contact.form.submit')}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
