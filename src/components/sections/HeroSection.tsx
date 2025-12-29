import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, ArrowLeft, Sparkles, Rocket, Users, Award, Zap } from 'lucide-react';
import logo from '@/assets/logo.png';

const HeroSection: React.FC = memo(() => {
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 pb-8"
    >
      {/* Optimized Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Simplified Blobs for Mobile */}
      <div className="absolute top-1/4 -left-32 md:-left-1/4 w-64 md:w-[400px] h-64 md:h-[400px] bg-gradient-to-br from-primary/20 to-secondary/15 rounded-full blur-3xl animate-blob opacity-60" />
      <div className="absolute bottom-1/4 -right-32 md:-right-1/4 w-64 md:w-[400px] h-64 md:h-[400px] bg-gradient-to-br from-secondary/20 to-accent/15 rounded-full blur-3xl animate-blob animation-delay-2000 opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className={`space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-morphism px-4 py-2 rounded-full animate-slide-up-bounce touch-scale">
              <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
              <span className="text-xs md:text-sm font-semibold gradient-text">
                {t('hero.badge')}
              </span>
              <Zap className="h-3 w-3 text-tertiary" />
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight animate-slide-up animation-delay-200">
              <span className="block">{t('hero.title')}</span>
              <span className="block gradient-text-animated text-glow mt-1 md:mt-2">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed animate-slide-up animation-delay-400">
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap gap-3 md:gap-4 animate-slide-up animation-delay-500 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <Button 
                variant="hero" 
                size="lg"
                className="group glow-primary hover:scale-105 transition-transform touch-scale h-12 md:h-14 px-6 md:px-8 text-base md:text-lg"
              >
                <span className="flex items-center gap-2">
                  {t('hero.cta.start')}
                  <ArrowIcon className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button 
                variant="heroOutline" 
                size="lg"
                className="hover:scale-105 transition-transform touch-scale h-12 md:h-14 px-6 md:px-8 text-base md:text-lg"
              >
                {t('hero.cta.explore')}
              </Button>
            </div>

            {/* Stats - Mobile Optimized */}
            <div className={`flex flex-wrap gap-4 md:gap-8 pt-4 md:pt-6 animate-slide-up animation-delay-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 touch-scale ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                    <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image - Mobile Optimized */}
          <div className="relative flex items-center justify-center animate-scale-in-bounce animation-delay-300 order-first lg:order-last">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 rounded-full blur-2xl animate-pulse-glow scale-110" />
              
              {/* Main Logo Container */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full glass-morphism flex items-center justify-center animate-morph glow-multi">
                {/* Orbiting Ring */}
                <div className="absolute inset-2 rounded-full border border-primary/20 animate-spin-slow" />
                
                <img
                  src={logo}
                  alt="LEARNEXA"
                  className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain animate-float animate-glow-pulse"
                  loading="eager"
                />
              </div>

              {/* Floating Elements - Simplified for Mobile */}
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-glow animate-float glow-primary">
                <Rocket className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
              </div>
              
              <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-secondary to-tertiary rounded-xl flex items-center justify-center shadow-glow animate-float animation-delay-1000">
                <Sparkles className="h-5 w-5 md:h-7 md:w-7 text-secondary-foreground" />
              </div>

              {/* Hidden on mobile, visible on larger screens */}
              <div className="hidden md:flex absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl items-center justify-center shadow-glow animate-float animation-delay-500">
                <Award className="h-6 w-6 text-accent-foreground" />
              </div>

              {/* Orbit Element - Desktop Only */}
              <div className="hidden lg:block absolute inset-0 animate-orbit">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full gradient-primary glow-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on Mobile */}
      <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full gradient-primary animate-bounce-subtle" />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
