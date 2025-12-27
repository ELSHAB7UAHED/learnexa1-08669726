import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Mail, Phone, Sparkles, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ahmedNour from '@/assets/ahmed-nour.webp';

const TeamSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute inset-0 bg-dot-pattern bg-dot-size opacity-20" />
      
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute top-0 left-1/4 w-1/2 h-20 bg-gradient-to-b from-primary/10 to-transparent blur-2xl" />

      {/* Floating Blobs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-secondary/15 rounded-full blur-3xl animate-blob-reverse animation-delay-2000" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
          <div className="inline-flex items-center gap-3 glass-morphism px-5 py-3 rounded-full mb-8 animate-scale-in-bounce group">
            <div className="w-2 h-2 rounded-full gradient-primary animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              {t('team.badge')}
            </span>
            <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black animate-slide-up-bounce">
            <span className="gradient-text-animated">{t('team.title')}</span>
          </h2>
        </div>

        {/* Enhanced Founder Card */}
        <div className="max-w-3xl mx-auto animate-scale-in-bounce animation-delay-200">
          <div className="glass-morphism rounded-4xl p-10 md:p-14 relative overflow-hidden group hover:shadow-glow-xl transition-all duration-700">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 gradient-primary opacity-5 group-hover:opacity-10 transition-opacity duration-700" />
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 gradient-primary rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-secondary rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500" />
            
            <div className={`flex flex-col md:flex-row items-center gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              {/* Enhanced Image */}
              <div className="relative flex-shrink-0 group/image">
                {/* Multi-layer Glow */}
                <div className="absolute -inset-4 gradient-rainbow animate-gradient rounded-full blur-2xl opacity-30 group-hover/image:opacity-50 transition-opacity duration-500" />
                <div className="absolute -inset-2 gradient-primary rounded-full blur-xl opacity-40 group-hover/image:opacity-60 transition-opacity duration-500" />
                
                {/* Image Container */}
                <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/30 shadow-glow-xl group-hover/image:border-primary/50 group-hover/image:scale-105 transition-all duration-500">
                  <img
                    src={ahmedNour}
                    alt="Ahmed Nour"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-2 -right-2 w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-glow animate-float glow-primary">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
                
                {/* Star Decoration */}
                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-br from-secondary to-tertiary rounded-lg flex items-center justify-center shadow-glow animate-float animation-delay-1000">
                  <Star className="h-5 w-5 text-secondary-foreground" />
                </div>
              </div>

              {/* Info */}
              <div className={`text-center md:text-${isRTL ? 'right' : 'left'} flex-1 space-y-6`}>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black mb-3 gradient-text-animated">
                    {isRTL ? 'أحمد نور أحمد' : 'Ahmed Nour Ahmed'}
                  </h3>
                  <p className="text-xl font-semibold text-primary text-glow">{t('team.founder')}</p>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                  {t('team.founder.bio')}
                </p>

                {/* Enhanced Social Links */}
                <div className={`flex flex-wrap gap-4 justify-center md:justify-${isRTL ? 'end' : 'start'}`}>
                  <a
                    href="https://ahmednour.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="glass" 
                      size="lg" 
                      className="gap-3 group/btn hover:glow-primary hover:scale-105 transition-all duration-300"
                    >
                      <ExternalLink className="h-5 w-5 group-hover/btn:text-primary transition-colors" />
                      {t('contact.info.website')}
                    </Button>
                  </a>
                  <a href="mailto:0ahmednour1@gmail.com">
                    <Button 
                      variant="glass" 
                      size="lg" 
                      className="gap-3 group/btn hover:glow-secondary hover:scale-105 transition-all duration-300"
                    >
                      <Mail className="h-5 w-5 group-hover/btn:text-secondary transition-colors" />
                      {isRTL ? 'إيميل' : 'Email'}
                    </Button>
                  </a>
                  <a href="tel:01014812328">
                    <Button 
                      variant="glass" 
                      size="lg" 
                      className="gap-3 group/btn hover:glow-accent hover:scale-105 transition-all duration-300"
                    >
                      <Phone className="h-5 w-5 group-hover/btn:text-accent transition-colors" />
                      {isRTL ? 'هاتف' : 'Phone'}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;