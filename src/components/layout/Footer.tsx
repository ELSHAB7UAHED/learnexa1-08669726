import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, ExternalLink, Heart, Sparkles, ArrowUp } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const quickLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const contactLinks = [
    { icon: Mail, value: '0ahmednour1@gmail.com', href: 'mailto:0ahmednour1@gmail.com' },
    { icon: Phone, value: '+20 101 481 2328', href: 'tel:+201014812328' },
    { icon: ExternalLink, value: 'ahmednour.vercel.app', href: 'https://ahmednour.vercel.app' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-24 pb-10 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-muted/60" />
      <div className="absolute inset-0 gradient-mesh opacity-10" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-10" />
      
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute top-0 left-1/4 w-1/2 h-20 bg-gradient-to-b from-primary/10 to-transparent blur-2xl" />
      
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-gradient-to-t from-primary/15 via-secondary/10 to-transparent blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-8 group">
              <div className="relative">
                <img src={logo} alt="LEARNEXA" className="h-14 w-auto transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 gradient-primary rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
              <span className="text-3xl font-black gradient-text-animated">LEARNEXA</span>
            </a>
            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
              <span>{isRTL ? 'نبني المستقبل الرقمي' : 'Building the Digital Future'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xl mb-8 gradient-text">{t('footer.links')}</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 gradient-primary group-hover:w-4 transition-all duration-300 rounded-full" />
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-xl mb-8 gradient-text">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              {contactLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:shadow-glow transition-all duration-300">
                      <link.icon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm">{link.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-10">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              © {new Date().getFullYear()} LEARNEXA. {t('footer.rights')}
            </p>
            
            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow hover:shadow-glow-lg hover:scale-110 transition-all duration-300 group"
            >
              <ArrowUp className="h-5 w-5 text-primary-foreground group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
            
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              {isRTL ? 'صنع بـ' : 'Made with'}
              <Heart className="h-4 w-4 text-destructive fill-destructive animate-pulse" />
              {isRTL ? 'بواسطة أحمد نور' : 'by Ahmed Nour'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;