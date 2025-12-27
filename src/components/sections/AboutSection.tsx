import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Zap, HeadphonesIcon, Wallet, CheckCircle2, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const features = [
    {
      icon: Award,
      titleKey: 'about.feature1.title',
      descKey: 'about.feature1.desc',
      gradient: 'from-primary to-secondary',
      delay: '0s',
    },
    {
      icon: Zap,
      titleKey: 'about.feature2.title',
      descKey: 'about.feature2.desc',
      gradient: 'from-secondary to-tertiary',
      delay: '0.15s',
    },
    {
      icon: HeadphonesIcon,
      titleKey: 'about.feature3.title',
      descKey: 'about.feature3.desc',
      gradient: 'from-accent to-primary',
      delay: '0.3s',
    },
    {
      icon: Wallet,
      titleKey: 'about.feature4.title',
      descKey: 'about.feature4.desc',
      gradient: 'from-tertiary to-accent',
      delay: '0.45s',
    },
  ];

  const checklistItems = [
    { text: 'تصميم UI/UX احترافي', delay: '0.4s' },
    { text: 'سرعة تحميل فائقة', delay: '0.5s' },
    { text: 'متوافق مع جميع الأجهزة', delay: '0.6s' },
    { text: 'أمان وحماية عالية', delay: '0.7s' },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-15" />
      
      {/* Animated Blobs */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full blur-3xl -translate-y-1/2 animate-blob" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-gradient-to-br from-secondary/20 to-tertiary/10 rounded-full blur-3xl -translate-y-1/2 animate-blob-reverse animation-delay-2000" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-accent/15 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className={`space-y-10 ${isRTL ? 'order-2' : 'order-1'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-3 glass-morphism px-5 py-3 rounded-full animate-scale-in-bounce group">
              <div className="w-2 h-2 rounded-full gradient-primary animate-pulse" />
              <span className="text-sm font-semibold text-muted-foreground">
                {t('about.badge')}
              </span>
              <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black animate-slide-up-bounce animation-delay-100">
              <span className="gradient-text-animated">{t('about.title')}</span>
            </h2>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed animate-slide-up animation-delay-200">
              {t('about.description')}
            </p>

            {/* Enhanced Checklist */}
            <div className="space-y-5">
              {checklistItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-4 animate-slide-up group cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
                  style={{ animationDelay: item.delay }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-lg group-hover:scale-110 transition-all duration-300">
                      <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="absolute -inset-1 gradient-primary rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  </div>
                  <span className="text-lg text-foreground/90 font-medium group-hover:text-primary transition-colors duration-300">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="animate-slide-up animation-delay-800">
              <Button 
                variant="hero" 
                size="xl"
                className="group glow-primary hover:glow-intense transition-all duration-500 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  {isRTL ? 'تواصل معنا' : 'Get in Touch'}
                  <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>

          {/* Right Content - Enhanced Features Grid */}
          <div className={`grid grid-cols-2 gap-6 ${isRTL ? 'order-1' : 'order-2'}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="group glass-morphism rounded-3xl p-8 hover:shadow-glow-xl transition-all duration-700 hover:-translate-y-3 hover:scale-[1.02] animate-scale-in-bounce cursor-pointer relative overflow-hidden"
                style={{ animationDelay: feature.delay }}
              >
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-3xl`} />
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-glow-lg group-hover:shadow-glow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>

                {/* Corner Decoration */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-3xl rounded-tr-3xl`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;