import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Zap, HeadphonesIcon, Wallet, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection: React.FC = memo(() => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const features = [
    { icon: Award, titleKey: 'about.feature1.title', descKey: 'about.feature1.desc', gradient: 'from-primary to-secondary' },
    { icon: Zap, titleKey: 'about.feature2.title', descKey: 'about.feature2.desc', gradient: 'from-secondary to-tertiary' },
    { icon: HeadphonesIcon, titleKey: 'about.feature3.title', descKey: 'about.feature3.desc', gradient: 'from-accent to-primary' },
    { icon: Wallet, titleKey: 'about.feature4.title', descKey: 'about.feature4.desc', gradient: 'from-tertiary to-accent' },
  ];

  const checklistItems = [
    { text: isRTL ? 'تصميم UI/UX احترافي' : 'Professional UI/UX Design' },
    { text: isRTL ? 'سرعة تحميل فائقة' : 'Ultra-fast Loading' },
    { text: isRTL ? 'متوافق مع جميع الأجهزة' : 'All Devices Compatible' },
    { text: isRTL ? 'أمان وحماية عالية' : 'High Security' },
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent" />
      <div className="absolute top-1/2 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-6 md:space-y-8 ${isRTL ? 'order-2' : 'order-1'}`}>
            <div className="inline-flex items-center gap-2 glass-morphism px-4 py-2 rounded-full animate-scale-in touch-scale">
              <div className="w-2 h-2 rounded-full gradient-primary" />
              <span className="text-xs md:text-sm font-semibold text-muted-foreground">{t('about.badge')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold animate-slide-up">
              <span className="gradient-text">{t('about.title')}</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed animate-slide-up animation-delay-200">
              {t('about.description')}
            </p>

            {/* Checklist */}
            <div className="space-y-3 md:space-y-4">
              {checklistItems.map((item, index) => (
                <div key={index} className={`flex items-center gap-3 touch-scale ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm md:text-base text-foreground/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="glow-primary touch-scale h-12 md:h-14 px-6 md:px-8">
              <span className="flex items-center gap-2">
                {isRTL ? 'تواصل معنا' : 'Get in Touch'}
                <ArrowIcon className="h-4 w-4 md:h-5 md:w-5" />
              </span>
            </Button>
          </div>

          {/* Features Grid */}
          <div className={`grid grid-cols-2 gap-3 md:gap-5 ${isRTL ? 'order-1' : 'order-2'}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="group glass-morphism rounded-2xl p-4 md:p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 touch-scale cursor-pointer relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`} />
                
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-glow mb-3 md:mb-4 group-hover:scale-105 transition-transform`}>
                  <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                </div>
                
                <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2 group-hover:text-primary transition-colors">{t(feature.titleKey)}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
