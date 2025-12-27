import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, ArrowLeft, Sparkles, Rocket, Users, Award, Zap, Star } from 'lucide-react';
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
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 bg-hero-pattern opacity-40" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-20" />
      
      {/* Animated Blobs */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/40 to-secondary/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-secondary/40 to-tertiary/30 rounded-full blur-3xl animate-blob-reverse animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-accent/30 to-primary/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 particles-bg opacity-50" />

      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent blur-3xl animate-spotlight opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`space-y-10 ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-3 glass-morphism px-5 py-3 rounded-full animate-slide-up-bounce group cursor-pointer hover:glow-primary transition-all duration-500">
              <div className="relative">
                <Sparkles className="h-5 w-5 text-primary animate-glow-pulse" />
                <div className="absolute inset-0 animate-pulse-ring">
                  <Sparkles className="h-5 w-5 text-primary opacity-50" />
                </div>
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('hero.badge')}
              </span>
              <Zap className="h-4 w-4 text-tertiary animate-bounce-subtle" />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight animate-slide-up animation-delay-200">
              <span className="block animate-blur-in">{t('hero.title')}</span>
              <span className="block gradient-text-animated text-glow mt-2">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed animate-slide-up animation-delay-400">
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap gap-5 animate-slide-up animation-delay-500 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <Button 
                variant="hero" 
                size="xl"
                className="group relative overflow-hidden glow-primary hover:glow-intense transition-all duration-500 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.cta.start')}
                  <ArrowIcon className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                </span>
                <div className="absolute inset-0 gradient-rainbow animate-gradient-fast opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
              <Button 
                variant="heroOutline" 
                size="xl"
                className="relative overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:scale-105"
              >
                <span className="relative z-10">{t('hero.cta.explore')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </Button>
            </div>

            {/* Stats */}
            <div className={`flex flex-wrap gap-10 pt-8 animate-slide-up animation-delay-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-4 group cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow-lg group-hover:animate-levitate transition-all duration-500">
                      <stat.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div className="absolute -inset-1 gradient-primary rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  </div>
                  <div>
                    <div className="text-3xl font-black gradient-text-animated">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image/Logo */}
          <div className="relative flex items-center justify-center animate-scale-in-bounce animation-delay-300">
            <div className="relative">
              {/* Multi-layer Glow Effects */}
              <div className="absolute inset-0 gradient-rainbow animate-gradient rounded-full blur-3xl opacity-30 scale-125" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-full blur-2xl animate-pulse-glow-intense" />
              <div className="absolute inset-8 bg-gradient-to-tr from-secondary/20 to-tertiary/20 rounded-full blur-2xl animate-pulse-glow animation-delay-1000" />
              
              {/* Main Logo Container */}
              <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full glass-morphism flex items-center justify-center animate-morph glow-multi">
                <div className="absolute inset-2 rounded-full border border-primary/20 animate-spin-slow" />
                <div className="absolute inset-6 rounded-full border border-secondary/15" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
                <div className="absolute inset-10 rounded-full border border-accent/10 animate-spin-slow" style={{ animationDuration: '40s' }} />
                
                <img
                  src={logo}
                  alt="LEARNEXA"
                  className="w-52 h-52 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain drop-shadow-2xl animate-float hover:animate-levitate transition-all duration-500 animate-glow-pulse"
                />
              </div>

              {/* Enhanced Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center shadow-glow-lg animate-float glow-primary" style={{ animationDelay: '0.5s' }}>
                <Rocket className="h-10 w-10 text-primary-foreground" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-18 h-18 bg-gradient-to-br from-secondary to-tertiary rounded-2xl flex items-center justify-center shadow-glow-lg animate-float glow-secondary" style={{ animationDelay: '1.5s' }}>
                <Sparkles className="h-9 w-9 text-secondary-foreground" />
              </div>
              
              <div className="absolute top-1/2 -right-12 w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center shadow-glow animate-float" style={{ animationDelay: '1s' }}>
                <Award className="h-8 w-8 text-accent-foreground" />
              </div>
              
              <div className="absolute top-1/4 -left-8 w-14 h-14 bg-gradient-to-br from-tertiary to-secondary rounded-xl flex items-center justify-center shadow-glow animate-float-fast" style={{ animationDelay: '2s' }}>
                <Star className="h-7 w-7 text-tertiary-foreground" />
              </div>

              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-orbit" style={{ animationDuration: '25s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full gradient-primary glow-primary" />
              </div>
              <div className="absolute inset-0 animate-orbit" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-secondary glow-secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="relative w-8 h-14 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 glow-primary">
          <div className="w-2 h-3 rounded-full gradient-primary animate-slide-up-fade" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite' }} />
        </div>
        <div className="absolute inset-0 w-8 h-14 rounded-full border-2 border-primary/30 animate-pulse-ring" />
      </div>
    </section>
  );
};

export default HeroSection;