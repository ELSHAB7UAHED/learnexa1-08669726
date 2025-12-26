import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Zap, HeadphonesIcon, Wallet, CheckCircle2 } from 'lucide-react';

const AboutSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Award,
      titleKey: 'about.feature1.title',
      descKey: 'about.feature1.desc',
    },
    {
      icon: Zap,
      titleKey: 'about.feature2.title',
      descKey: 'about.feature2.desc',
    },
    {
      icon: HeadphonesIcon,
      titleKey: 'about.feature3.title',
      descKey: 'about.feature3.desc',
    },
    {
      icon: Wallet,
      titleKey: 'about.feature4.title',
      descKey: 'about.feature4.desc',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isRTL ? 'order-2' : 'order-1'}`}>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full animate-fade-in">
              <span className="w-2 h-2 rounded-full gradient-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {t('about.badge')}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold animate-slide-up">
              {t('about.title')}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {t('about.description')}
            </p>

            {/* Checklist */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {[
                'تصميم UI/UX احترافي',
                'سرعة تحميل فائقة',
                'متوافق مع جميع الأجهزة',
                'أمان وحماية عالية',
              ].map((item, index) => (
                <div key={index} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div className={`grid grid-cols-2 gap-6 ${isRTL ? 'order-1' : 'order-2'}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="group glass rounded-3xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">{t(feature.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
