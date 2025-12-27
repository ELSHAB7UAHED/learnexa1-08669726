import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { School, Building2, GraduationCap, BookOpen, Smartphone, HeadphonesIcon, ArrowUpRight, Sparkles } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: School,
      titleKey: 'services.schools.title',
      descKey: 'services.schools.desc',
      gradient: 'from-primary via-primary/80 to-secondary',
      delay: '0s',
    },
    {
      icon: Building2,
      titleKey: 'services.centers.title',
      descKey: 'services.centers.desc',
      gradient: 'from-secondary via-secondary/80 to-tertiary',
      delay: '0.1s',
    },
    {
      icon: GraduationCap,
      titleKey: 'services.teachers.title',
      descKey: 'services.teachers.desc',
      gradient: 'from-accent via-accent/80 to-primary',
      delay: '0.2s',
    },
    {
      icon: BookOpen,
      titleKey: 'services.lms.title',
      descKey: 'services.lms.desc',
      gradient: 'from-tertiary via-tertiary/80 to-accent',
      delay: '0.3s',
    },
    {
      icon: Smartphone,
      titleKey: 'services.apps.title',
      descKey: 'services.apps.desc',
      gradient: 'from-primary via-accent/80 to-secondary',
      delay: '0.4s',
    },
    {
      icon: HeadphonesIcon,
      titleKey: 'services.support.title',
      descKey: 'services.support.desc',
      gradient: 'from-secondary via-primary/80 to-tertiary',
      delay: '0.5s',
    },
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-muted/40" />
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="absolute inset-0 bg-dot-pattern bg-dot-size opacity-30" />
      
      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute top-0 left-1/4 w-1/2 h-24 bg-gradient-to-b from-primary/10 to-transparent blur-2xl" />
      
      {/* Bottom Border Glow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-1/2 h-24 bg-gradient-to-t from-secondary/10 to-transparent blur-2xl" />

      {/* Floating Blobs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-blob-reverse animation-delay-2000" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-4xl mx-auto mb-20 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
          <div className="inline-flex items-center gap-3 glass-morphism px-5 py-3 rounded-full mb-8 animate-scale-in-bounce group">
            <div className="w-2 h-2 rounded-full gradient-primary animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              {t('services.badge')}
            </span>
            <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 animate-slide-up-bounce">
            <span className="gradient-text-animated">{t('services.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground animate-slide-up animation-delay-200 leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative glass-morphism rounded-3xl p-8 hover:shadow-glow-xl transition-all duration-700 hover:-translate-y-3 hover:scale-[1.02] animate-scale-in-bounce cursor-pointer overflow-hidden"
              style={{ animationDelay: service.delay }}
            >
              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700 rounded-3xl`} />
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Border Gradient on Hover */}
              <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-500`} />
              
              {/* Icon */}
              <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-8 shadow-glow-lg group-hover:shadow-glow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <service.icon className="h-10 w-10 text-primary-foreground" />
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${service.gradient} blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-500">
                {t(service.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t(service.descKey)}
              </p>

              {/* Arrow */}
              <div className={`absolute top-8 ${isRTL ? 'left-8' : 'right-8'} w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:bg-primary group-hover:shadow-glow group-hover:scale-110`}>
                <ArrowUpRight className="h-6 w-6 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
              </div>

              {/* Bottom Glow Line */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${service.gradient} group-hover:w-1/2 transition-all duration-500 rounded-full`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;