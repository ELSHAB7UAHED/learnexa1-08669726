import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, ArrowLeft, Sparkles, Rocket, Users, Award } from 'lucide-react';
import logo from '@/assets/logo.png';

const HeroSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const stats = [
    { value: '50+', label: t('hero.stats.projects'), icon: Rocket },
    { value: '100+', label: t('hero.stats.clients'), icon: Users },
    { value: '5+', label: t('hero.stats.experience'), icon: Award },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full animate-fade-in">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground/80">
                {t('hero.badge')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
              {t('hero.title')}
              <br />
              <span className="gradient-text">{t('hero.titleHighlight')}</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap gap-4 animate-slide-up ${isRTL ? 'flex-row-reverse justify-end' : ''}`} style={{ animationDelay: '0.4s' }}>
              <Button variant="hero" className="group">
                {t('hero.cta.start')}
                <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="heroOutline">
                {t('hero.cta.explore')}
              </Button>
            </div>

            {/* Stats */}
            <div className={`flex flex-wrap gap-8 pt-8 animate-slide-up ${isRTL ? 'flex-row-reverse' : ''}`} style={{ animationDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <div key={index} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center glow-primary">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image/Logo */}
          <div className="relative flex items-center justify-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Glow Effects */}
              <div className="absolute inset-0 gradient-primary rounded-full blur-3xl opacity-30 animate-pulse-glow" />
              <div className="absolute inset-8 bg-secondary/20 rounded-full blur-2xl animate-pulse-glow animation-delay-1000" />
              
              {/* Logo Container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full glass flex items-center justify-center animate-float">
                <img
                  src={logo}
                  alt="LEARNEXA"
                  className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-0 right-0 w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <Rocket className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="absolute bottom-0 left-0 w-14 h-14 bg-secondary rounded-xl flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '2s' }}>
                <Sparkles className="h-7 w-7 text-secondary-foreground" />
              </div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-accent rounded-lg flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                <Award className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
