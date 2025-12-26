import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { School, Building2, GraduationCap, BookOpen, Smartphone, HeadphonesIcon, ArrowUpRight } from 'lucide-react';

const ServicesSection: React.FC = () => {
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
      gradient: 'from-secondary to-accent',
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
      gradient: 'from-primary to-accent',
    },
    {
      icon: Smartphone,
      titleKey: 'services.apps.title',
      descKey: 'services.apps.desc',
      gradient: 'from-secondary to-primary',
    },
    {
      icon: HeadphonesIcon,
      titleKey: 'services.support.title',
      descKey: 'services.support.desc',
      gradient: 'from-accent to-secondary',
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full gradient-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {t('services.badge')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-up">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative glass rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-scale-in cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-8 w-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                {t(service.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(service.descKey)}
              </p>

              {/* Arrow */}
              <div className={`absolute top-8 ${isRTL ? 'left-8' : 'right-8'} w-10 h-10 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary`}>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
