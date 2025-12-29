import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { School, Building2, GraduationCap, BookOpen, Smartphone, HeadphonesIcon, ArrowUpRight } from 'lucide-react';

const ServicesSection: React.FC = memo(() => {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: School,
      titleKey: 'services.schools.title',
      descKey: 'services.schools.desc',
      gradient: 'from-primary to-secondary',
    },
    {
      icon: Building2,
      titleKey: 'services.centers.title',
      descKey: 'services.centers.desc',
      gradient: 'from-secondary to-tertiary',
    },
    {
      icon: GraduationCap,
      titleKey: 'services.teachers.title',
      descKey: 'services.teachers.desc',
      gradient: 'from-accent to-primary',
    },
    {
      icon: BookOpen,
      titleKey: 'services.lms.title',
      descKey: 'services.lms.desc',
      gradient: 'from-tertiary to-accent',
    },
    {
      icon: Smartphone,
      titleKey: 'services.apps.title',
      descKey: 'services.apps.desc',
      gradient: 'from-primary to-accent',
    },
    {
      icon: HeadphonesIcon,
      titleKey: 'services.support.title',
      descKey: 'services.support.desc',
      gradient: 'from-secondary to-primary',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      {/* Blobs */}
      <div className="absolute top-1/4 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 glass-morphism px-4 py-2 rounded-full mb-6 animate-scale-in touch-scale">
            <div className="w-2 h-2 rounded-full gradient-primary" />
            <span className="text-xs md:text-sm font-semibold text-muted-foreground">
              {t('services.badge')}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 animate-slide-up">
            <span className="gradient-text">{t('services.title')}</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground animate-slide-up animation-delay-200">
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group glass-morphism rounded-2xl md:rounded-3xl p-5 md:p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-scale-in touch-scale cursor-pointer relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl md:rounded-3xl`} />
              
              {/* Icon */}
              <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 md:mb-5 shadow-glow group-hover:scale-105 transition-transform duration-300`}>
                <service.icon className="h-7 w-7 md:h-8 md:w-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300">
                {t(service.titleKey)}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(service.descKey)}
              </p>

              {/* Arrow */}
              <div className={`absolute top-5 ${isRTL ? 'left-5' : 'right-5'} w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary`}>
                <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;
