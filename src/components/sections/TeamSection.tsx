import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ahmedNour from '@/assets/ahmed-nour.webp';

const TeamSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full gradient-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {t('team.badge')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold animate-slide-up">
            {t('team.title')}
          </h2>
        </div>

        {/* Founder Card */}
        <div className="max-w-2xl mx-auto animate-scale-in">
          <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden group">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 gradient-primary opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
            
            <div className={`flex flex-col md:flex-row items-center gap-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              {/* Image */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 gradient-primary rounded-full blur-xl opacity-30 scale-110" />
                <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <img
                    src={ahmedNour}
                    alt="Ahmed Nour"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className={`text-center md:text-${isRTL ? 'right' : 'left'} flex-1`}>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {isRTL ? 'أحمد نور أحمد' : 'Ahmed Nour Ahmed'}
                </h3>
                <p className="text-primary font-medium mb-4">{t('team.founder')}</p>
                <p className="text-muted-foreground mb-6">{t('team.founder.bio')}</p>

                {/* Social Links */}
                <div className={`flex flex-wrap gap-3 justify-center md:justify-${isRTL ? 'end' : 'start'}`}>
                  <a
                    href="https://ahmednour.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="glass" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      {t('contact.info.website')}
                    </Button>
                  </a>
                  <a href="mailto:0ahmednour1@gmail.com">
                    <Button variant="glass" size="sm" className="gap-2">
                      <Mail className="h-4 w-4" />
                      {isRTL ? 'إيميل' : 'Email'}
                    </Button>
                  </a>
                  <a href="tel:01014812328">
                    <Button variant="glass" size="sm" className="gap-2">
                      <Phone className="h-4 w-4" />
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
